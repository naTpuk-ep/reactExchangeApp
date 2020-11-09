import React, {useContext} from 'react'
import './exchange.scss'
import { RateContext } from '../../context/RateContext';
import { BaseSelect } from '../BaseSelect';

export const Exchange = () =>{
	const {state, setBase} = useContext(RateContext)
	let currency = {...state.currency}
	return(
		<div className = "exchange">
			<div className = "exchangeContainer">
				<div className = "exchangeContent">
					<div> <p>Base currency: &nbsp;<BaseSelect change = {(event) => {
						setBase(event);
					}}/>&nbsp;&nbsp;Date:&nbsp;{state.date}</p></div>
					<ul>
						{Object.keys(currency).map((item)=>{
								return( `${item}` !== state.base ?
									<li key= {item}>
									<span><img src = {currency[item].flag} alt = {item}/> {item}</span>
									<span>{`1${state.base} = ${Math.floor(currency[item].course*1000)/1000} ${item}`}</span>
									</li>
								: null)
							})}
					</ul>
				</div>
			</div>
		</div>
	)
}