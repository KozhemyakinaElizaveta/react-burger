import PropTypes from "prop-types";
import ingredientsPropTypes from '../../utils/prop-types.js';
import { IngredientCard } from "./ingredient-card.jsx";
import { FillingCard } from "./filling-card.jsx";
// import styles from "./card.module.css";
import { TIngredient} from '../../utils/types';

export const IngredientsCard = ({ ingredients: Array<TIngredient> = []}) => {
    return ingredients.length === 0 ? (
        <div className="pt-2 pb-2 ml-2" >
            <FillingCard />
        </div>
    ) : (
        <>
        {ingredients.map((item, index) => {
            return (
            <div className="pt-2 pb-2 ml-2" >
                <IngredientCard item={item.ingredient} index={index} key={item.key} />
            </div>
            );
        })}
        </>
    );
};