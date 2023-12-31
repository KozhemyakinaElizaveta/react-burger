import AppHeader from '../header/header';
import styles from './app.module.css';
import RoutesContainer from '../routes-container/routes-container';
import { getIngredients } from "../../services/actions/ingredients-action";
import { useEffect } from "react";
import { getItem } from '../../utils/local-storage';
import { getUserThunk } from '../../services/auth-thunk/auth-thunk';
import { useAppDispatch } from '../../utils/hooks';

function App() {

  const dispatch = useAppDispatch();
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
