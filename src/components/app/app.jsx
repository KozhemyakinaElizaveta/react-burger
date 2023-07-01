import AppHeader from '../header/header.jsx';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { useState, useEffect } from 'react';
import { BURGER_API_URL } from '../../utils/const.js';
//import {date} from '../../utils/date.js'



function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  };

  const checkSuccess = (res) => {
    if (res && res.success) {
      return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
  };

  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });

    fetch(`${BURGER_API_URL}/ingredients`)
      .then(res => checkResponse(res))
      .then(res => checkSuccess(res))
      .then(data => setState((prev) => ({ ...prev, data: data.data})))
      .catch(e => {
        setState((prev) => ({ ...prev, hasError: true}))
        return(console.log(e))
      })
      .finally (() => setState((prev) => ({ ...prev, isLoading: false})));
  };

  useEffect(() => {
    getData();
  }, []);

  const { data, isLoading, hasError } = state;

  if(isLoading) {
    return <>Загрузка...</>;
  }
  
  if (hasError) {
    return <>Произошла ошибка!</>;
  }

  return (
    <div className={styles.app}> 
      {!!data.length && (
        <>
        <AppHeader/>
        <main className={`${styles.main} pr-5 pl-5`}>
          <div className={`${styles.choosing} mr-5`}>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
            <BurgerIngredients ingredients={data}/>
          </div>
          <div className={`${styles.structure} ml-5 mt-25`}>
          <BurgerConstructor ingredients={data}/>
          </div>
        </main>
        </>
      )}
      
    </div>
  );
}

export default App;
