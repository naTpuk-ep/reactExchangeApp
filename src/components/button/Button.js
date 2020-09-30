import React from 'react';
import './button.scss';

export const Button = (props) => {
	return(
		<input
			value = {props.text}
			type = 'submit'
			className = 'btn'
			disabled = {props.disabled}
			onClick = {(e) => {
				e.preventDefault();
				return props.click ? props.click(props.arg || '') : undefined 
			}}/>
	)
}