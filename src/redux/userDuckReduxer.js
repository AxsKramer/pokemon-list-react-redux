import {auth, firebase, db, storage} from '../firebase';


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
    //Google conection
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await auth.signInWithPopup(provider);
    // console.log(response)

    const user = {
      uid: response.user.uid,
      email: response.user.email,
      displayName: response.user.displayName,
      photoURL: response.user.photoURL
    }

    const userdb = await db.collection('users').doc(user.email).get()

    if(userdb.exists){
      //when the user exist en firestore
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userdb.data()
      });
  
      localStorage.setItem('user', JSON.stringify(userdb.data()));
    }
    //when the user does not exist
    else{
      await db.collection('users').doc(user.email).set(user);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user
      });
  
      localStorage.setItem('user', JSON.stringify(user));
    }
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

export const updateUserNameAction = (updatedName) =>  async (dispatch, getState) => {
  
  dispatch({
    type: LOADING
  });

  const {user} = getState().user;

  try{
    await db.collection('users').doc(user.email).update({
      displayName: updatedName
    });
    
    const userUpdated = {
      ...user,
      displayName: updatedName
    };

    dispatch({
      type:  USER_LOGIN_SUCCESS,
      payload: userUpdated
    });

    localStorage.setItem('user', JSON.stringify(user));
  }
  catch{
    console.log(error);
  }
}

export const editImageProfile = (imageEdited) => async (dispatch, getState) => {
  dispatch({ type: LOADING });

  const {user} = getState().user;

  try{
    const imageRef = await storage.ref().child(user.email).child('photo profile');
    await imageRef.put(imageEdited);
    const imageURL = await imageRef.getDownloadURL();
    await db.collection('users').doc(user.email).update({photoURL: imageURL});

    const userImageUpdated = {
      ...user,
      photoURL: imageURL
    };

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userImageUpdated
    });

    localStorage.setItem('user', JSON.stringify(userImageUpdated));


  }catch(error){
    console.log(error)
  }
}