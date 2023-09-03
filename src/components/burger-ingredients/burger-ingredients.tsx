import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BurgerItemsCategory from './burger-ingredients-category';
import { useInView } from "react-intersection-observer";
import { useNavigate, useLocation } from 'react-router-dom';
import {
    selectIngredient,
} from "../../services/actions/ingredient-details-action";
import { TIngredient } from '../../utils/types';
import { useAppSelector } from '../../utils/hooks';
import { getBurgerIngredients } from '../../services/store';


function BurgerIngredients() {
    const { ingredients } = useAppSelector(getBurgerIngredients);
    const [current, setCurrent] = useState('bun')

    const navigate = useNavigate()
    const location = useLocation()

    const bunRef = useRef<HTMLInputElement>(null);
    const mainRef = useRef<HTMLInputElement>(null);
    const sauceRef = useRef<HTMLInputElement>(null);
    const tabRef = useRef<HTMLInputElement>(null)

    const parentRect = useRef<DOMRect | undefined | null>(null);
    useEffect(() => {
        parentRect.current = tabRef.current?.getBoundingClientRect()
    }, [])

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

    const [refBuns, inViewBuns] = useInView({ threshold: 0.05 });
    const [refSauces, inViewSauces] = useInView({ threshold: 0.05 });
    const [refMains, inViewMains] = useInView({ threshold: 0.05 });

    const handleTabClick = (current: string) => {
        switch (current) {
            case 'bun':
                bunRef.current?.scrollIntoView({ behavior: 'smooth' })
                break;
            case 'sauce':
                sauceRef.current?.scrollIntoView({ behavior: 'smooth' })
                break;
            case 'main':
                mainRef.current?.scrollIntoView({ behavior: 'smooth' })
                break;
            default:
                break;
        }
        setCurrent(current)
    }

    const handleScroll = () => {
        const bunDist = Math.abs((bunRef.current?.getBoundingClientRect().top || 0) - (parentRect.current?.bottom || 0));
        const sauceDist = Math.abs((sauceRef.current?.getBoundingClientRect().top || 0) - (parentRect.current?.bottom || 0));
        const mainDist = Math.abs((mainRef.current?.getBoundingClientRect().top || 0) - (parentRect.current?.bottom || 0));
        const minDist = Math.min(bunDist, sauceDist, mainDist)
        if (minDist === bunDist) {
            setCurrent('bun')
        }
        else if (minDist === sauceDist) {
            setCurrent('sauce')
        }
        else {
            setCurrent('main')
        }
    }


    const activeTab = () => {
        if (inViewBuns) {
            return 1
        } else if (inViewSauces) {
            return 2
        } else if (inViewMains) {
            return 3
        }
    };

    const openIngredientModal = (ingredient: TIngredient) => {
        navigate(`/ingredients/${ingredient._id}`, { state: { background: location } })
        // dispatch(selectIngredient(ingredient));
    }

    return (
        <div className={styles.container}>
        <div className={styles.tab} ref={tabRef}>
            <Tab value="bun" active={activeTab() === 1} onClick={handleTabClick}>
            Булки
            </Tab>
            <Tab value="sauce" active={activeTab() === 2} onClick={handleTabClick}>
            Соусы
            </Tab>
            <Tab value="main" active={activeTab() === 3} onClick={handleTabClick}>
            Начинки
            </Tab>
        </div>
        <section className={styles.scroll} onScroll={handleScroll}>
            <div className={styles.items_category}>
                <BurgerItemsCategory 
                    title = 'Булки'
                    ingredients = {buns}
                    onClick = {openIngredientModal}
                    tabRef = {refBuns}
                    ref={bunRef}
                />
                <BurgerItemsCategory 
                    title = 'Соусы'
                    ingredients = {sauces}
                    onClick = {openIngredientModal}
                    tabRef = {refSauces}
                    ref={sauceRef}
                />
                <BurgerItemsCategory 
                    title = 'Начинки'
                    ingredients = {mains}
                    onClick = {openIngredientModal}
                    tabRef = {refMains}
                    ref={mainRef}
                />
            </div>
        </section>
        </div>
    );
}

export default BurgerIngredients;