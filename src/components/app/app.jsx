import AppHeader from '../header/header.jsx';
import styles from './app.module.css';
import RoutesContainer from '../routes-container/routes-container.jsx';
import { getIngredients } from "../../services/actions/ingredients-action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getItem } from '../../utils/local-storage';
import { getUserThunk } from '../../services/auth-thunk/auth-thunk';

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
        if (getItem('burgerAccessToken'))
          dispatch(getUserThunk())
    }, [dispatch]);

  return (
    <div className={styles.app}> 
      <>
        <AppHeader />
        <RoutesContainer />
      </>
    </div>
  );
}

export default App;
