import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginTop: 200,
	},
	paper: {
		padding: theme.spacing(2),

		textAlign: 'center',
	},
	button: {
		marginTop: theme.spacing(2),
	},
}));

export default useStyles;
