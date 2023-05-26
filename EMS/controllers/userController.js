import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const register = async (req, res) => {
	try {
		const { userName, email, password } = req.body;
		const salt = await bcrypt.genSalt();
		const hashedPwd = await bcrypt.hash(password, salt);

		const newUser = new User({
			userName,
			email,
			password: hashedPwd,
		});
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log('Error Registering User');
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const isUser = await User.findOne({ email: email });
		if (!isUser) return res.status(400).json({ msg: 'User does not exisit' });

		const isMatch = await bcrypt.compare(password, isUser.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

		const token = jwt.sign({ id: isUser._id }, process.env.JWT, { expiresIn: '10m' });

		delete isUser.password;

		res.status(200).json({ token, isUser });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
