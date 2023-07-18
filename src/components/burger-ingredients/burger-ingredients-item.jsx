import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useDrag } from "react-dnd";


const BurgerIngredientsItem = ({ ingredient, onClick }) => {
    const { image, price, name, } = ingredient;

    const [{isDragging}, dragRef] = useDrag({
        type: "INGREDIENT_CARD",
        item: {...ingredient},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div className={`${styles.pick} mt-6 mb-2 mr-4 ml-4`} 
            key={ingredient._id} 
            onClick={() => onClick(ingredient)} 
            ref={dragRef}
            style={{ border: isDragging ? "1px solid #2f2f37" : "0px" }}
        >
            {0 < ingredient.counter && (
                <Counter count={ingredient.counter} size="default" />
            )}
            <img className={styles.image} src={image} alt={name} />
            <div className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
                {price}
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{name}</p>
        </div>
    );
};

export default BurgerIngredientsItem;