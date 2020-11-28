import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {pokemonDetallesAccion} from '../redux/pokemonDuckReducer';

const Pokemon = () => {

  const dispatch = useDispatch();

  useEffect(()=> {
    const fetchData = () => dispatch(pokemonDetallesAccion())
    fetchData()
  }, [dispatch]);

  const pokemon = useSelector(store => store.pokemones.pokemon);


  return pokemon ? ( 
    <div className="card mt-4 text-center">
      <div className="card-body">
        <img src={pokemon.imagen} alt={pokemon.nombre} className='img-fluid'/>
        <div className="card-title text-uppercase">{pokemon.nombre}</div>
        <p className="card-text">Alto: {pokemon.alto} |  Ancho: {pokemon.ancho} </p>
      </div>
    </div>
  ) : null;
}
 
export default Pokemon;