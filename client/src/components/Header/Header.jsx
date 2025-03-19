
// Imports
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect, useContext } from 'react';
import {AuthContext} from "../../context/AuthContext";

import './Header.scss';

import graphIcon from '../../assets/graph-icon.svg';
import burgerIcon from '../../assets/burger-icon.svg';

// Component
function Header() {
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  
  // States
  const [topnavListState, setTopnavListState] = useState({
    isOpen: false,
    styles: {
      maxHeight: "0px",
      borderBottom: "none"
    }
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Refs
  const topnavListRef = useRef(null);
  const topnavBurgerBtnRef = useRef(null);

  // Variables
  const topnavListLinkTabable = topnavListState.isOpen || (windowWidth >= 1024) ? 0 : -1;

  // Functions
  const handleTopnavListToggle = () => {
    setTopnavListState(previousState => {
      const isOpen = !previousState.isOpen;
      return {
        ...previousState,
        isOpen,
        styles: {
          ...previousState.styles,
          maxHeight: isOpen ? `${topnavListRef.current.scrollHeight}px` : "0px",
          borderBottom: isOpen ? "2px solid #EFEFEF" : "none"
        }
      };
    });
  }

  // Effects
  useEffect(() => {

    const handleTopnavListClose = (event) => {
      if(
        topnavListState.isOpen &&
        topnavListRef.current &&
        !topnavBurgerBtnRef.current.contains(event.target)
      ) {
        handleTopnavListToggle();
      }
    }
    document.addEventListener("mousedown", handleTopnavListClose);

    return () => {
      document.removeEventListener("mousedown", handleTopnavListClose);
    }
  }, [topnavListState.isOpen]);

  useEffect(() => {
    const handleResizeWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResizeWidth);

    return () => {
      window.removeEventListener("resize", handleResizeWidth);
    }
  }, []);

  return (
    <header className="header">
      <div className="topnav">
        <div className="topnav__container">

          {/* Topnav Brand */}
          <Link to={"/"} className="topnav__brand">
            <img 
              src={graphIcon} 
              alt="Graph Icon" 
              className="topnav__brand-icon" 
            />
            Habit Tracker
          </Link>

          {/* Topnav Burger Button */}
          <button className="topnav__burger-btn" ref={topnavBurgerBtnRef} onClick={handleTopnavListToggle}>
            <img
              src={burgerIcon}
              alt="Mobile navigation burger icon."
              className="topnav__burger-icon"
            />
          </button>

          {/* Topnav List */}
          <ul
            className={`topnav-list`}
            style={(windowWidth < 1024) ? topnavListState.styles : {maxHeight: "fit-content", borderBottom: "none"}}
            ref={topnavListRef}
            aria-hidden={topnavListState.isOpen}
          >
            <li className="topnav-list__item">
              <Link 
                to={"/"}
                className="topnav-list__link"
                tabIndex={topnavListLinkTabable}
              >Home</Link>
            </li>

            {isAuthenticated ? (<>
              <li className="topnav-list__item">
                <Link
                  to={"/create"}
                  className="topnav-list__link"
                  tabIndex={topnavListLinkTabable}
                >Create</Link>
              </li>
              <li className="topnav-list__item">
                <Link
                  to={"/view"}
                  className="topnav-list__link"
                  tabIndex={topnavListLinkTabable}
                >View</Link>
              </li>
              <li className="topnav-list__item">
                <Link
                  to={"/login"}
                  className="topnav-list__link"
                  tabIndex={topnavListLinkTabable}
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsAuthenticated(!!localStorage.getItem("token"));
                  }}
                >Logout</Link>
              </li>
            </>) : (<>
              <li className="topnav-list__item">
                <Link
                  to={"/login"}
                  className="topnav-list__link"
                  tabIndex={topnavListLinkTabable}
                >Login</Link>
              </li>
              <li className="topnav-list__item">
                <Link
                  to={"/signup"}
                  className="topnav-list__link"
                  tabIndex={topnavListLinkTabable}
                >Sign Up</Link>
              </li>
            </>)}
          
          </ul>

        </div>
      </div>
    </header>
  );
}

export default Header;
