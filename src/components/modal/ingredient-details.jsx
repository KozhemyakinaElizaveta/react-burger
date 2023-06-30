import styles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function IngredientDetails({selectedIngredient, onClose}) {
    return(
        <>
        <div className={`${styles.button} mr-10 mt-10 ml-10`}>
            <span className={`${styles.text} text text_type_main-large`}>Детали ингредиента</span>
            <div className={styles.icon}>
                <CloseIcon type="primary" onClick={onClose}/>
            </div>
        </div>
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

export default IngredientDetails;