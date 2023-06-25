import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

const GetConstructor = (props) => {
    return (
        <div className={styles.construct}>
            <div className={styles.element}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={props.children}
                />
            </div>
            <div className={styles.element}>
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={props.children}
                />
            </div>
            <div className={styles.element}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={props.children}
                />
            </div>
        </div>
    )
}

function BurgerConstructor() {
    return (
        <div className={styles.final}>
            <GetConstructor>
                <CurrencyIcon type="primary" />
            </GetConstructor>
            <section className={`${styles.result} mt-10`}>
                <div className={`${styles.cost} mr-10`}>
                    <div className={`${styles.numbers} text text_type_digits-default mr-1`}>
                    666</div>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium">
                Оформить заказ
                </Button>
            </section>
        </div>
    );
}

export default BurgerConstructor;