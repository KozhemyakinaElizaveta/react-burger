import BurgerIngredientsItem from './burger-ingredients-item.jsx';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/prop-types.js';
import styles from './burger-ingredients.module.css';

const BurgerItemsCategory = (props) => {
    return (
        <div className={styles.items_content}>
            <h2 ref={props.titleRef} className={`${styles.title} text text_type_main-medium mt-10`}>{props.title}</h2>
            <div className={styles.items}>
                {props.ingredients.map(ingredient => (
                    <BurgerIngredientsItem key={ingredient._id} ingredient={ingredient}/>
                ))}
            </div>
        </div>
    );
};

BurgerItemsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    titleRef: PropTypes.object.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
};

export default BurgerItemsCategory; 