import BurgerIngredientsItem from './burger-ingredients-item';
import styles from './burger-ingredients.module.css';
import { forwardRef } from "react";
import { TIngredient } from '../../utils/types';

interface Props {
    title: string,
    ingredients: Array<TIngredient>,
    onClick: (ingredient: TIngredient) => void,
    tabRef: any
}

export type Ref = HTMLInputElement;

const BurgerItemsCategory = forwardRef<Ref, Props>(
    ({ title, ingredients, onClick, tabRef }, ref) => {

    return (
        <div className={styles.items_content}>
            <h2 ref={ref} className={`${styles.title} text text_type_main-medium mt-10`}>{title}</h2>
            <div className={styles.items + ' buns'} ref={tabRef}>
                {ingredients.map(ingredient => (
                    <BurgerIngredientsItem key={ingredient._id} ingredient={ingredient} onClick={onClick}/>
                ))}
            </div>
        </div>
    );
}
);

export default BurgerItemsCategory; 