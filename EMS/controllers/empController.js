import Employee from '../models/empModel.js';

export const addEmp = async (req, res) => {
	try {
		const { firstName, middleName = '', lastName, email, role, dob, empCode } = req.body;
		const newEmp = new Employee({
			firstName,
			middleName,
			lastName,
			email,
			role,
			dob,
			empCode,
		});

		await newEmp.save();
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
