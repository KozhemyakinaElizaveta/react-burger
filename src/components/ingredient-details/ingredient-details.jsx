import styles from './ingredient-details.module.css';
import ingredientsPropTypes from '../../utils/prop-types.js';

export function IngredientDetails({selectedIngredient}) {
    return(
        <>
        <div className={`${styles.main} mb-15`}>
            <img src={selectedIngredient.image_large} alt=''></img>
            <span className='text text_type_main-medium mt-4 mb-8'>{selectedIngredient.name}</span>
            <div className={styles.contain}>
                <div className= {`${styles.value} mr-5`}>
                    <span className='text text_type_main-default text_color_inactive'>Калории, ккал</span>
                    <span className='text text_type_digits-default text_color_inactive'>{selectedIngredient.calories}</span>
                </div>
                <div className={`${styles.value} mr-5`}>
                    <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{selectedIngredient.proteins}</span>
                </div>
                <div className={`${styles.value} mr-5`}>
                    <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{selectedIngredient.fat}</span>
                </div>
                <div className={styles.value}>
                    <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{selectedIngredient.carbohydrates}</span>
                </div>
            </div>
        </div>
        </>
    )
}

IngredientDetails.propTypes = {
    selectedIngredient: ingredientsPropTypes.isRequired
}

export default IngredientDetails;