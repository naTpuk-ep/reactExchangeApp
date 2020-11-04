import React, {Fragment, useContext} from 'react'
import './login.scss'
import { RateContext } from '../../context/RateContext';
import { Button } from '../button/Button';

export const Login = () =>{
	const {renderInputs, state, loginHandler} = useContext(RateContext);
	return(
		<Fragment>
			<form className = 'modalForm'>
				{renderInputs()}
				<div className = 'modalBtn'>
					<Button text = 'Войти' disabled = {!state.isFormValid} click = {loginHandler}/>
				</div>
			</form>
		</Fragment>
	)
}