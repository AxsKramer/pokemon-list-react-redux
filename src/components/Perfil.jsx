import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateUserNameAction, editImageProfile} from '../redux/userDuckReduxer';

const Perfil = () => {

  const user = useSelector(store => store.user.user);
  const loading = useSelector(store => store.user.loading);

  const dispatch = useDispatch();

  const [userName, setUserName] = useState(user.displayName);
  const [activeForm, setActiveForm] = useState(false);
  const [error, setError] = useState(false);


  const updateUserName = () => {
    if(!userName.trim()){
      console.log('The field is Empty!');
      return;
    }
    dispatch(updateUserNameAction(userName));
    setActiveForm(false);
  }

  const selectFile = event => {
    const imageFromUser = event.target.files[0];
    console.log(imageFromUser);

    if(imageFromUser === undefined){
      console.log('No image selected');
      return;
    }

    if(imageFromUser.type === 'image/png' || imageFromUser.type === 'image/jpg' || imageFromUser.type === 'image/jpeg'){
      dispatch(editImageProfile(imageFromUser));
      setError(false);
    }
    else{
      setError(true);
    }
  }

  return ( 
    <div className="mt-5 text-center">
      <div className="card">
        <div className="card-body">
          <img src={user.photoURL} width="150" className="img-fluid rounded-circle" />
          <h5 className="card-title mt-3">Nombre: {user.displayName}</h5>
          <p className="card-text">Email: {user.email}</p>
          <button 
            className='btn btn-dark' 
            onClick={() => setActiveForm(true)}
          >
            Editar Nombre
          </button>
          {
            error && 
              <div className="alert alert-warning mt-3">
                Only .png or .jpg files
              </div>
          }
          <div className="custom-file">
            <input 
              type="file"
              className='custom-file-input'
              id='inputGroupFile01'  
              style={{display:'none'}}
              onChange={e => selectFile(e)}
              disabled={loading}
            />
            <label 
              htmlFor="inputGroupFile01" 
              className={loading ? 'btn btn-dark mt-2 disabled': 'btn btn-dark mt-2' }>Update Image</label>
          </div>
        </div>
        {
          loading && 
          <div className="card-body">
            <div className="d-flex justify-content-center my-2">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        }
        {
          activeForm && 
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="input-group mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    aria-label="Recipient's username" 
                    value={userName}  
                    onChange={ e => setUserName(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button 
                      className="btn btn-dark" 
                      type="button" 
                      onClick={() => updateUserName()}
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
 
export default Perfil;