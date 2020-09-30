import React from 'react';
import Layout from './components/layout/Layout.js';
import {Modal} from './components/modal/Modal.js';
import {Dark} from './components/dark/Dark.js';
import {RateContext} from './context/RateContext';
import axios from 'axios';
import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBP from './image/GBP.png';
import JPY from './image/JPY.png';
import RUB from './image/RUB.png';
import USD from './image/USD.png';
import { Input } from './components/input/Input';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      auth: false,
      error: '',
      formControls: {
        email: {
          value: '',
          type: 'Email',
          label: 'Email',
          errorMessage: 'Введите корректный Email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true
          }
        },
        password: {
          value: '',
          type: 'password',
          label: 'password',
          errorMessage: 'Введите корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6
          }
        }
      },
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
      inputValue: '100',
      currencyValue: 'USD',
      //sample
      sample: {
        base: 'USD',
        base2: 'RUB',
        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        course: ''
      },
      sampleList: '',
      showModal: false,
      isFormValid: false
    }
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try{
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHd9v6hI9pt_Ktk5KYeP605xa7PkHz5Iw', authData)
      if(response.data.idToken){
        const formControls = {...this.state.formControls};
        formControls.email.value = '';
        formControls.password.value = '';
        this.setState({
          auth: true,
          error: '',
          formControls
        });
        this.modalShowHandler();
      }
    }catch(e){
      console.log(e);
      this.setState({error: 'Неверный email или пароль'})
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try{
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHd9v6hI9pt_Ktk5KYeP605xa7PkHz5Iw', authData)
      if(response.data.idToken){
        const formControls = {...this.state.formControls};
        formControls.email.value = '';
        formControls.password.value = '';
        this.setState({
          auth: true,
          error: '',
          formControls
        });
        this.modalShowHandler();
      }
    }catch(e){
      console.log(e);
      this.setState({error: 'ошибка'})
    }
  }

  modalShowHandler = () => {
    this.setState({showModal: !this.state.showModal})
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  }

  validateControl = (value, validation) => {
    if (!validation){
      return true;
    }
    let isValid = true;
    if(validation.required){
      isValid = value.trim() !== '' && isValid;
    }
    if(validation.email){
      isValid = this.validateEmail(value) && isValid;
    }
    if(validation.minLength){
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;
    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({formControls, isFormValid});
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName]
      return(
        <Input
          key = {controlName + i}
          type = {control.type}
          value = {control.value}
          valid = {control.valid}
          touched = {control.touched}
          label = {control.label}
          errorMessage = {control.errorMessage}
          shouldValidate = {true}
          onChange = {(event) => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  sampleRemove = async (id) => {
    await axios.delete(`https://rateapp-7d227.firebaseio.com/sample/${id}.json`);
    let sampleList = {...this.state.sampleList};
    delete sampleList[id];
    this.setState({sampleList});
  }
  
  dataWrite = async () => {
    await fetch(`https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base}`)
      .then(res => res.json()).then(res => {
        this.setState({sample: {...this.state.sample, course: res.rates[this.state.sample.base2]}})
      })
    await axios.post('https://rateapp-7d227.firebaseio.com/sample.json', this.state.sample)
      .then (res => {
        return('')
      })
    await axios('https://rateapp-7d227.firebaseio.com/sample.json')
      .then (res => {
        this.setState({sampleList: res.data});
      })
  }

  baseHandler = (event) => {
    this.setState({sample: {...this.state.sample, base: event.target.value}})
  }

  base2Handler = (event) => {
    this.setState({sample: {...this.state.sample, base2: event.target.value}})
  }

  sampleDateHandler = (event) => {
    this.setState({sample: {...this.state.sample, date: event.target.value}})
  }

  setBase = (event) => {
      this.setState({base: event.target.value}, () => {
        this.setCurrency();
        this.calcHandler(this.state.currencyValue);
    });
  }

  inputValueHandler = (event) => {
    this.setState({inputValue: event.target.value}, () => {
      this.calcHandler(this.state.currencyValue);
    });
  }

  currencyValueHandler = (event) => {
    this.setState({currencyValue: event.target.value}, () => {
      this.calcHandler(this.state.currencyValue);
    });
  }

  calcHandler = async (value) => {
    let result;
    await fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => res.json()).then(res => {
        result = res.rates[value]*this.state.inputValue;
      });
      this.setState({result: Math.floor(result*1000)/1000});
  }

  setCurrency = () => {
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
      });
  }

  componentDidMount() {
    this.setCurrency();
    this.calcHandler(this.state.currencyValue);
    axios('https://rateapp-7d227.firebaseio.com/sample.json')
      .then (res => {
        if(res.data) this.setState({sampleList: res.data});
      })
  }

  render(){
    return(
      <RateContext.Provider value = {{
        state: this.state,
        inputValueHandler: this.inputValueHandler,
        currencyValueHandler: this.currencyValueHandler,
        calcHandler: this.calcHandler,
        setBase: this.setBase,
        setCurrency: this.setCurrency,
        baseHandler: this.baseHandler,
        base2Handler: this.base2Handler,
        sampleDateHandler: this.sampleDateHandler,
        dataWrite: this.dataWrite,
        sampleRemove: this.sampleRemove,
        renderInputs: this.renderInputs,
        modalShowHandler: this.modalShowHandler,
        loginHandler: this.loginHandler,
        registerHandler: this.registerHandler
        }}>
        <Layout/>
        <Dark/>
        <Modal/>
      </RateContext.Provider>
    )
  }
}

export default App;