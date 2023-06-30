import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { Modal } from '../modal/modal.jsx';
import { useState} from "react";
import {OrderDetails} from '../modal/order-details.jsx';
// import useEscapeKey from '../modal/use-esc';
// import useOutsideClick from '../modal/use-outside-click';

const ConstructorIngredient = () => (
    <div className={styles.element}>
        <DragIcon type="primary" />
        <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
        />
    </div>
);

function BurgerConstructor() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={styles.final}>
            <div className={styles.construct}>
                <div className={`${styles.element_bun} ml-8`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>
                <ConstructorIngredient></ConstructorIngredient>
                <div className={`${styles.element_bun} ml-8`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>
            </div>
            <section className={`${styles.result} mt-10`}>
                <div className={`${styles.cost} mr-10`}>
                    <div className={`${styles.numbers} text text_type_digits-default mr-1`}>
                    666</div>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={() => setShowModal(true)} >
                Оформить заказ
                </Button>
                {showModal && <Modal onClose = {() => setShowModal(false)}>
                    <OrderDetails  onClose={() => setShowModal(false)}>034536</OrderDetails>
                </Modal>}
            </section>
        </div>
    );
}

export default BurgerConstructor;