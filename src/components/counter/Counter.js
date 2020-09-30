import React, { useContext } from 'react'
import './counter.scss'
import { RateContext } from '../../context/RateContext'
// import { BaseSelect } from '../BaseSelect';

export const Counter = () => {
	const {state, inputValueHandler, currencyValueHandler, setBase} = useContext(RateContext);

	return (
		<div className='calcHead'>
			<div><h4>Хочу обменять:</h4></div>
			<div className='operation'>
				<span>
					<input type = 'text' value = {state.inputValue} onInput = {(e) =>
						e.target.value = e.target.value.replace(/\D/, '')
					} onChange = {inputValueHandler} />
				</span>&nbsp;
				{/* <BaseSelect change = {(e) => {
					const outSelect = document.querySelectorAll('select');
					if (outSelect[outSelect.length-1].value === e.target.value){
						let target = e.target.value;
						state.currencyValue = Object.keys(state.currency).find(item => item !== target);
					};
				}}/> */
				<select defaultValue={state.base} onChange = {(event) => {
					// props.change(event);
					setBase(event);
				}}>
					{Object.keys(state.currency).map(item => {
						return(item !== state.currencyValue ?
							<option key = {item}>{item}</option>
						: null);
					})}
				</select>
				}&nbsp;=&nbsp;
				<select onChange = {currencyValueHandler}>
					{Object.keys(state.currency).map(item => {
						return(item !== state.base ?
							<option key = {item}>{item}</option>
						: null);
					})}
				</select>&nbsp;
				<span className='output'>&nbsp;{state.result}&nbsp;</span>
			</div>
		</div>
	)
}

