import BurgerIngredientsItem from './burger-ingredients-item';
import styles from './burger-ingredients.module.css';
import { forwardRef } from "react";
import { TIngredient } from '../../utils/types';

interface Props {
    title: string,
    ingredients: Array<TIngredient>,
    onClick: (ingredient: TIngredient) => void
}

export type Ref = HTMLButtonElement;

const BurgerItemsCategory = forwardRef<Ref, Props>(
    ({ title, ingredients, onClick }, ref) => {
    //не понимаю как исправить
    //@ts-ignore
    const { ref1, ref2 } = ref.current;

    return (
        <div className={styles.items_content}>
            <h2 ref={ref2} className={`${styles.title} text text_type_main-medium mt-10`}>{title}</h2>
            <div className={styles.items} ref={ref1}>
                {ingredients.map(ingredient => (
                    <BurgerIngredientsItem key={ingredient._id} ingredient={ingredient} onClick={onClick}/>
                ))}
            </div>
        </div>
    );
}
);

export default BurgerItemsCategory; 