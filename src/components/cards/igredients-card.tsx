import { IngredientCard } from "./ingredient-card";
import { FillingCard } from "./filling-card";
import { TIngredient } from '../../utils/types';
import { FC } from "react";


type TIngredientsCard = {
    ingredients: Array<TIngredient>
}

export const IngredientsCard: FC<TIngredientsCard> = ({ ingredients }) => {
    return ingredients.length === 0 ? (
        <div className="pt-2 pb-2 ml-2" >
            <FillingCard />
        </div>
    ) : (
        <>
        {ingredients.map((item, index) => {
            return (
            <div className="pt-2 pb-2 ml-2" >
                <IngredientCard item={item} index={index} key={item.key} />
            </div>
            );
        })}
        </>
    );
};