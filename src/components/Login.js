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
import { loginSchema } from '../validations/userValidation';
import { loginService } from '../services/userService';
import { useHistory } from 'react-router-dom';

const Login = () => {
	const classes = useStyles();
	const history = useHistory();

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [failed, setFailed] = useState();

	const handleLogin = async values => {
		setLoading(true);
		try {
			const results = await loginService(values);
			setError('');
			// history.push('/login');
		} catch (error) {
			setError(error.response.data.message);
			setFailed(error.response.data);
			console.log(error.response.data);
		}
		setLoading(false);
	};

	useEffect(() => {
		document.title = 'Rate limit | Login';
	}, []);
	return (
		<div className={classes.root}>
			<Grid container justify='center' alignItems='center'>
				<Grid item xs={12} sm={12} md={4}>
					<Paper className={classes.paper}>
						{typeof failed === 'string' && (
							<Typography color='error' variant='body2'>
								{failed}
							</Typography>
						)}
						{error && (
							<>
								<Typography color='error' variant='body2'>
									{error.errorMessage}
								</Typography>
								<Typography color='error' variant='body2'>
									{error.attempt}
								</Typography>
							</>
						)}

						<h4>Login</h4>
						<Formik
							initialValues={{ email: '', password: '' }}
							validationSchema={loginSchema}
							onSubmit={values => handleLogin(values)}
						>
							{props => (
								<Form onSubmit={props.handleSubmit}>
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
											!props.values.email ||
											!props.values.password ||
											Object.keys(props.errors).length !== 0 ||
											loading ||
											(typeof failed !== 'object' &&
												failed === 'Too many requests, please try again later.')
										}
										className={classes.button}
									>
										{loading ? 'loading...' : 'Login'}
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

export default Login;
