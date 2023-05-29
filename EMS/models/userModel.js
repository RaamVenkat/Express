import mongoose, { mongo } from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
			min: 2,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 4,
		},
		companyCode: {
			type: String,
			required: true,
		},
		privilage: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
