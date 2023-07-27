import styles from './ingredient-details.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {selectIngredient} from "../../services/actions/ingredient-details-action";

export function IngredientDetails() {
    const { ingredients } = useSelector((state) => state.burgerIngredients);
    const dispatch = useDispatch();

    const { id } = useParams();

    // const ingredient = useMemo(() => {
    //     return ingredients.find(i => i._id === id);
    // }, [id, ingredients]);

    // if (!ingredient) {
    //     return (
    //         <p>Не работает</p>
    //     );
    // }

    const { ingredient } = useSelector((state) => state.ingredientDetails);

    // const [ingredient, setIngredient] = useState(null)

    // useEffect(() => {
    //     if (ingredients && ingredients.length) {
    //         const _ingredient = ingredients.find(i => i._id === id)
    //         if (_ingredient) {
    //             setIngredient(_ingredient)
    //         }
    //     }
    // }, [id, ingredients])

    const { name, calories, carbohydrates, fat, proteins, image_large } = ingredient;

    useEffect(() => {
        dispatch(selectIngredient(ingredients.find((ingredient) => ingredient._id === id)));
    }, [dispatch, id, ingredients]);

    return(
        ingredient && (<>
        <div className={`${styles.main} mb-15`}>
            <img src={image_large} alt={name}></img>
            <span className='text text_type_main-medium mt-4 mb-8'>{name}</span>
            <div className={styles.contain}>
                <div className= {`${styles.value} mr-5`}>
                    <span className='text text_type_main-default text_color_inactive'>Калории, ккал</span>
                    <span className='text text_type_digits-default text_color_inactive'>{calories}</span>
                </div>
                <div className={`${styles.value} mr-5`}>
                    <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{proteins}</span>
                </div>
                <div className={`${styles.value} mr-5`}>
                    <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{fat}</span>
                </div>
                <div className={styles.value}>
                    <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{carbohydrates}</span>
                </div>
            </div>
        </div>
        </>)
    )
}

export default IngredientDetails;