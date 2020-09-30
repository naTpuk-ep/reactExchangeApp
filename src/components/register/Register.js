import React, {Fragment, useContext} from 'react';
import { RateContext } from '../../context/RateContext';
import { Button } from '../button/Button';
import './register.scss';

export const Register = () =>{
	const {renderInputs, state, registerHandler} = useContext(RateContext);
	return(
		<Fragment>
			<form className = 'modalForm'>
				{renderInputs()}
				<div className = 'modalBtn'>
					<Button text = 'Зарегестрироваться' disabled = {!state.isFormValid} click = {registerHandler}/>
				</div>
			</form>
		</Fragment>
	)
}