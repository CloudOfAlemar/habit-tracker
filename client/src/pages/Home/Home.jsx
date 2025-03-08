
import { Link } from 'react-router-dom';
import './Home.scss';
import graphImg from '../../assets/graph-img.svg';

function Home() {
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

            {/* Home Buttons */}
            {/* NOTE: switch these a tags to Link when routes are ready */}
            <div className="home__btns">
              <Link to="/login" className="home__login-btn">Login</Link>
              <Link to="/signup" className="home__signup-btn">Sign Up</Link>
              {/* <a href="/" className="home__create-btn">Create</a>
              <a href="/" className="home__view-btn">View</a> */}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Home;