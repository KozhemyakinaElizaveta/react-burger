import ingredientsPropTypes from '../../utils/prop-types.js';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { Modal } from '../modal/modal.jsx';
import { useState} from "react";
import { IngredientDetails } from '../modal/ingredient-details.jsx';


const BurgerIngredientsItem = ({ingredient}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={`${styles.pick} mt-6 mb-2 mr-4 ml-4`} onClick={() => setShowModal(true)}>
            <Modal showModal={showModal} handleClose={() =>  setShowModal(false)}>
                <IngredientDetails ingredient={ingredient} handleClose={() =>  setShowModal(false)}></IngredientDetails>
            </Modal>
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
    ingredient: ingredientsPropTypes.isRequired
};

export default BurgerIngredientsItem;