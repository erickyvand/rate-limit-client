import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from '../components/Signup';
const Index = () => {
	return (
		<Router>
			<Switch>
				<Route path='/' component={Signup} />
			</Switch>
		</Router>
	);
};

export default Index;
