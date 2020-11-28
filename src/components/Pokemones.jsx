import React from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import {obtenerPokemonesAccion, siguientesPokemonesAccion, anterioresPokemonesAccion} from '../redux/pokemonDuckReducer';

const Pokemones = () => {

  const dispatch = useDispatch();

  const pokemones = useSelector(store => store.pokemones.results );
  const next = useSelector(store => store.pokemones.next);
  const previous = useSelector(store => store.pokemones.previous);

  return (
    <div>
      lista de pokemones
      <br/>
      {
        pokemones.length === 0 &&
        <button onClick={() => dispatch(obtenerPokemonesAccion())}>Obtener</button>
      }
      {
        previous &&
        <button onClick={() => dispatch(anterioresPokemonesAccion())}>Anteriores</button>
      }
      {
        next &&
        <button onClick={() => dispatch(siguientesPokemonesAccion())}>Siguientes</button>
      }
      <ul>
        {
          pokemones.map(item => (
            <li key={item.name}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Pokemones;
