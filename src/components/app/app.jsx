import AppHeader from '../header/header.jsx';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { useState, useEffect } from 'react';
//import {date} from '../../utils/date.js'



function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setState({ ...state, data: data.data, isLoading: false }))
      .catch(e => {
      setState({ ...state, hasError: true, isLoading: false });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const { data, isLoading, hasError } = state;

  return (
    <div className={styles.app}> 
      {isLoading && console.log('Загрузка...')}
      {hasError && console.log('Произошла ошибка')} 
      {!isLoading &&
      !hasError &&
      data.length && (
        <>
        <AppHeader/>
        <main className={`${styles.main} pr-5 pl-5`}>
          <div className={`${styles.choosing} mr-5`}>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
            <BurgerIngredients ingredients={data}/>
          </div>
          <div className={`${styles.structure} ml-5 mt-25`}>
          <BurgerConstructor/>
          </div>
        </main>
        </>
      )}
      
    </div>
  );
}

export default App;
