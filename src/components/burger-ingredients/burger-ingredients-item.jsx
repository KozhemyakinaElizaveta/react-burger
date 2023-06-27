import ingredientsPropTypes from '../../utils/prop-types.js';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';


const BurgerIngredientsItem = ({ingredient}) => {
    return (
        <div className={`${styles.pick} mt-6 mb-2 mr-4 ml-4`} >
            <img className={styles.image} src={ingredient.image_large} alt="" />
            <div className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
                {ingredient.price}
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
        </div>
    );
};

BurgerIngredientsItem.propTypes = {
    ingredient: ingredientsPropTypes.isRequired
};

export default BurgerIngredientsItem;