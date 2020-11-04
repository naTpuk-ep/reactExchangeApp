import React, { useContext } from 'react'
import { RateContext } from '../../context/RateContext'
import './unAuthMessage.scss'

export const UnAuthMessage = () => {
	const {modalShowHandler} = useContext(RateContext);
	return (
		<h1 className="unAuthMeggage" onClick = {modalShowHandler}>Log in to use all the functionality&nbsp;&nbsp;&nbsp;
			<i className = "fa fa-user" aria-hidden = "true"/>
		</h1>
	)
}
