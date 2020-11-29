import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {useDispatch, useSelector}  from 'react-redux';
import {logoutUserAction} from '../redux/userDuckReduxer';

const Navbar = (props) => {

  const dispatch = useDispatch();

  const active = useSelector(store => store.user.active);

  const logout = () => {
    dispatch(logoutUserAction());
    props.history.push('/login');
  }

  return (
    <div className="navbar navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">POKEMON APP</Link>
      <div>
        <div className="d-flex">
          {
            active ? (
              <>
                <NavLink to="/" exact className="btn btn-dark mr-2" > Home </NavLink>
                <button onClick={() => logout() } className="btn btn-dark">Logout</button>

              </>
            )
            : <NavLink to="/login" exact className="btn btn-dark" > Login </NavLink>
          
          }
        </div>
      </div>
    </div>
  )
}
 
export default withRouter(Navbar);