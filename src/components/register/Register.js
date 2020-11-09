import React, {Fragment, useContext} from 'react';
import { RateContext } from '../../context/RateContext';
import { Button } from '../button/Button';
import './register.scss';
import firebase from 'firebase/app';
import 'firebase/database'

export const Register = () =>{
	const {renderInputs, state, registerHandler} = useContext(RateContext);
	const db = firebase.database();
	// db.on('value', )

	

	return(
		<Fragment>
			<form className = 'modalForm'>
				{renderInputs()}
				<div className = 'modalBtn'>
					<Button text = 'Sign up' disabled = {!state.isFormValid} click = {registerHandler}/>
				</div>
			</form>
		</Fragment>
	)
}