import React, { useContext } from 'react'
import { RateContext } from '../../context/RateContext';
import './dark.scss'

export const Dark = () =>{
  const {state, modalShowHandler} = useContext(RateContext);
  const cls = ['dark']
  if(state.showModal){
    cls.push('darkShow');
  }
	return(
    <div className = {cls.join(' ')} onClick = {modalShowHandler}></div>
  )
}