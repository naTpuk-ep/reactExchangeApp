import React, { useContext } from 'react'
import './counter.scss'
import { RateContext } from '../../context/RateContext'
import { Result } from '../result/Result';

export const Counter = () => {
	const {state, inputValueHandler, currencyValueHandler, setBase, calcHandler} = useContext(RateContext);

	return (
		<div className='calcHead'>
			<div><h4>Хочу обменять:</h4></div>
			<div className='operation'>
				<span>
					<input type = 'text' value = {state.inputValue} onChange = {inputValueHandler} />
				</span>&nbsp;
				<select defaultValue={state.base} onChange = {(e) => {
					setBase(e);
					// calcHandler(state.currencyValue);
				}}>
					{Object.keys(state.currency).map(item => {
						return(
							<option key = {item}>{item}</option>
						)
					})}
				</select>&nbsp;=
				<select onChange = {(e) => {
					currencyValueHandler(e);
					// calcHandler(state.currencyValue);
				}}>
					{Object.keys(state.currency).map(item => {
						return(
							<option key = {item}>{item}</option>
						)
					})}
				</select>&nbsp;
				<Result/>
			</div>
		</div>
	)
}

