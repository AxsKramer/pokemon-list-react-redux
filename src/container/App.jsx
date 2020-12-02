import React, {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from '../components/Navbar';
import Pokemones from '../components/Pokemones';
import Login from '../components/Login';
import Perfil from '../components/Perfil';
import {auth } from '../firebase';

const App = () => {

  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(()=> {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => user ? setFirebaseUser(user) : setFirebaseUser(null));
    }
    fetchUser();
  }, []);

  const PrivateRoute = ({component, path, ...rest}) => {
    if(localStorage.getItem('user')){
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if(userStorage.uid === firebaseUser.uid){
        return <Route component={component} path={path} {...rest} />
      }
      else{
        return <Redirect to='/login' {...rest} />
      }
    }else{
      return <Redirect to='/login' {...rest} />
    }
  }

  return firebaseUser !== false ? ( 
    <BrowserRouter>
      <div className="container mt-3">
        <Navbar />
        <Switch>
          <PrivateRoute exact path='/' component={Pokemones} />
          <PrivateRoute exact path='/perfil' component={Perfil} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  ) : <div>Cargando...</div>
}
 
export default App;
