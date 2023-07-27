import BurgerIngredientsItem from './burger-ingredients-item.jsx';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/prop-types.js';
import styles from './burger-ingredients.module.css';
import { forwardRef, useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients-action";
import { useDispatch } from "react-redux";



const BurgerItemsCategory = forwardRef(
    ({ title, ingredients, onClick }, ref) => {
    
    const { ref1, ref2 } = ref.current;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

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

BurgerItemsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
};

export default BurgerItemsCategory; 