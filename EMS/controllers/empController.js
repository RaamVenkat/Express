import Employee from '../models/empModel.js';

export const addEmp = async (req, res) => {};

export const viewEmp = async (req, res) => {
	try {
		const emp = await Employee.find();
		res.status(200).json(emp);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
