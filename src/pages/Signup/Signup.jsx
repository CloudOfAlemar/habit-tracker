
import { Link } from 'react-router-dom';
import { useState } from 'react';

import './Signup.scss';
import eyeIcon from '../../assets/eye-icon.svg';

function Signup() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handlePasswordVisibilityToggle = (event) => {
    event.preventDefault();
    setIsPasswordVisible(previousState => !previousState);
  }

  const handleConfirmVisibilityToggle = (event) => {
    event.preventDefault();
    setIsConfirmVisible(previousState => !previousState);
  }

  // const handlePasswordVisibilityToggle = (event) => {
  //   event.preventDefault();
  //   const relatedInput = event.target.closest("div").querySelector("input");
  //   relatedInput.type = relatedInput.type === "password" ? "text" : "password";
  // }

  return(
    <main className="main">
      <section className="signup">
        <div className="signup__container">

          {/* Sign Up Header */}
          <div className="signup__header">
            <h1 className="signup__heading">
              Sign <span className="signup__heading-alt-color">Up</span>
            </h1>
          </div>

          <div className="signup__body">

            {/* Sign Up Form */}
            <form action="" className="signup-form">

              {/* Username Control */}
              <div className="signup-form__username-control">
                <label htmlFor="signup-form__username-input" className="signup-form__username-label">Username</label>
                <input type="text"
                  id="signup-form__username-input"
                  className="signup-form__username-input"
                  placeholder="alemar20!"
                />
                <p className="signup-form__username-minimum-msg">Must contain at least 3 characters.</p>
                <p className="signup-form__username-duplicate-msg">Username already taken.</p>
              </div>

              {/* Password Control */}
              <div className="signup-form__password-control">
                <label htmlFor="signup-form__password-input" className="signup-form__password-label">Password</label>
                <div className="signup-form__password-input-wrapper">
                  <input type={isPasswordVisible ? "text" : "password"}
                    id="signup-form__password-input"
                    className="signup-form__password-input"
                    placeholder="********"
                  />
                  <button className="signup-form__password-eye-btn" onClick={handlePasswordVisibilityToggle}>
                    <img src={eyeIcon} alt="Eye icon." className="signup-form__password-eye-icon" />
                  </button>
                </div>
                <p className="signup-form__password-pattern-msg">
                  Must include at least 8 characters, a number and a special character.
                </p>
              </div>

              {/* Confirm Control */}
              <div className="signup-form__confirm-control">
                <label htmlFor="signup-form__confirm-input" className="signup-form__confirm-label">Confirm</label>
                <div className="signup-form__confirm-input-wrapper">
                  <input type={isConfirmVisible ? "text" : "password"}
                    id="signup-form__confirm-input"
                    className="signup-form__confirm-input"
                    placeholder="********"
                  />
                  <button className="signup-form__confirm-eye-btn" onClick={handleConfirmVisibilityToggle}>
                    <img src={eyeIcon} alt="Eye icon." className="signup-form__confirm-eye-icon" />
                  </button>
                </div>
                <p className="signup-form__confirm-match-msg">
                  Does Not match password.
                </p>
              </div>

              {/* Form Button */}
              <button className="signup-form__btn">Sign Up</button>

            </form>

            {/* Login Link */}
            <Link to="/login" className="signup__login-link">Login</Link>

          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;