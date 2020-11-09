import React, {useContext} from 'react'
import './navbar.scss'
import { NavLink } from 'react-router-dom'
import { RateContext } from '../../context/RateContext'

export const Navbar = () =>{
	const {state, calcHandler} = useContext(RateContext);
	const path = state.linkPath;
	return(
		<nav>
			<ul>
				<li><NavLink to = {path.home}>Home</NavLink></li>
				<li><NavLink onClick = {(e) => {
					try{
						const outSelect = document.querySelectorAll('select');
						if (outSelect[outSelect.length-1].value === outSelect[0].value){
							let target = outSelect[0].value;
							state.currencyValue = Object.keys(state.currency).find(item => item !== target);
						};
						calcHandler(state.currencyValue);
					}catch(e){}
				}} to = {path.calc}>Calculator</NavLink></li>
				<li><NavLink to = {path.sample}>Samples</NavLink></li>
				<li><NavLink to = {path.info}>Info</NavLink></li>
			</ul>
		</nav>
	)
}