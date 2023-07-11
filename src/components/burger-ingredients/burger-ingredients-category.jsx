import BurgerIngredientsItem from './burger-ingredients-item.jsx';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/prop-types.js';
import styles from './burger-ingredients.module.css';
import { Modal } from '../modal/modal.jsx';
import { useState} from "react";
import { IngredientDetails } from '../ingredient-details/ingredient-details.jsx';
import { forwardRef } from "react";

const BurgerItemsCategory = forwardRef(
    ({ title, ingredients }, titleRef) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    return (
        <div className={styles.items_content}>
            <h2 ref={titleRef} className={`${styles.title} text text_type_main-medium mt-10`}>{title}</h2>
            <div className={styles.items}>
                {ingredients.map(ingredient => (
                    <BurgerIngredientsItem setSelectedIngredient={setSelectedIngredient} key={ingredient._id} ingredient={ingredient} setShowModal={setShowModal}/>
                ))}
            </div>
            {showModal && <Modal showModal={showModal} onClose={() =>  setShowModal(false)} title = 'Детали ингредиента'>
                <IngredientDetails selectedIngredient = {selectedIngredient} showModal={showModal} onClose={() =>  setShowModal(false)}></IngredientDetails>
            </Modal>}
        </div>
    );
}
);

BurgerItemsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    titleRef: PropTypes.object.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
};

export default BurgerItemsCategory; 