import Company from '../models/compModel.js';
import Employee from '../models/empModel.js';
import { defaultUser } from './userController.js';

export const addEmp = async (req, res) => {
	try {
		const { empCode, companyCode, personnelDetails, department, role, isManager, manager } = req.body;

		const newEmp = new Employee({
			empCode,
			companyCode,
			personnelDetails,
			department,
			role,
			isManager,
			manager,
		});

		req.body.userName = empCode;
		req.body.password = empCode;
		req.body.companyCode = companyCode;
		req.body.privilage = isManager ? 2 : 1;

		const savedEmp = await newEmp.save();
		if (savedEmp) {
			await defaultUser(req);
			await Company.updateOne({ companyCode: companyCode }, { $inc: { numOfEmp: 1 } });
		}
		res.status(201).json(`${empCode} Employee added`);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

export const viewEmp = async (req, res) => {
	try {
		const emp = await Employee.find();
		res.status(200).json(emp);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const viewOneEmp = async (req, res) => {
	try {
		const { empCode } = req.params;
		const emp = await Employee.findOne({ empCode: empCode });
		res.status(200).json(emp);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
