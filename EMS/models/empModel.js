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
			unique: true,
		},
		personelDetails: {
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
				validator: function (v) {
					if (this.isManager === true) {
						return v !== null && v !== '';
					}
					return true;
				},
				message: 'Manager field required',
			},
		},
	},
	{ timestamps: true }
);

const Employee = mongoose.model('Employee', emplyeeSchema);
export default Employee;
