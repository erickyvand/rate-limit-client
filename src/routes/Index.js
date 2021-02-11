import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
const Index = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Signup} />
				<Route exact path='/login' component={Login} />
			</Switch>
		</Router>
	);
};

export default Index;
