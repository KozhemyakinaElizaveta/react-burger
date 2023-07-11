import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BurgerItemsCategory from './burger-ingredients-category.jsx';

function BurgerIngredients() {
    const { ingredients } = useSelector((state) => state.burgerIngredients);
    const dispatch = useDispatch();
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

    function onScroll(event) {
        const scrolling = event.target.scrollTop;
    
        const sauceScrolling =
            titleSaucesRef.current.getBoundingClientRect().top -
            titleBunRef.current.getBoundingClientRect().top;
        const mainScrolling =
            titleMainRef.current.getBoundingClientRect().top -
            titleBunRef.current.getBoundingClientRect().top;
    
        if (scrolling > mainScrolling) {
            setCurrentTab("main");
        } else if (scrolling <= sauceScrolling) {
            setCurrentTab("bun");
        } else {
            setCurrentTab("sauce");
        }
    }

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
            <div className={styles.items_category} onScroll={onScroll}>
                <BurgerItemsCategory 
                    title = 'Булки'
                    titleRef = {titleBunRef}
                    ingredients = {buns}
                />
                <BurgerItemsCategory 
                    title = 'Соусы'
                    titleRef = {titleSaucesRef}
                    ingredients = {sauces}
                />
                <BurgerItemsCategory 
                    title = 'Начинки'
                    titleRef = {titleMainRef}
                    ingredients = {mains}
                />
            </div>
        </section>
        </div>
    );
}

export default BurgerIngredients;