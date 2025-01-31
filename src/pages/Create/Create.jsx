
import './Create.scss';

import caretIcon from '../../assets/caret-icon.svg';
import trashIcon from '../../assets/trash-icon.svg';
import linkArrowIcon from '../../assets/link-arrow-icon.svg';

function Create() {
  return (
    <main className="main">
      <section className="create">
        <div className="create__container">

          {/* Create Header */}
          <div className="create__header">
            <h1 className="create__heading">
              Create <span className="create__heading-alt-color">Tracker</span>
            </h1>
          </div>

          {/* Create Tracker */}
          <div className="create-tracker">

            {/* Month Control */}
            <div className="create-tracker__month-control">
              <span className="create-tracker__month-label">Select month</span>
              <div className="create-tracker__month-dropdown">
                <button className="create-tracker__month-toggler">
                  Month
                  <img src={caretIcon} alt="Caret arrow." className="create-tracker__month-toggler-caret-icon" />
                </button>
                <ul className="create-tracker__month-list">
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">January</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">February</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">March</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">April</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">May</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">June</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">July</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">August</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">September</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">October</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">November</button>
                  </li>
                  <li className="create-tracker__month-item">
                    <button className="create-tracker__month-btn">December</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Year Control */}
            <div className="create-tracker__year-control">
              <span className="create-tracker__year-label">Select year</span>
              <div className="create-tracker__year-dropdown">
                <button className="create-tracker__year-toggler">
                  Year
                  <img src={caretIcon} alt="Caret arrow." className="create-tracker__year-toggler-caret-icon" />
                </button>
                <ul className="create-tracker__year-list">
                  <li className="create-tracker__year-item">
                    <button className="create-tracker__year-btn">2023</button>
                  </li>
                  <li className="create-tracker__year-item">
                    <button className="create-tracker__year-btn">2024</button>
                  </li>
                  <li className="create-tracker__year-item">
                    <button className="create-tracker__year-btn">2025</button>
                  </li>
                  <li className="create-tracker__year-item">
                    <button className="create-tracker__year-btn">2026</button>
                  </li>
                  <li className="create-tracker__year-item">
                    <button className="create-tracker__year-btn">2027</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Create Button */}
            <button className="create-tracker__create-btn">Create</button>
          </div>

          {/* Tracker Dropdowns */}
          <div className="create__tracker-dropdowns">

            {/* Tracker Dropdown #1 */}
            <div className="tracker-dropdown">
              <button className="tracker-dropdown__year-toggler">
                2025
                <img src={caretIcon} alt="Caret arrow." className="tracker-dropdown__year-toggler-caret-icon" /> 
              </button>
              <ul className="tracker-dropdown__list">
                <li className="tracker-dropdown__item">
                  <a href="" className="tracker-dropdown__link">
                    <img src={linkArrowIcon} alt="Link arrow icon." className="tracker-dropdown__link-arrow-icon" />
                    January
                  </a>
                  <button className="tracker-dropdown__trash-btn">
                    <img src={trashIcon} alt="Trash icon." className="tracker-dropdown__trash-btn-icon" />
                  </button>
                </li>
                <li className="tracker-dropdown__item">
                  <a href="" className="tracker-dropdown__link">
                    <img src={linkArrowIcon} alt="Link arrow icon." className="tracker-dropdown__link-arrow-icon" />
                    February
                  </a>
                  <button className="tracker-dropdown__trash-btn">
                    <img src={trashIcon} alt="Trash icon." className="tracker-dropdown__trash-btn-icon" />
                  </button>
                </li>
                <li className="tracker-dropdown__item">
                  <a href="" className="tracker-dropdown__link">
                    <img src={linkArrowIcon} alt="Link arrow icon." className="tracker-dropdown__link-arrow-icon" />
                    March
                  </a>
                  <button className="tracker-dropdown__trash-btn">
                    <img src={trashIcon} alt="Trash icon." className="tracker-dropdown__trash-btn-icon" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Tracker Dropdown #2 */}
            <div className="tracker-dropdown">
              <button className="dropdown__toggler tracker-dropdown__year-toggler">
                2026
                <img src={caretIcon} alt="Caret arrow." className="tracker-dropdown__year-toggler-caret-icon" /> 
              </button>
              <ul className="tracker-dropdown__list">
                <li className="tracker-dropdown__item">
                  <a href="" className="tracker-dropdown__link">
                    <img src={linkArrowIcon} alt="Link arrow icon." className="tracker-dropdown__link-arrow-icon" />
                    August
                  </a>
                  <button className="tracker-dropdown__trash-btn">
                    <img src={trashIcon} alt="Trash icon." className="tracker-dropdown__trash-btn-icon" />
                  </button>
                </li>
                <li className="tracker-dropdown__item">
                  <a href="" className="tracker-dropdown__link">
                    <img src={linkArrowIcon} alt="Link arrow icon." className="tracker-dropdown__link-arrow-icon" />
                    September
                  </a>
                  <button className="tracker-dropdown__trash-btn">
                    <img src={trashIcon} alt="Trash icon." className="tracker-dropdown__trash-btn-icon" />
                  </button>
                </li>
                <li className="tracker-dropdown__item">
                  <a href="" className="tracker-dropdown__link">
                    <img src={linkArrowIcon} alt="Link arrow icon." className="tracker-dropdown__link-arrow-icon" />
                    October
                  </a>
                  <button className="tracker-dropdown__trash-btn">
                    <img src={trashIcon} alt="Trash icon." className="tracker-dropdown__trash-btn-icon" />
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Delete Tracker Modal */}
      <div className="delete-tracker-modal">
        <div className="delete-tracker-modal__card">
          <p className="delete-tracker-modal__msg">
            Delete this tracker?
          </p>
          <div className="delete-tracker-modal__btns">
            <button className="delete-tracker-modal__delete-btn">Delete</button>
            <button className="delete-tracker-modal__cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Create;