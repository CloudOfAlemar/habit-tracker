
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Home.scss';
import graphImg from '../../assets/graph-img.svg';

function Home() {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <main className="main">
      <section className="home">
        <div className="home__container">

          {/* Home Image Wrapper */}
          <div className="home__img-wrapper">
            <img src={graphImg} alt="Image of a graph." className="home__graph-img" />
          </div>

          {/* Home Body */}
          <div className="home__body">
            <div className="home__text-content">
              <h1 className="home__heading">
                Habit <span className="home__heading-alt-color">Tracker</span>
              </h1>
              <p className="home__description">
                A simple way to measure productivity throughout the journey of self improvement.
              </p>
            </div>

            <div className="home__btns">
              {isAuthenticated ? (<>
                <Link to="/create" className="home__create-btn">Create</Link>
                <Link to="/view" className="home__view-btn">View</Link>
              </>) : (<>
                <Link to="/login" className="home__login-btn">Login</Link>
                <Link to="/signup" className="home__signup-btn">Sign Up</Link>
              </>)}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Home;