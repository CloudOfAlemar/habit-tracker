
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  createUser
} from "../../utils/api";

import './Signup.scss';
import eyeIcon from '../../assets/eye-icon.svg';

function Signup() {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useContext(AuthContext);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isUsernameMinimumErrorVisible, setIsUsernameMinimumErrorVisible] = useState(false);
  const [isUsernameDuplicateErrorVisible, setIsUsernameDuplicateErrorVisible] = useState(false);
  const [isPasswordPatternErrorVisible, setIsPasswordPatternErrorVisible] = useState(false);
  const [isConfirmPasswordMatchErrorVisible, setIsConfirmPasswordMatchErrorVisible] = useState(false);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const handlePasswordVisibilityToggle = (event) => {
    event.preventDefault();
    setIsPasswordVisible(previousState => !previousState);
  }

  const handleConfirmVisibilityToggle = (event) => {
    event.preventDefault();
    setIsConfirmVisible(previousState => !previousState);
  }

  const handleCreateUser = async (event) => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;
    const passwordRegex = /^(?=.*\d)(?=.*[`~!@#$%^&*()_\-+={}\[\]|\\:;"'<,>.?/]).{8,}$/;

    // Check conditions for input error messages
    if(username.length < 3) {
      setIsUsernameMinimumErrorVisible(true);
      return;
    } else { setIsUsernameMinimumErrorVisible(false); }

    if(!password.match(passwordRegex)) {
      setIsPasswordPatternErrorVisible(true);
      return;
    } else { setIsPasswordPatternErrorVisible(false); }

    if(passwordInputRef.current.value !== confirmPasswordInputRef.current.value) {
      setIsConfirmPasswordMatchErrorVisible(true);
      return;
    } else { setIsConfirmPasswordMatchErrorVisible(false); }

    // Create a user
    try {
      const response = await createUser(username, password);
      const data = await response.json();
      if(!response.ok && (data.error.code === 11000) ) {
        setIsUsernameDuplicateErrorVisible(true);
        throw new Error("Username already exists.");
      } else if(!response.ok) {
        throw new Error("User could not be created");
      }

      // Hide all input error messages
      setIsUsernameMinimumErrorVisible(false);
      setIsUsernameDuplicateErrorVisible(false);
      setIsPasswordPatternErrorVisible(false);
      setIsConfirmPasswordMatchErrorVisible(false);

      localStorage.setItem("token", data.token);
      setIsAuthenticated(!!localStorage.getItem("token"));
      navigate("/create");

      // Include possible redirect.
      // navigate("/create");
    } catch(error) {
      console.log( error );
    }
  }

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
                  ref={usernameInputRef}
                />
                <p 
                  className={`signup-form__username-minimum-msg ${isUsernameMinimumErrorVisible ? "signup-form__username-minimum-msg--show" : ""}`}
                >Must contain at least 3 characters.</p>
                <p 
                  className={`signup-form__username-duplicate-msg ${isUsernameDuplicateErrorVisible ? "signup-form__username-duplicate-msg--show" : ""}`}
                >Username already taken.</p>
              </div>

              {/* Password Control */}
              <div className="signup-form__password-control">
                <label htmlFor="signup-form__password-input" className="signup-form__password-label">Password</label>
                <div className="signup-form__password-input-wrapper">
                  <input type={isPasswordVisible ? "text" : "password"}
                    id="signup-form__password-input"
                    className="signup-form__password-input"
                    placeholder="********"
                    ref={passwordInputRef}
                  />
                  <button className="signup-form__password-eye-btn" onClick={handlePasswordVisibilityToggle}>
                    <img src={eyeIcon} alt="Eye icon." className="signup-form__password-eye-icon" />
                  </button>
                </div>
                <p
                  className={`signup-form__password-pattern-msg ${isPasswordPatternErrorVisible ? "signup-form__password-pattern-msg--show" : ""}`}
                >
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
                    ref={confirmPasswordInputRef}
                  />
                  <button className="signup-form__confirm-eye-btn" onClick={handleConfirmVisibilityToggle}>
                    <img src={eyeIcon} alt="Eye icon." className="signup-form__confirm-eye-icon" />
                  </button>
                </div>
                <p 
                  className={`signup-form__confirm-match-msg ${isConfirmPasswordMatchErrorVisible ? "signup-form__confirm-match-msg--show" : ""}`}
                >
                  Does Not match password.
                </p>
              </div>

              {/* Form Button */}
              <button 
                className="signup-form__btn"
                onClick={handleCreateUser}  
              >Sign Up</button>

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