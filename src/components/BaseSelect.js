import React, { useContext } from 'react';
import { RateContext } from '../context/RateContext';

export const BaseSelect = (props) => {
	const {state, setBase} = useContext(RateContext);
	return (
		<select defaultValue={state.base} onChange = {(event) => {
			props.change(event);
			setBase(event);
		}}>
			{Object.keys(state.currency).map(item => {
				return(
					<option key = {item}>{item}</option>
				)
			})}
		</select>
	)
}