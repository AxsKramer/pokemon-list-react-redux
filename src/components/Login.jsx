import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userLoginAction} from '../redux/userDuckReduxer';
import {withRouter} from 'react-router-dom';

const Login = (props) => {

  const dispatch = useDispatch();

  // const loading = useSelector(store => store.user.loading);
  const active = useSelector(store => store.user.active);

  useEffect(() => {
    active && props.history.push('/');
  }, [active]);


  return ( 
    <div className="mt-5 text-center">
      <h3 className="text-center"> Ingrese con Google  </h3>
      <hr/>
      <button onClick={() => dispatch(userLoginAction())} className='btn btn-dark'>Acceder</button>
    </div>
  );
}
 
export default withRouter(Login);