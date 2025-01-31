import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import './Header.scss';

import graphIcon from '../../assets/graph-icon.svg';
import burgerIcon from '../../assets/burger-icon.svg';

function Header() {
  // NOTE: Explore useState values as Objects, not only single values.
  const [isTopnavListOpen, setIsTopnavListOpen] = useState(false);
  const [topnavListHeight, setTopnavListHeight] = useState("0px");


  const topnavListRef = useRef(null);
  const topnavBurgerBtnRef = useRef(null);

  const handleTopnavListToggle = () => {
    setIsTopnavListOpen(!isTopnavListOpen);
  }

  const handleTopnavListClose = () => {
    setIsTopnavListOpen(false);
  }

  useEffect(() => {
    if(isTopnavListOpen) {
      const dynamicTopnavListHeight = `${topnavListRef.current.scrollHeight}px`;
      setTopnavListHeight(dynamicTopnavListHeight);
    } else {
      setTopnavListHeight("0px");
    }

    const handleTopnavListOutsideClick = (event) => {
      if(
        isTopnavListOpen &&
        !topnavListRef.current.contains(event.target) &&
        !topnavBurgerBtnRef.current.contains(event.target)
      ) {
        setIsTopnavListOpen(false);
        setTopnavListHeight("0px");
      }
    }

    document.addEventListener("mousedown", handleTopnavListOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleTopnavListOutsideClick);
    }
  }, [isTopnavListOpen]);


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
            className={`topnav-list ${isTopnavListOpen ? "bottom-border": ""}`} 
            ref={topnavListRef}
            style={{maxHeight: topnavListHeight}}
            aria-hidden={!isTopnavListOpen}
          >
            <li className="topnav-list__item">
              <Link 
                to={"/"}
                className="topnav-list__link"
                onClick={handleTopnavListClose}
                tabIndex={isTopnavListOpen? 0 : -1}
              >Home</Link>
            </li>
            <li className="topnav-list__item">
              <Link
                to={"/login"}
                className="topnav-list__link"
                onClick={handleTopnavListClose}
                tabIndex={isTopnavListOpen? 0 : -1}
              >Login</Link>
            </li>
            <li className="topnav-list__item">
              <Link
                to={"/signup"}
                className="topnav-list__link"
                onClick={handleTopnavListClose}
                tabIndex={isTopnavListOpen? 0 : -1}
              >Sign Up</Link>
            </li>
            <li className="topnav-list__item">
              <Link
                to={"/create"}
                className="topnav-list__link"
                onClick={handleTopnavListClose}
                tabIndex={isTopnavListOpen? 0 : -1}
              >Create</Link>
            </li>
            <li className="topnav-list__item">
              <Link
                to={"/view"}
                className="topnav-list__link"
                onClick={handleTopnavListClose}
                tabIndex={isTopnavListOpen? 0 : -1}
              >View</Link>
            </li>
            {/* <li className="topnav-list__item">
              <Link
                to={"/"}
                className="topnav-list__link"
                onClick={handleTopnavListClose}
                tabIndex={isTopnavListOpen? 0 : -1}
              >Logout</Link>
            </li> */}
          </ul>

        </div>
      </div>
    </header>
  );
}

export default Header;
