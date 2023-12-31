import styles from './ingredient-details.module.css';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export function IngredientDetails() {

    const { id } = useParams();
    //@ts-ignore
    const ingredient = useSelector((state) => state.burgerIngredients.ingredients.find(({_id}) => _id === id));

    if (!ingredient) return null;

    const { name, calories, carbohydrates, fat, proteins, image_large } = ingredient;

    return(
        ingredient && (<>
        <div className={`${styles.main} mb-15`}>
            <img src={image_large} alt={name}></img>
            <span className='text text_type_main-medium mt-4 mb-8'>{name}</span>
            <div className={styles.contain}>
                <div className= {`${styles.value} mr-5`}>
                    <span className='text text_type_main-default text_color_inactive'>Калории, ккал</span>
                    <span className='text text_type_digits-default text_color_inactive calories'>{calories}</span>
                </div>
                <div className={`${styles.value} mr-5`}>
                    <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
                    <span className='text text_type_digits-default text_color_inactive proteins'>{proteins}</span>
                </div>
                <div className={`${styles.value} mr-5`}>
                    <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
                    <span className='text text_type_digits-default text_color_inactive fat'>{fat}</span>
                </div>
                <div className={styles.value}>
                    <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
                    <span className='text text_type_digits-default text_color_inactive carbohydrates'>{carbohydrates}</span>
                </div>
            </div>
        </div>
        </>)
    )
}

export default IngredientDetails;