import React, { useEffect, useState } from 'react';
import {
	Grid,
	Paper,
	TextField,
	InputAdornment,
	IconButton,
	InputLabel,
	Input,
	FormControl,
	FormHelperText,
	Button,
	Typography,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from '../styles';
import { signupSchema } from '../validations/userValidation';
import { signupService } from '../services/userService';
import { useHistory } from 'react-router-dom';

const Signup = () => {
	const classes = useStyles();
	const history = useHistory();

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState();
	const [error, setError] = useState();

	const handleSignup = async values => {
		setLoading(true);
		try {
			const results = await signupService(values);
			setMessage(results.data.data.message);
			setError('');
			history.push('/login');
		} catch (error) {
			setError(error.response.data.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		document.title = 'Rate limit | Signup';
	});

	return (
		<div className={classes.root}>
			<Grid container justify='center' alignItems='center'>
				<Grid item xs={12} sm={12} md={4}>
					<Paper className={classes.paper}>
						<h4>Fill the form to signup</h4>
						<Formik
							initialValues={{ fullName: '', email: '', password: '' }}
							validationSchema={signupSchema}
							onSubmit={values => handleSignup(values)}
						>
							{props => (
								<Form onSubmit={props.handleSubmit}>
									<TextField
										fullWidth
										label='Full Name'
										type='text'
										onChange={props.handleChange('fullName')}
										values={props.values.fullName}
										error={
											props.values.fullName !== '' &&
											Object.prototype.hasOwnProperty.call(
												props.errors,
												'fullName'
											)
										}
										helperText={
											props.values.fullName !== '' && props.errors.fullName
										}
									/>
									<TextField
										fullWidth
										label='Email'
										type='text'
										onChange={props.handleChange('email')}
										values={props.values.email}
										error={
											props.values.email !== '' &&
											Object.prototype.hasOwnProperty.call(
												props.errors,
												'email'
											)
										}
										helperText={props.values.email !== '' && props.errors.email}
									/>
									<Typography color='error' variant='body2'>
										{error}
									</Typography>
									<FormControl fullWidth>
										<InputLabel htmlFor='standard-adornment-password'>
											Password
										</InputLabel>
										<Input
											id='standard-adornment-password'
											type={showPassword ? 'text' : 'password'}
											onChange={props.handleChange('password')}
											values={props.values.password}
											error={
												props.values.password !== '' &&
												Object.prototype.hasOwnProperty.call(
													props.errors,
													'password'
												)
											}
											endAdornment={
												<InputAdornment position='end'>
													<IconButton
														onClick={() => setShowPassword(!showPassword)}
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											}
										/>
										<FormHelperText error={true}>
											{props.values.password !== '' && props.errors.password}
										</FormHelperText>
									</FormControl>
									<Button
										type='submit'
										variant='contained'
										color='primary'
										disabled={
											!props.values.fullName ||
											!props.values.email ||
											!props.values.password ||
											Object.keys(props.errors).length !== 0 ||
											loading
										}
										className={classes.button}
									>
										{loading ? 'loading...' : 'Signup'}
									</Button>
								</Form>
							)}
						</Formik>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default Signup;
