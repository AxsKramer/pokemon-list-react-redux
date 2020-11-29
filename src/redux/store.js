import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import pokeReducer from './pokemonDuckReducer';
import userReducer, {readUserActiveAction} from './userDuckReduxer';


const rootReducer = combineReducers({
  pokemones : pokeReducer,
  user : userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
  const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
  //Cuando el navegador se carga
  readUserActiveAction()(store.dispatch);
  return store;
}

