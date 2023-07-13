import BurgerIngredientsItem from './burger-ingredients-item.jsx';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/prop-types.js';
import styles from './burger-ingredients.module.css';
import { forwardRef, useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients-action";
import Modal from '../modal/modal.jsx';
import { useDispatch, useSelector } from "react-redux";
import {
    NO_INGREDIENT,
} from "../../services/actions/ingredient-details-action";
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";


const BurgerItemsCategory = forwardRef(
    ({ title, ingredients, onClick }, ref) => {
    
    const { ref1, ref2 } = ref.current;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const ingredientDetailsModal = useSelector(
        (state) => state.ingredientDetails.ingredient
    );

    function closeIngredientDetailsModal() {
        dispatch({ type: NO_INGREDIENT });
    }

    return (
        <div className={styles.items_content}>
            <h2 ref={ref2} className={`${styles.title} text text_type_main-medium mt-10`}>{title}</h2>
            <div className={styles.items} ref={ref1}>
                {ingredients.map(ingredient => (
                    <BurgerIngredientsItem key={ingredient._id} ingredient={ingredient} onClick={onClick}/>
                ))}
            </div>
            {ingredientDetailsModal && <Modal onClose={closeIngredientDetailsModal} title = 'Детали ингредиента'>
                <IngredientDetails />
            </Modal>}
        </div>
    );
}
);

BurgerItemsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
};

export default BurgerItemsCategory; 