import AppHeader from '../homepage/header.jsx';
import styles from './app.module.css';
import BurgerIngredients from '../homepage/burger-ingredients.jsx';
import BurgerConstructor from '../homepage/burger-constructor.jsx';
import {date} from '../../utils/date.js'


function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={`${styles.main} pr-5 pl-5`}>
        <div className={`${styles.choosing} mr-5`}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
          <BurgerIngredients ingredients={date}/>
        </div>
        <div className={`${styles.structure} ml-5 mt-25`}>
          <BurgerConstructor/>
        </div>
      </main>
    </div>
  );
}

export default App;
