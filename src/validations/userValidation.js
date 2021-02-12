import * as yup from 'yup';

export const signupSchema = yup.object({
	fullName: yup
		.string()
		.min(2, 'Full Name must be at least 2 characters')
		.trim()
		.required(),
	email: yup.string().email('Email must be a valid email').required(),
	password: yup.string().min(6, 'Pass must be at least 6 characters'),
});

export const loginSchema = yup.object({
	email: yup.string().email('Email must be a valid email').required(),
});
