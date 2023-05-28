import mongoose from 'mongoose';

const emplyeeSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		middleName: {
			type: String,
			default: '',
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			required: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		empCode: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

const Employee = mongoose.model('Employee', emplyeeSchema);
export default Employee;
