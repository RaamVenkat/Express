import Company from '../models/compModel.js';
import { defaultUser } from './userController.js';

export const compRegister = async (req, res) => {
	try {
		const { companyCode, companyName, address = '', numOfEmp = 0 } = req.body;

		const isComp = await Company.findOne({ companyCode: companyCode });
		if (isComp) return res.status(400).json({ msg: 'Company already exisits' });
		const newComp = new Company({
			companyCode,
			companyName,
			address,
			numOfEmp,
		});

		req.body.userName = 'admin'.concat(companyCode);
		req.body.password = 'admin'.concat(companyCode);
		req.body.privilage = 3;
		await defaultUser(req);

		const savedComp = await newComp.save();
		res.status(201).json(savedComp);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};
