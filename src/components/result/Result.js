import React, { useContext } from 'react'
import './result.scss'
import { RateContext } from '../../context/RateContext'

export const Result = () => {
	const {state} = useContext(RateContext);
	return(
		<span className='output'>&nbsp;{state.result}&nbsp;</span>
	)
}