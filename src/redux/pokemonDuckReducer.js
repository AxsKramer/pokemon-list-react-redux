import axios from 'axios';

//types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const OBTENER_POKEMONES_SIGUIENTES = 'OBTENER_POKEMONES_SIGUIENTES';
const OBTENER_POKEMONES_ANTERIORES = 'OBTENER_POKEMONES_ANTERIORES';
const OBTENER_DETALLES_POKEMON = 'OBTENER_DETALLES_POKEMON';

//estado
const dataInicial = {
  count: 0,
  next: null,
  previous: null,
  results: []
}


//reducers
export default function pokeReducer(state = dataInicial, action){
  switch(action.type){
    case OBTENER_POKEMONES_EXITO:
    return {
      ...state,
      ...action.payload
    }
    case OBTENER_POKEMONES_SIGUIENTES:
      return {
        ...state,
        ...action.payload
      }
    case OBTENER_POKEMONES_ANTERIORES:
      return {
        ...state,
        ...action.payload
      }
    case OBTENER_DETALLES_POKEMON:
      return {
        ...state,
        pokemon : action.payload
      }
    default:
      return state
  }
}


//acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

  if(localStorage.getItem('offset=0')){
    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem('offset=0'))
    });
    return;
  }

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10');
     dispatch({
       type: OBTENER_POKEMONES_EXITO,
       payload: response.data
     });

     localStorage.setItem('offset=0', JSON.stringify(response.data));

  } catch (error) {
    console.log(error);
  }
}

export const siguientesPokemonesAccion = () => async (dispatch, getState) => {

  // const {offset} = getState().pokemones;
  // let siguiente = offset + 20;

  const nextURL = getState().pokemones.next

  if(localStorage.getItem(nextURL)){
    dispatch({
      type: OBTENER_POKEMONES_SIGUIENTES,
      payload: JSON.parse(localStorage.getItem(nextURL))
     });
     return
  }

  try {
    const response = await axios.get(nextURL);
     dispatch({
      type: OBTENER_POKEMONES_SIGUIENTES,
      payload: response.data
     });

     localStorage.setItem(nextURL, JSON.stringify(response.data));

  } catch (error) {
    console.log(error);
  }
}

export const anterioresPokemonesAccion = () => async (dispatch, getState) => {

  const {previous} = getState().pokemones;

  if(localStorage.getItem(previous)){
    dispatch({
      type: OBTENER_POKEMONES_ANTERIORES,
      payload: JSON.parse(localStorage.getItem(previous))
    });
     return
  }

  try{
    const response = await axios.get(previous);
    dispatch({
      type: OBTENER_POKEMONES_ANTERIORES,
      payload: response.data
    });
    
    localStorage.setItem(previous, JSON.stringify(response.data));

  }catch(error){
    console.log(error)
  }
}

export const pokemonDetallesAccion = (url ='https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch) => {

  if(localStorage.getItem(url)){
    dispatch({
      type: OBTENER_DETALLES_POKEMON,
      payload: JSON.parse(localStorage.getItem(url))
    });
    return;
  }

  try{
    const response = await axios.get(url);
    dispatch({
      type: OBTENER_DETALLES_POKEMON,
      payload: {
        nombre: response.data.name,
        ancho: response.data.weight,
        alto: response.data.height,
        imagen: response.data.sprites.front_default
      }
    });

    localStorage.setItem(url, JSON.stringify({
      nombre: response.data.name,
      ancho: response.data.weight,
      alto: response.data.height,
      imagen: response.data.sprites.front_default
    }));

  }catch{
    console.log(error)
  }
}