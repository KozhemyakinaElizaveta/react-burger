import AppHeader from '../header/header.jsx';
import styles from './app.module.css';
import RoutesContainer from '../routes-container/routes-container.jsx';



function App() {

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
