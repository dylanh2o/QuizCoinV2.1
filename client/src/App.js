
import React, {useEffect} from 'react';
import {Provider as StoreProvider, useDispatch, useSelector} from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import {AnimatePresence} from 'framer-motion';
import store from './store';
import AppLayout from './components/AppLayout';
import LoginRegister from './components/LoginRegister';
import {authenticateUser} from './store/appSlice';
import Loading from './components/Loading';



const App = () => {
    const dispatch = useDispatch();

    const {loading, user} = useSelector(state => state.app);

    useEffect(() => {
      dispatch(authenticateUser());
    }, []);


  return (

    <AnimatePresence initial={false}>
      {loading ? (
        <Loading active={true}/>
      ) : (
        <>
          {user === null ? (
            <LoginRegister/>
          ) : (
            <AppLayout/>
          )}
        </>
      )}
    </AnimatePresence>

  );
};
const AppContainer = () => (
<Router>
  <StoreProvider store={store}>
      <App/>
  </StoreProvider>
</Router>
);
export default AppContainer;
