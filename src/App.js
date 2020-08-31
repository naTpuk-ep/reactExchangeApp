import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout.js';
import {RateContext} from './context/RateContext'
import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBP from './image/GBP.png';
import JPY from './image/JPY.png';
import RUB from './image/RUB.png';
import USD from './image/USD.png';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      linkPath: {
        home: '/',
        calc: '/calc',
        sample: '/sample',
        info: '/info',
      },
      base: 'RUB',
      rate: '',
      date: '',
      currency: { 
        USD: {name: 'Доллар США', flag: USD, course: ''},
        CNY: {name: 'Китайский Юань', flag: CNY, course: ''},
        EUR: {name: 'Евро', flag: EUR, course: ''},
        GBP: {name: 'Фунт Стерлингов', flag: GBP, course: ''},
        JPY: {name: 'Японская Йена', flag: JPY, course: ''},
        RUB: {name: 'Российский Рубль', flag: RUB, course: ''},
        CHF: {name: 'Швейцарский Франк', flag: CHF, course: ''}
      },
      //calc
      inputValue: 100,
      currencyValue: 'USD',

    }
  }

  setBase = (event) => {
    this.setState({base: event.target.value});   //????????????
    console.log("value", event.target.value);
    console.log("base", this.state.base);
    this.calcHandler(this.state.currencyValue);
  }

  inputValueHandler = (event) => {
    this.setState({inputValue: event.target.value});
    this.calcHandler(this.state.currencyValue);
  }

  currencyValueHandler = (event) => {
    this.setState({currencyValue: event.target.value});
    this.calcHandler(event.target.value);
  }

  calcHandler = async (value) => {
    let result;
    await fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => res.json()).then(res => {
        result = res.rates[value]*this.state.inputValue;
      })
      this.setState({result: Math.floor(result*1000)/1000});
  }

  componentDidMount() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => res.json()).then(res => {
        const rateArr = Object.keys(this.state.currency);
        const currency = {...this.state.currency};
        rateArr.forEach(rate => {
          currency[rate].course = res.rates[rate];
        })
        this.setState({
            rate: res.rates,
            date: res.date
        })
        this.calcHandler(this.state.currencyValue)
      })
  }

  render(){
    return(
      <RateContext.Provider value = {{
        state: this.state,
        inputValueHandler: this.inputValueHandler,
        currencyValueHandler: this.currencyValueHandler,
        calcHandler: this.calcHandler,
        setBase: this.setBase
      }}>
        <Layout/>
      </RateContext.Provider>
    )
  }
}

export default App