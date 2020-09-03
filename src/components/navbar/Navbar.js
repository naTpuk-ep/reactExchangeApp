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
				<li><NavLink to = {path.home}>Главная</NavLink></li>
				<li><NavLink onClick = {(e) => {
					const outSelect = document.querySelectorAll('select');
					if (outSelect[outSelect.length-1].value === outSelect[0].value){
						let target = outSelect[0].value;
						state.currencyValue = Object.keys(state.currency).find(item => item !== target);
					};
					calcHandler(state.currencyValue)
				}} to = {path.calc}>Калькулятор</NavLink></li>
				<li><NavLink to = {path.sample}>Выборки</NavLink></li>
				<li><NavLink to = {path.info}>Информация</NavLink></li>
			</ul>
		</nav>
	)
}