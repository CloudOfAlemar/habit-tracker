

import { Link } from 'react-router-dom';
import { useState } from 'react';

import './Login.scss';

import eyeIcon from '../../assets/eye-icon.svg';

function Login() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordViewToggle = (event) => {
    event.preventDefault();
    setIsPasswordVisible(previousState => !previousState);
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
                />
                <p className="login-form__username-validation-msg">Username doesn't exist.</p>
              </div>

              {/* Password Control */}
              <div className="login-form__password-control">
                <label htmlFor="login-form__password-input" className="login-form__password-label">Password</label>
                <div className="login-form__password-input-wrapper">
                  <input type={isPasswordVisible ? "text" : "password"}
                    id="login-form__password-input"
                    className="login-form__password-input"
                    placeholder="********"
                  />
                  <button className="login-form__password-eye-btn" onClick={handlePasswordViewToggle}>
                    <img src={eyeIcon} alt="Eye icon." className="login-form__password-eye-icon" />
                  </button>
                </div>
                <p className="login-form__password-validation-msg">Incorrect password.</p>
              </div>

              {/* Form Button */}
              <button className="login-form__btn">Login</button>
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