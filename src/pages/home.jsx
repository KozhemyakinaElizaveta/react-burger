import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from '../components/app/app.module.css';
import { Outlet } from 'react-router-dom';

export function HomePage() {

    return (
        <main className={`${styles.main} pr-5 pl-5`}>
            <DndProvider backend={HTML5Backend}>
                <div className={`${styles.choosing} mr-5`}>
                <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
                    <BurgerIngredients/>
                </div>
                <div className={`${styles.structure} ml-5 mt-25`}>
                <BurgerConstructor/>
                <Outlet />
                </div>
            </DndProvider>
        </main>
    )
}