import AppHeader from '../header/header.jsx';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';


function App() {

  return (
    <div className={styles.app}> 
      <>
        <AppHeader/>
        <main className={`${styles.main} pr-5 pl-5`}>
        <DndProvider backend={HTML5Backend}>
          <div className={`${styles.choosing} mr-5`}>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
            <BurgerIngredients/>
          </div>
          <div className={`${styles.structure} ml-5 mt-25`}>
          <BurgerConstructor/>
          </div>
        </DndProvider>
        </main>
      </>
    </div>
  );
}

export default App;
