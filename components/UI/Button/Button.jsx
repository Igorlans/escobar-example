import classes from './Button.module.css';

function Button({ text, children, ...props }) {
	return (
		<a className={classes.Btn} {...props}>
			{text}
			{children}
		</a>
	);
}

export default Button;
