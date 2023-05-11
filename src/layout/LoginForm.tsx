import Field from '../components/Home/Field';
import React, { useState } from 'react';
import FormData from 'form-data';
import Link from 'next/link';
import { LoginData } from '../types/login';
import { loginUser } from '../queries/users/users.queries';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { setUserData , setLoginData } from '../redux/userSlice';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import {config} from "../queries/config.queries"
import { LoadRemove, LoadStart } from '../components/Loading';

function LoginForm( {setLoginData}) {
  const initialValues: LoginData = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState<LoginData>(initialValues);
  const data = new FormData();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 


  const loginUser = async (data: any) => {
  try {
    const url = `http://localhost:8080/login`;

    const body = data;

    const res = await axios.post(url, body, config);
    setLoginData(res.data)
  } catch (error) {
    console.log(error);
  }
};

  const handleLogin = () => {
    resetForm();
    data.append('email', formData.email);
    data.append('password', formData.password);
    LoadStart()
    /* 
      TODO: 
      1. Check login
      */
    loginUser(data)
      .then(() => {
      LoadRemove()  
       router.push("/chat").then(() => window.scrollTo(0, 0));
    }).catch((e)=> console.log(e))

    
    /*
      2. Handle errors (if there is at least one) 
    */
  };

  const resetForm = () => {
    data.delete('email');
   data.delete('password');
  };

  return (
    <div
      id="login"
      className="right-side d-flex flex-column justify-content-center w-50 bg-chatter-green h-100 py-5 fs-1 fw-bold"
    >
      <Field
        title="E-MAIL"
        type="email"
        name="email"
        placeholder="Ingresa tu correo electrónico"
        onChange={handleInputChange}
      />

      <Field
        title="CONTRASEÑA"
        type="password"
        name="password"
        placeholder="Ingresa tu contraseña"
        onChange={handleInputChange}
      />

      <div className="content d-flex flex-column mb-5 d-flex align-items-start" data-aos="fade">
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>
          Ingresar
        </button>
      </div>

      <div className="content text d-flex flex-row gap-2 mb-5 fs-6 fst-italic" data-aos="fade">
        <span>No tienes una cuenta?</span>
        <Link href="/register" className="text-chatter-blue">
          Registrate aquí
        </Link>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  setUserData: PropTypes.func.isRequired,
  setLoginData: PropTypes.func.isRequired,
};

const mapStateToProps = (dispatch: any) => ({
  setUserData: (state: any) => dispatch(setUserData(state)),
  setLoginData: (state: any) => dispatch(setLoginData(state))
})

export default connect(null, mapStateToProps)(LoginForm);
