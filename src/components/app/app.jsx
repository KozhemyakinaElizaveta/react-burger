import AppHeader from '../header/header.jsx';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { getIngredients } from "../../services/actions/ingredients-action";



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}> 
      <>
        <AppHeader/>
        <main className={`${styles.main} pr-5 pl-5`}>
          <div className={`${styles.choosing} mr-5`}>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
            <BurgerIngredients/>
          </div>
          {/* <div className={`${styles.structure} ml-5 mt-25`}>
          <BurgerConstructor ingredients={data}/>
          </div> */}
        </main>
      </>
    </div>
  );
}

export default App;
