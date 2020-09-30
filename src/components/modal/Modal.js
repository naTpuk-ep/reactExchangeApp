import React, {Fragment, useState, useContext} from 'react'
import './modal.scss'
import { Login } from '../login/Login';
import { Register } from '../register/Register';
import { RateContext } from '../../context/RateContext';


export const Modal = () =>{
	const cls = ['modal'];
	const {state, modalShowHandler} = useContext(RateContext);
	const [value, setValue] = useState('login');
	const links = [{name: 'Вход', id: 'login'}, {name: 'Регистрация', id: 'register'}];
	const windowHandler = (id) => {
		setValue(id);
	}
	if (state.showModal) {
		cls.push('modalShow');
	}
	return(
		<div className = {cls.join(' ')}>
			<Fragment>
				<div className = 'modalHead'>
					<ul>
						{links.map(link => {
							return(
								<li style = {{borderBottom: link.id===value?'3px solid black':'none'}}
								key = {link.name} onClick = {()  => windowHandler(link.id)}>{link.name}</li>
							)
						})}
					</ul>
					<i className = 'fa fa-times' aria-hidden = 'true' onClick = {modalShowHandler}/>
				</div>
				<hr />
			</Fragment>
					<h2 style = {{color: 'red'}}>{state.error}</h2>
			{value==='register'?<Register/>:<Login/>}
		</div>
	)
}
