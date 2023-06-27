import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/prop-types.js';
import BurgerItemsCategory from './burger-ingredients-category.jsx';

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
};

function BurgerIngredients(props) {
    const [currentTab, setCurrentTab] = React.useState('bun')
    const titleBunRef = useRef(null);
    const titleMainRef = useRef(null);
    const titleSaucesRef = useRef(null);

    const onTabClick = (tab) => {
        setCurrentTab(tab);
        if (tab === "bun") titleBunRef.current?.scrollIntoView({behavior: "smooth"});
        if (tab === "main") titleMainRef.current?.scrollIntoView({behavior: "smooth"});
        if (tab === "sauce") titleSaucesRef.current?.scrollIntoView({behavior: "smooth"})
    };

    const buns = useMemo(
        () => props.ingredients.filter((item) => item.type === "bun"),
        [props.ingredients]
    );

    const mains = useMemo(
        () => props.ingredients.filter((item) => item.type === "main"),
        [props.ingredients]
    );

    const sauces = useMemo(
        () => props.ingredients.filter((item) => item.type === "sauce"),
        [props.ingredients]
    );

    return (
        <div className={styles.container}>
        <div className={styles.tab}>
            <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
            Булки
            </Tab>
            <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
            Соусы
            </Tab>
            <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
            Начинки
            </Tab>
        </div>
        <section className={styles.scroll} >
            <div className={styles.items_category}>
                <BurgerItemsCategory 
                    title = 'Булки'
                    titleRef = {titleBunRef}
                    ingredients = {buns}
                />
                <BurgerItemsCategory 
                    title = 'Соусы'
                    titleRef = {titleSaucesRef}
                    ingredients = {mains}
                />
                <BurgerItemsCategory 
                    title = 'Начинки'
                    titleRef = {titleMainRef}
                    ingredients = {sauces}
                />
            </div>
        </section>
        </div>
    );
}

export default BurgerIngredients;