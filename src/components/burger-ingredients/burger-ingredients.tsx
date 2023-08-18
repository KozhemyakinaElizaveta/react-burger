import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BurgerItemsCategory from './burger-ingredients-category';
import { useInView } from "react-intersection-observer";
import { useNavigate, useLocation } from 'react-router-dom';
import {
    selectIngredient,
} from "../../services/actions/ingredient-details-action";
import { TIngredient } from '../../utils/types';


function BurgerIngredients() {
    //@ts-ignore
    const { ingredients } = useSelector((state) => state.burgerIngredients);

    const navigate = useNavigate()
    const location = useLocation()

    const titleBunRef = useRef<HTMLInputElement>();
    const titleMainRef = useRef<HTMLInputElement>();
    const titleSaucesRef = useRef<HTMLInputElement>();

    const buns = useMemo(
        () => ingredients.filter((item: TIngredient) => item.type === "bun"),
        [ingredients]
    );

    const mains = useMemo(
        () => ingredients.filter((item: TIngredient) => item.type === "main"),
        [ingredients]
    );

    const sauces = useMemo(
        () => ingredients.filter((item: TIngredient) => item.type === "sauce"),
        [ingredients]
    );

    const GetRefFor = (ref1: any, ref2: any) =>(
        useRef({ ref1, ref2 })
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

    const handleButtonClick = (ref: any) =>
    ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
    });

    const openIngredientModal = (ingredient: TIngredient) => {
        navigate(`/ingredients/${ingredient._id}`, { state: { background: location } })
        // dispatch(selectIngredient(ingredient));
    }

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
                    onClick = {openIngredientModal}
                    //@ts-ignore
                    ref={GetRefFor(refBuns, titleBunRef)}
                />
                <BurgerItemsCategory 
                    title = 'Соусы'
                    ingredients = {sauces}
                    onClick = {openIngredientModal}
                    //@ts-ignore
                    ref={GetRefFor(refSauces, titleSaucesRef)}
                />
                <BurgerItemsCategory 
                    title = 'Начинки'
                    ingredients = {mains}
                    onClick = {openIngredientModal}
                    //@ts-ignore
                    ref={GetRefFor(refMains, titleMainRef)}
                />
            </div>
        </section>
        </div>
    );
}

export default BurgerIngredients;