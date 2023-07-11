import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/prop-types.js';


const BurgerIngredientsItem = ({ ingredient, onClick }) => {
    const { image, price, name, } = ingredient;

    return (
        <div className={`${styles.pick} mt-6 mb-2 mr-4 ml-4`} key={ingredient._id} onClick={() => onClick(ingredient)}>
            {0 < ingredient.counter && (
                <Counter count={ingredient.counter} size="default" extraClass="m-1" />
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

BurgerIngredientsItem.propTypes = {
    ingredient: ingredientsPropTypes.isRequired,
    setSelectedIngredient: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired
};

export default BurgerIngredientsItem;