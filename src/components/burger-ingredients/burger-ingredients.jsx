import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BurgerItemsCategory from './burger-ingredients-category.jsx';
import { useInView } from "react-intersection-observer";
import {
    OPEN_MODAL_INGREDIENT,
    selectIngredient,
} from "../../services/actions/ingredient-details-action";


function BurgerIngredients() {
    const { ingredients } = useSelector((state) => state.burgerIngredients);
    const dispatch = useDispatch();
    // const [currentTab, setCurrentTab] = React.useState('bun')
    const titleBunRef = useRef();
    const titleMainRef = useRef();
    const titleSaucesRef = useRef();

    const buns = useMemo(
        () => ingredients.filter((item) => item.type === "bun"),
        [ingredients]
    );

    const mains = useMemo(
        () => ingredients.filter((item) => item.type === "main"),
        [ingredients]
    );

    const sauces = useMemo(
        () => ingredients.filter((item) => item.type === "sauce"),
        [ingredients]
    );

    const [refBuns, inViewBuns] = useInView({ threshold: 0.05 });
    const [refSauces, inViewSauces] = useInView({ threshold: 0.05 });
    const [refMains, inViewMains] = useInView({ threshold: 0.05 });

    const activeTab = () => {
        if (inViewBuns) {
            return 1
        } else if (inViewSauces) {
            return 2
        } else if (inViewMains) {
            return 3
        }
    };

    const handleButtonClick = (ref) =>
    ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
    });

    const openModalIngredientCard = (ingredient) => {
        dispatch(selectIngredient(ingredient));
        dispatch({
            type: OPEN_MODAL_INGREDIENT,
        });
    };

    const refForBun = useRef({ refBuns, titleBunRef });
    const refForSauce = useRef({ refSauces, titleSaucesRef });
    const refForMain = useRef({ refMains, titleMainRef });

    return (
        <div className={styles.container}>
        <div className={styles.tab}>
            <Tab value="bun" active={activeTab() === 1} onClick={() => handleButtonClick(titleBunRef)}>
            Булки
            </Tab>
            <Tab value="sauce" active={activeTab() === 2} onClick={() => handleButtonClick(titleSaucesRef)}>
            Соусы
            </Tab>
            <Tab value="main" active={activeTab() === 3} onClick={() => handleButtonClick(titleMainRef)}>
            Начинки
            </Tab>
        </div>
        <section className={styles.scroll} >
            <div className={styles.items_category}>
                <BurgerItemsCategory 
                    title = 'Булки'
                    ingredients = {buns}
                    onClick = {openModalIngredientCard}
                    ref={refForBun}
                />
                <BurgerItemsCategory 
                    title = 'Соусы'
                    ingredients = {sauces}
                    onClick = {openModalIngredientCard}
                    ref={refForSauce}
                />
                <BurgerItemsCategory 
                    title = 'Начинки'
                    ingredients = {mains}
                    onClick = {openModalIngredientCard}
                    ref={refForMain}
                />
            </div>
        </section>
        </div>
    );
}

export default BurgerIngredients;