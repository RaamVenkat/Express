import mongoose from 'mongoose';

const emplyeeSchema = new mongoose.Schema(
	{
		empCode: {
			type: String,
			required: true,
			unique: true,
		},
		companyCode: {
			type: String,
			required: true,
		},
		personnelDetails: {
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

			dob: {
				type: Date,
				required: true,
			},
		},
		department: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
		isManager: {
			type: Boolean,
			default: false,
		},
		manager: {
			type: String,
			validate: {
				validator: function (value) {
					if (this.isManager === false && !value) {
						return false;
					}
					return true;
				},
			},
		},
	},
	{ timestamps: true }
);

const Employee = mongoose.model('Employee', emplyeeSchema);
export default Employee;
