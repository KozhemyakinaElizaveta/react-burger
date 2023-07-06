import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/prop-types.js';


const BurgerIngredientsItem = ({ingredient, setSelectedIngredient, setShowModal}) => {

    function getSet (item, bool) {
        setSelectedIngredient(item)
        setShowModal(bool)
    };

    return (
        <div className={`${styles.pick} mt-6 mb-2 mr-4 ml-4`}  onClick={() => getSet(ingredient, true)}>
            <img className={styles.image} src={ingredient.image} alt="" />
            <div className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
                {ingredient.price}
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
        </div>
    );
};

BurgerIngredientsItem.propTypes = {
    ingredient: ingredientsPropTypes.isRequired,
    setSelectedIngredient: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired
};

export default BurgerIngredientsItem;