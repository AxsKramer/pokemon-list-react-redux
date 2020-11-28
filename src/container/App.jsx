import React from 'react';
import {Provider} from 'react-redux';
import store from '../redux/store';
import Pokemones from '../components/Pokemones';

const App = () => {
  return ( 
    <Provider store={store}>
      <Pokemones />
    </Provider>
  );
}
 
export default App;
