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

const Layout = () => {
	const {state} = useContext(RateContext);
	const path = state.linkPath;
	return(
		<Fragment>
			<Header/>
			<div className = "content">
				<div className = "routes">
					<Switch>
						<Route path = {path.home} exact component={Home} />
						<Route path = {path.calc} exact component={Calc} />
						<Route path = {path.sample} exact component={Sample} />
						<Route path = {path.info} exact component={Info} />
					</Switch>
				</div>
				<Sidebar/>
			</div>
		</Fragment>
	)
}

export default AddClass(Layout, 'layout')