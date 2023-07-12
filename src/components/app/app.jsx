import AppHeader from '../header/header.jsx';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { getIngredients } from "../../services/actions/ingredients-action";
import Modal from '../modal/modal.jsx';
import {
  CLOSE_MODAL_INGREDIENT,
  NO_INGREDIENT,
} from "../../services/actions/ingredient-details-action";
import { CLOSE_ORDER_DETAILS_MODAL } from "../../services/actions/order-details-action";
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { OrderDetails } from "../order-details/order-details";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const ingredientDetailsModal = useSelector(
    (state) => state.ingredientDetails.openModal
  );

  const orderDetailsModal = useSelector(
    (state) => state.orderDetails.openModal
  );

  const REQUEST = useSelector(
    (state) => state.orderDetails.makeOrderRequestInProgress
  );

  function closeIngredientDetailsModal() {
    dispatch({ type: CLOSE_MODAL_INGREDIENT });
    dispatch({ type: NO_INGREDIENT });
  }

  function closeOrderDetailsModal() {
    dispatch({ type: CLOSE_ORDER_DETAILS_MODAL });
  }

  return (
    <div className={styles.app}> 
      <>
        <AppHeader/>
        {REQUEST && <div className={styles.note}>Загрузка...</div>}
        <main className={`${styles.main} pr-5 pl-5`}>
        <DndProvider backend={HTML5Backend}>
          <div className={`${styles.choosing} mr-5`}>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
            <BurgerIngredients/>
          </div>
          <div className={`${styles.structure} ml-5 mt-25`}>
          <BurgerConstructor/>
          </div>
        </DndProvider>
        </main>
        {ingredientDetailsModal && <Modal onClose={closeIngredientDetailsModal} title = 'Детали ингредиента'>
          <IngredientDetails />
        </Modal>}
        {orderDetailsModal && <Modal onClose={closeOrderDetailsModal}>
          <OrderDetails />
        </Modal>}
      </>
    </div>
  );
}

export default App;
