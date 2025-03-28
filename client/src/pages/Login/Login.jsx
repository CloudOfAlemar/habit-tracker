

import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import {login} from "../../utils/api";
import {AuthContext} from "../../context/AuthContext";

import './Login.scss';

import eyeIcon from '../../assets/eye-icon.svg';

function Login() {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useContext(AuthContext);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isUsernameValidationErrorVisible, setIsUsernameValidationErrorVisible] = useState(false);
  const [isPasswordValidationErrorVisible, setIsPasswordValidationErrorVisible] = useState(false);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handlePasswordViewToggle = (event) => {
    event.preventDefault();
    setIsPasswordVisible(previousState => !previousState);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;
    
    try {
      const response = await login(username, password);
      const data = await response.json();
      if(data.message === "USER_NOT_FOUND") {
        setIsUsernameValidationErrorVisible(true);
        throw new Error("Username Not Found");
      } else if(data.message === "INCORRECT_PASSWORD") {
        setIsPasswordValidationErrorVisible(true);
        throw new Error("Incorrect Password");
      }
  
      setIsUsernameValidationErrorVisible(false);
      setIsPasswordValidationErrorVisible(false);

      localStorage.setItem("token", data.token);
      setIsAuthenticated(!!localStorage.getItem("token"));
      navigate("/create");
  
    } catch(error) {
      console.log( error );
    }
  }

  return (
    <main className="main">
      <section className="login">
        <div className="login__container">

          {/* Login Header */}
          <div className="login__header">
            <h1 className="login__heading">
              Log<span className="login__heading-alt-color">in</span>
            </h1>
          </div>

          <div className="login__body">

            {/* Login Form */}
            <form action="" className="login-form">

              {/* Username Control */}
              <div className="login-form__username-control">
                <label htmlFor="login-form__username-input" className="login-form__username-label">Username</label>
                <input type="text"
                  id="login-form__username-input"
                  className="login-form__username-input"
                  placeholder="alemar20!"
                  ref={usernameInputRef}
                />
                <p 
                  className={`login-form__username-validation-msg ${isUsernameValidationErrorVisible ? "login-form__username-validation-msg--show" : ""}`}
                >Username doesn't exist.</p>
              </div>

              {/* Password Control */}
              <div className="login-form__password-control">
                <label htmlFor="login-form__password-input" className="login-form__password-label">Password</label>
                <div className="login-form__password-input-wrapper">
                  <input type={isPasswordVisible ? "text" : "password"}
                    id="login-form__password-input"
                    className="login-form__password-input"
                    placeholder="********"
                    ref={passwordInputRef}
                  />
                  <button className="login-form__password-eye-btn" onClick={handlePasswordViewToggle}>
                    <img src={eyeIcon} alt="Eye icon." className="login-form__password-eye-icon" />
                  </button>
                </div>
                <p 
                  className={`login-form__password-validation-msg ${isPasswordValidationErrorVisible ? "login-form__password-validation-msg--show" : ""}`}
                >Incorrect password.</p>
              </div>

              {/* Form Button */}
              <button 
                className="login-form__btn"
                onClick={handleLogin}
              >Login</button>
            </form>

            {/* Sign Up Link */}
            <Link to="/signup" className="login__signup-link">Sign Up</Link>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Login;