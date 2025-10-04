import React, { useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { FirebaseError } from "firebase/app";
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import firebase from '../../firebase';

interface LoginState {
  name: string;
  email: string;
  password: string;
}

const INITIAL_STATE: LoginState = {
  name: "",
  email: "",
  password: ""
}

const Login: React.FC = () => {
  const { handleSubmit, handleBlur, handleChange,
    values, errors, isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function authenticateUser() {
    const { name, email, password} = values;
    try {
      if (login) {
        await firebase.login(email, password);
      } else {
        await firebase.register(name, email, password);
      }
      navigate('/');
    } catch(err) {
      const firebaseError = err as FirebaseError;
      console.error("[Login] Authentication error", firebaseError);
      setFirebaseError(firebaseError.message);
    }
  }

  return <div>
    <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
    <form onSubmit={handleSubmit} className="flex flex-column">
      {!login && <input
          type="text"
          name="name"
          value={values.name}
          placeholder="Your name"
          autoComplete="off"
          onChange={handleChange} />
      }
      <input type="email"
             name="email"
             value={values.email}
             placeholder="Your email"
             autoComplete="off"
             className={errors.email && "error-input"}
             onChange={handleChange}
             onBlur={handleBlur}
      />
      {errors.email && <p className="error-text">{errors.email}</p>}
      <input type="password"
             name="password"
             value={values.password}
             placeholder="Choose a secure password"
             className={errors.password && "error-input"}
             onChange={handleChange}
             onBlur={handleBlur}
      />
      {errors.password && <p className="error-text">{errors.password}</p>}
      {firebaseError && <p className="error-text">{firebaseError}</p>}
      <div className="flex mt3">
        <button type="submit"
                className="button pointer mr2"
                disabled={isSubmitting}
                style={{ background: isSubmitting ? 'grey' : 'orange'}}
        >
          Submit
        </button>
        <button type="button" className="pointer button"
                onClick={() => setLogin(prevLogin => !prevLogin)}
        >
          {login ? "need to create an account?": "already have an account?"}
        </button>
      </div>
    </form>
    <div className="forgot-password">
      <Link to="/forgot">Forgot password?</Link>
    </div>
  </div>;
}

export default Login;
