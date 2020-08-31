import React, {useContext} from 'react'
import './navbar.scss'
import { NavLink } from 'react-router-dom'
import { RateContext } from '../../context/RateContext'

export const Navbar = () =>{
	const {state} = useContext(RateContext);
	const path = state.linkPath;
	return(
		<nav>
			<ul>
				<li><NavLink to = {path.home}>Главная</NavLink></li>
				<li><NavLink to = {path.calc}>Калькулятор</NavLink></li>
				<li><NavLink to = {path.sample}>Выборки</NavLink></li>
				<li><NavLink to = {path.info}>Информация</NavLink></li>
			</ul>
		</nav>
	)
}