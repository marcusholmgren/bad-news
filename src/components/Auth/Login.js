import React, { useState} from "react";
import useFormValidation from './useFormValidation';

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {
  const { handleSubmit, handleChange, values} = useFormValidation(INITIAL_STATE);
  const [login, setLogin] = useState(true);

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
             onChange={handleChange} />
      <input type="password"
             name="password"
             value={values.password}
             placeholder="Choose a secure password"
             onChange={handleChange}/>
      <div className="flex mt3">
        <button type="submit" className="button pointer mr2">
          Submit
        </button>
        <button type="button" className="pointer button"
                onClick={() => setLogin(prevLogin => !prevLogin)}
        >
          {login ? "need to create an account?": "already have an account?"}
        </button>
      </div>
    </form>
  </div>;
}

export default Login;
