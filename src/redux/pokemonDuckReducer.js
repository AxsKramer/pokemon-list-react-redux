import axios from 'axios';

//types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const OBTENER_POKEMONES_SIGUIENTES = 'OBTENER_POKEMONES_SIGUIENTES';
const OBTENER_POKEMONES_ANTERIORES = 'OBTENER_POKEMONES_ANTERIORES';

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
    default:
      return state
  }
}


//acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
     dispatch({
       type: OBTENER_POKEMONES_EXITO,
       payload: response.data
     })
  } catch (error) {
    console.log(error);
  }
}

export const siguientesPokemonesAccion = () => async (dispatch, getState) => {

  // const {offset} = getState().pokemones;
  // let siguiente = offset + 20;

  const nextURL = getState().pokemones.next

  try {
    const response = await axios.get(nextURL);
     dispatch({
      type: OBTENER_POKEMONES_SIGUIENTES,
      payload: response.data
     })
  } catch (error) {
    console.log(error);
  }
}

export const anterioresPokemonesAccion = () => async (dispatch, getState) => {

  const {previous} = getState().pokemones;
  try{
    const response = await axios.get(previous);
    dispatch({
      type: OBTENER_POKEMONES_ANTERIORES,
      payload: response.data
    })

  }catch(error){
    console.log(error)
  }
}