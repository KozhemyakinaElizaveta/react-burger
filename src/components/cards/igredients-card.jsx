import PropTypes from "prop-types";
import ingredientsPropTypes from '../../utils/prop-types.js';
import { IngredientCard } from "./ingredient-card";
import { FillingCard } from "./filling-card";
// import styles from "./card.module.css";

export const IngredientsCard = ({ ingredients }) => {
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

IngredientsCard.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
};