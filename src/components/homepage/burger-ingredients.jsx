import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

const ingredientsPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
});

const ChooseIngredients = (props) => {
    return (
        <div className={styles.tab}>
            <Tab value="bun" active={props.currentTab === 'bun'} onClick={props.onClick}>
            Булки
            </Tab>
            <Tab value="sauce" active={props.currentTab === 'sauce'} onClick={props.onClick}>
            Соусы
            </Tab>
            <Tab value="main" active={props.currentTab === 'main'} onClick={props.onClick}>
            Начинки
            </Tab>
        </div>
    )
}

const BurgerItemsCategory = (props) => {
    return (
        <div className={styles.items_content}>
            <h2 ref={props.titleRef} className={`${styles.title} text text_type_main-medium mt-10`}>{props.title}</h2>
            <div className={styles.items}>
                <BurgerItems items = {props.ingredients}/>
            </div>
        </div>
    );
};

const GetItems = ({ingredient}) => {
    return (
        <div className={`${styles.pick} mt-6 mb-2 mr-4 ml-4`} >
            <img className={styles.image} src={ingredient.image_large} alt="" />
            <div className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
                {ingredient.price}
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
        </div>
    );
};

const BurgerItems = (props) => (props.items.map(ingredient => (
    <GetItems key={ingredient._id} ingredient={ingredient}/>
)));

GetItems.propTypes = {
    ingredient: ingredientsPropTypes.isRequired
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired
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
        <ChooseIngredients onClick={onTabClick} currentTab={currentTab} />
        <section className={styles.scroll} >
            <div className={styles.items_category}>
                <BurgerItemsCategory 
                    title = 'Булки'
                    titleRef = {titleBunRef}
                    ingredients = {buns}
                />
                <BurgerItemsCategory 
                    title = 'Соусы'
                    titleRef = {titleBunRef}
                    ingredients = {mains}
                />
                <BurgerItemsCategory 
                    title = 'Начинки'
                    titleRef = {titleBunRef}
                    ingredients = {sauces}
                />
            </div>
        </section>
        </div>
    );
}

export default BurgerIngredients;