import React from 'react';
import {Provider} from 'react-redux';
import store from '../redux/store';
import Pokemones from '../components/Pokemones';

const App = () => {
  return ( 
    <Provider store={store}>
      <div className="container mt-3">
        <Pokemones />

      </div>
    </Provider>
  );
}
 
export default App;
