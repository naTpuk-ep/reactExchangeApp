import React, {Fragment, useContext} from 'react'
import './layout.scss'
import {AddClass} from '../../hoc/AddClass'
import { Header } from '../header/Header';
import { Home } from '../../pages/home/Home';
import {Sidebar} from '../../components/sidebar/Sidebar'
import { Route, Switch } from 'react-router-dom';
import {Calc} from '../../pages/calc/Calc'
import {Sample} from '../../pages/sample/Sample'
import {Info} from '../../pages/info/Info'
import { RateContext } from '../../context/RateContext';
import {UnAuthMessage} from'../unAuthMessage/UnAuthMessage.js'

const Layout = () => {
	const {state} = useContext(RateContext);
	const path = state.linkPath;
	return(
		<Fragment>
			<Header/>
			<div className = "content">
				<div className = "routes">
					{/* {state.auth? */}
						<Switch>
							<Route path = {path.home} exact component={Home} />
							<Route path = {path.calc} exact component={state.auth ? Calc : UnAuthMessage} />
							<Route path = {path.sample} exact component={state.auth ? Sample : UnAuthMessage} />
							<Route path = {path.info} exact component={state.auth ? Info : UnAuthMessage} />
						</Switch>
					{/* } */}
				</div>
				<Sidebar/>
			</div>
		</Fragment>
	)
}

export default AddClass(Layout, 'layout')