import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Company from '../models/compModel.js';
import User from '../models/userModel.js';

export const defaultUser = async (req, res) => {
	try {
		let { userName, password, companyCode, privilage } = req.body;
		const salt = await bcrypt.genSalt();
		const hashedPwd = await bcrypt.hash(password, salt);

		const newUser = new User({
			userName,
			password: hashedPwd,
			companyCode,
			privilage,
		});
		const savedUser = await newUser.save();
		delete req.body.userName;
		delete req.body.password;
		delete req.body.privilage;
	} catch (err) {
		console.log(err.message);
	}
};

export const userRegister = async (req, res) => {
	try {
		const { userName, password, companyCode, privilage } = req.body;
		const salt = await bcrypt.genSalt();
		const hashedPwd = await bcrypt.hash(password, salt);

		const isUser = await User.findOne({ userName: userName });
		if (isUser) return res.status(400).json({ msg: 'Username not available' });

		const isComp = await User.findOne({ companyCode: companyCode });
		if (!isComp) return res.status(400).json({ msg: 'Company doesnt exist' });

		const newUser = new User({
			userName,
			password: hashedPwd,
			companyCode,
			privilage,
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
		const { userName, password } = req.body;

		const isUser = await User.findOne({ userName: userName });
		if (!isUser) return res.status(400).json({ msg: 'User does not exisit' });

		const isMatch = await bcrypt.compare(password, isUser.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

		const token = jwt.sign({ id: isUser._id }, process.env.JWT, { expiresIn: '10m' });

		delete isUser.password;

		res.status(200).json({ token });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
