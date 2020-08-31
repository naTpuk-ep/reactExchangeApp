import React from 'react'
import './calc.scss'
import { Counter } from '../../components/counter/Counter'

export const Calc = () => {
	return (
		<div className='calc'>
			<div className='calcContainer'>
				<Counter/>
			</div>
		</div>
	)
}