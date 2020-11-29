import {auth, firebase} from '../firebase';


//types
const LOADING = 'LOADING';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
//initial state

const initialState = {
  loading: false,
  active: false,
}

//reducers

export default function userReducer(state = initialState, action){
  switch(action.type){

    case LOADING:
      return {...state, loading: true}

    case USER_LOGIN_SUCCESS:
      return {...state, loading: false, active: true, user: action.payload}
    
    case USER_LOGIN_FAILURE:
      return {...initialState}

    case USER_LOGOUT:
      return {...initialState}

    default:
      return state;
  }
}


//actions

export const userLoginAction = () => async (dispatch) => {

  dispatch({
    type: LOADING
  });

  try{
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await auth.signInWithPopup(provider);
    // console.log(response)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        uid: response.user.uid,
        email: response.user.email,
        name: response.user.displayName
      }
    });

    localStorage.setItem('user', JSON.stringify({
      uid: response.user.uid,
      email: response.user.email,
      name: response.user.displayName
    }))
  }
  catch(error){
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAILURE
    })
  }
}

export const readUserActiveAction = () => (dispatch) => {
 //when browser load
  if(localStorage.getItem('user')){
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: JSON.parse(localStorage.getItem('user'))
    })
  }
}

export const logoutUserAction = () => (dispatch) => {
  auth.signOut();
  dispatch({
    type: USER_LOGOUT
  });
  localStorage.removeItem('user');

}
