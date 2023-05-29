import mongoose from 'mongoose';

const compSchema = new mongoose.Schema(
	{
		companyCode: {
			type: String,
			required: true,
			unique: true,
		},
		companyName: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			default: '',
		},
		numOfEmp: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Company = mongoose.model('Company', compSchema);

export default Company;
