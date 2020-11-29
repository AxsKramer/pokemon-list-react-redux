import React from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import {obtenerPokemonesAccion, siguientesPokemonesAccion, anterioresPokemonesAccion, pokemonDetallesAccion} from '../redux/pokemonDuckReducer';
import Pokemon from './Pokemon';

const Pokemones = () => {

  const dispatch = useDispatch();

  const pokemones = useSelector(store => store.pokemones.results );
  const next = useSelector(store => store.pokemones.next);
  const previous = useSelector(store => store.pokemones.previous);

  return (
    <div className='row'>
      <div className="col-md-6">
        <h3>Lista de Pokemones</h3>
        <ul className='list-group mt-4'>
          {
            pokemones.map(item => (
              <li key={item.name} className='list-group-item text-capitalize'>
                {item.name}
                <button 
                  className='btn btn-dark btn-sm float-right'
                  onClick={() => dispatch(pokemonDetallesAccion(item.url))}
                >Info</button>
              </li>
            ))
          }
        </ul>
        <div className='flex justify-content-between'>
        {
          pokemones.length === 0 &&
          <button 
            onClick={() => dispatch(obtenerPokemonesAccion())}
            className='btn btn-dark'
          >Obtener</button>
        }
        {
          previous &&
          <button 
            onClick={() => dispatch(anterioresPokemonesAccion())}
            className='btn btn-dark mr-3'
          >Anteriores</button>
        }
        {
          next &&
          <button 
            onClick={() => dispatch(siguientesPokemonesAccion())}
            className='btn btn-dark float-right'  
          >Siguientes</button>
        }
        </div>
      </div>
      <div className="col-md-6">
        <h3>Detalles del Pokemon</h3>
        <Pokemon />
      </div>
    </div>
  )
}

export default Pokemones;
