
import './View.scss';

import caretIcon from '../../assets/caret-icon.svg';
import editIcon from '../../assets/edit-icon.svg';
import trashIcon from '../../assets/trash-icon.svg';

function View() {
  return (
    <main className="main">
      <section className="view">
        <div className="view_container">

          {/* View Header */}
          <div className="view__header">
            <h1 className="view__heading">
              View <span className="view__heading-alt-color">Tracker</span>
            </h1>
          </div>

          {/* View All */}
          <div className="view__all">

            {/* View Dropdown */}
            <div className="view-dropdown">
              <button className="view-dropdown__toggler">
                January (2025)
                <img src={caretIcon} alt="Caret icon." className="view-dropdown__toggler-caret-icon" />
              </button>

              <ul className="view-dropdown__list">
                <li className="view-dropdown__item">
                  <button className="view-dropdown__option">February 2025</button>
                </li>
                <li className="view-dropdown__item">
                  <button className="view-dropdown__option">March 2025</button>
                </li>
                <li className="view-dropdown__item">
                  <button className="view-dropdown__option">August 2026</button>
                </li>
                <li className="view-dropdown__item">
                  <button className="view-dropdown__option">September 2026</button>
                </li>
                <li className="view-dropdown__item">
                  <button className="view-dropdown__option">October 2026</button>
                </li>
              </ul>
            </div>

            {/* Full Chart */}
            <div className="full-chart">

              {/* Habit Side */}
              <div className="full-chart__habit-side">

                {/* Habit Side Header */}
                <div className="full-chart__habit-side-header">
                  <button className="full-chart__add-habit-btn">+ Habit</button>
                </div>

                {/* Habit Side Body */}
                <div className="full-chart__habit-side-body">
                  <p className="full-chart__habit-title">Build Projects</p>
                  <p className="full-chart__habit-title">Learn New Technology</p>
                  <p className="full-chart__habit-title">Workout</p>
                </div>
              </div>

              {/* Tracking Side */}
              <div className="full-chart__tracking-side">

                {/* Tracking Side Header */}
                <div className="full-chart__tracking-side-header">

                  {/* Pill #1 */}
                  <div className="full-chart__pill">
                    <button className="full-chart__journal-btn">
                      <img src={editIcon} alt="Edit icon." className="full-chart__edit-icon" />
                    </button>
                    <div className="full-chart__short-date">
                      <span className="full-chart__short-date-letter">S</span>
                      <span className="full-chart__short-date-number">1</span>
                    </div>
                  </div>

                  {/* Pill #2 */}
                  <div className="full-chart__pill">
                    <button className="full-chart__journal-btn">
                      <img src={editIcon} alt="Edit icon." className="full-chart__edit-icon" />
                    </button>
                    <div className="full-chart__short-date">
                      <span className="full-chart__short-date-letter">S</span>
                      <span className="full-chart__short-date-number">1</span>
                    </div>
                  </div>

                  {/* Pill #3 */}
                  <div className="full-chart__pill">
                    <button className="full-chart__journal-btn">
                      <img src={editIcon} alt="Edit icon." className="full-chart__edit-icon" />
                    </button>
                    <div className="full-chart__short-date">
                      <span className="full-chart__short-date-letter">S</span>
                      <span className="full-chart__short-date-number">1</span>
                    </div>
                  </div>

                  {/* Pill #4 */}
                  <div className="full-chart__pill">
                    <button className="full-chart__journal-btn">
                      <img src={editIcon} alt="Edit icon." className="full-chart__edit-icon" />
                    </button>
                    <div className="full-chart__short-date">
                      <span className="full-chart__short-date-letter">S</span>
                      <span className="full-chart__short-date-number">1</span>
                    </div>
                  </div>

                  {/* Pill #5 */}
                  <div className="full-chart__pill">
                    <button className="full-chart__journal-btn">
                      <img src={editIcon} alt="Edit icon." className="full-chart__edit-icon" />
                    </button>
                    <div className="full-chart__short-date">
                      <span className="full-chart__short-date-letter">S</span>
                      <span className="full-chart__short-date-number">1</span>
                    </div>
                  </div>

                  {/* Pill #6 */}
                  <div className="full-chart__pill">
                    <button className="full-chart__journal-btn">
                      <img src={editIcon} alt="Edit icon." className="full-chart__edit-icon" />
                    </button>
                    <div className="full-chart__short-date">
                      <span className="full-chart__short-date-letter">S</span>
                      <span className="full-chart__short-date-number">1</span>
                    </div>
                  </div>

                  {/* Pill #7 */}
                  <div className="full-chart__pill">
                    <button className="full-chart__journal-btn">
                      <img src={editIcon} alt="Edit icon." className="full-chart__edit-icon" />
                    </button>
                    <div className="full-chart__short-date">
                      <span className="full-chart__short-date-letter">S</span>
                      <span className="full-chart__short-date-number">1</span>
                    </div>
                  </div>
                </div>

                {/* Tracking Side Body */}
                <div className="full-chart__tracking-side-body">

                  {/* Bullet Row #1 */}
                  <div className="full-chart__bullet-row">
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                  </div>

                  {/* Bullet Row #1 */}
                  <div className="full-chart__bullet-row">
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                  </div>

                  {/* Bullet Row #1 */}
                  <div className="full-chart__bullet-row">
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                    <span className="full-chart__bullet"></span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* View Single */}
          <div className="view__single">

            {/* Single Chart #1 */}
            <div className="single-chart">

              {/* Single Chart Header */}
              <div className="single-chart__header">
                <h2 className="single-chart__heading">
                  Build Projects
                </h2>
                <button className="single-chart__trash-btn">
                  <img src={trashIcon} alt="Trash icon." className="single-chart__trash-btn-icon" />
                </button>
              </div>

              {/* Single Chart Body */}
              <div className="single-chart__body">

                {/* Bullet Row #1 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #2 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #3 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #4 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #5 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>
              </div>
            </div>

            {/* Single Chart #2 */}
            <div className="single-chart">

              {/* Single Chart Header */}
              <div className="single-chart__header">
                <h2 className="single-chart__heading">
                  Learn New Technologies
                </h2>
                <button className="btn-trash single-chart__trash-btn">
                  <img src={trashIcon} alt="Trash icon." className="single-chart__trash-btn-icon" />
                </button>
              </div>

              {/* Single Chart Body */}
              <div className="single-chart__body">

                {/* Bullet Row #1 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #2 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #3 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #4 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #5 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>
              </div>
            </div>

            {/* Single Chart #3 */}
            <div className="single-chart">

              {/* Single Chart Header */}
              <div className="single-chart__header">
                <h2 className="single-chart__heading">
                  Workout
                </h2>
                <button className="btn-trash single-chart__trash-btn">
                  <img src={trashIcon} alt="Trash icon." className="single-chart__trash-btn-icon" />
                </button>
              </div>

              {/* Single Chart Body */}
              <div className="single-chart__body">

                {/* Bullet Row #1 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #2 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #3 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #4 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>

                {/* Bullet Row #5 */}
                <div className="single-chart__bullet-row">
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                  <span className="single-chart__bullet"></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* New Habit Modal */}
      <div className="new-habit-modal">
        <div className="new-habit-modal__card">

          {/* Habit Control */}
          <div className="new-habit-modal__habit-control">
            <span className="new-habit-modal__label">Add Habit</span>
            <input
              type="text"
              className="new-habit-modal__input"
              placeholder="New Habit"
            />
          </div>

          {/* Buttons */}
          <div className="new-habit-modal__btns">
            <button className="new-habit-modal__add-btn">Add</button>
            <button className="new-habit-modal__cancel-btn">Cancel</button>
          </div>
        </div>
      </div>

      {/* Journal Modal */}
      <div className="journal-modal">
        <div className="journal-modal__card">

          {/* Journal Modal Header */}
          <div className="journal-modal__header">
            <h3 className="journal-modal__heading">
              2025 Jan Wed 01
            </h3>
          </div>

          {/* Journal Modal Body */}
          <div className="journal-modal__body">
            <div className="journal-modal-habit">
              <div className="journal-modal-habit__header">
                <div className="journal-modal-habit__status">
                  <span className="journal-modal-habit__status-bullet"></span>
                </div>
                <h3 className="journal-modal-habit__heading">
                  Build Projects
                </h3>
              </div>
              <ul className="journal-modal-habit__note-list">
                <li className="journal-modal-habit__note-item">
                  <p className="journal-modal-habit__note">
                    Completed mobile layouts for home, login, sign up, create pages 
                    and almost finished with the view page.
                  </p>
                </li>
                <li className="journal-modal-habit__note-item">
                  <p className="journal-modal-habit__note">
                    Completed edit modal for habit tracker app.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Journal Modal Footer */}
          <div className="journal-modal__footer">
            <button className="journal-modal__btn">Edit</button>
          </div>
        </div>
      </div>

      {/* Edit Journal Modal */}
      <div className="edit-journal-modal">
        <div className="edit-journal-modal__card">

          {/* Edit Journal Modal Header */}
          <div className="edit-journal-modal__header">
            <h3 className="edit-journal-modal__heading">
              2025 Jan Wed 01
            </h3>
          </div>

          {/* Edit Journal Modal Body */}
          <div className="edit-journal-modal__body">

            {/* Edit Journal Modal Habit */}
            <div className="edit-journal-modal-habit">

              {/* Edit Journal Modal Habit Header */}
              <div className="edit-journal-modal-habit__header">
                <div className="edit-journal-modal-habit__status">
                  <span className="edit-journal-modal-habit__status-bullet"></span>
                  <span className="edit-journal-modal-habit__status-bullet"></span>
                  <span className="edit-journal-modal-habit__status-bullet"></span>
                </div>

                <div className="edit-journal-modal-habit__tips">
                  <p className="edit-journal-modal-habit__tip">
                    Green = Great Progress
                  </p>
                  <p className="edit-journal-modal-habit__tip">
                    Yellow = Okay Progress
                  </p>
                  <p className="edit-journal-modal-habit__tip">
                    Red = Little Progress
                  </p>
                </div>

                <h3 className="edit-journal-modal-habit__heading">
                  Build Projects
                </h3>
              </div>

              {/* Edit Journal Modal Habit Note List */}
              <ul className="edit-journal-modal-habit__note-list">
                <li className="edit-journal-modal-habit__note-item">
                  <div className="edit-journal-modal-habit__note-content-wrapper">
                    <p className="edit-journal-modal-habit__note">
                      Completed mobile layouts for home, login, sign up, create 
                      pages and almost finished with the view page.
                    </p>
                    <button className="edit-journal-modal-habit__trash-btn">
                      <img src={trashIcon} alt="Trash Icon" className="edit-journal-modal-habit__trash-btn-icon" />
                    </button>
                  </div>
                </li>
                <li className="edit-journal-modal-habit__note-item">
                  <div className="edit-journal-modal-habit__note-content-wrapper">
                    <p className="edit-journal-modal-habit__note">
                      Completed edit modal for habit tracker app.
                    </p>
                    <button className="edit-journal-modal-habit__trash-btn">
                      <img src={trashIcon} alt="Trash Icon" className="edit-journal-modal-habit__trash-btn-icon" />
                    </button>
                  </div>
                </li>
              </ul>

              {/* Edit Journal Modal Habit Footer */}
              <div className="edit-journal-modal-habit__footer">
                <textarea
                  name="" id=""
                  rows="3"
                  className="edit-journal-modal-habit__note-input"
                  placeholder='What progress have you made?'
                ></textarea>
                <button className="edit-journal-modal-habit__add-note-btn">
                  + Note
                </button>
              </div>
            </div>
            {/* Edit Journal Modal Habit */}
            <div className="edit-journal-modal-habit">

              {/* Edit Journal Modal Habit Header */}
              <div className="edit-journal-modal-habit__header">
                <div className="edit-journal-modal-habit__status">
                  <span className="edit-journal-modal-habit__status-bullet"></span>
                  <span className="edit-journal-modal-habit__status-bullet"></span>
                  <span className="edit-journal-modal-habit__status-bullet"></span>
                </div>

                <div className="edit-journal-modal-habit__tips">
                  <p className="edit-journal-modal-habit__tip">
                    Green = Great Progress
                  </p>
                  <p className="edit-journal-modal-habit__tip">
                    Yellow = Okay Progress
                  </p>
                  <p className="edit-journal-modal-habit__tip">
                    Red = Little Progress
                  </p>
                </div>

                <h3 className="edit-journal-modal-habit__heading">
                  Build Projects
                </h3>
              </div>

              {/* Edit Journal Modal Habit Note List */}
              <ul className="edit-journal-modal-habit__note-list">
                <li className="edit-journal-modal-habit__note-item">
                  <div className="edit-journal-modal-habit__note-content-wrapper">
                    <p className="edit-journal-modal-habit__note">
                      Completed mobile layouts for home, login, sign up, create 
                      pages and almost finished with the view page.
                    </p>
                    <button className="edit-journal-modal-habit__trash-btn">
                      <img src={trashIcon} alt="Trash Icon" className="edit-journal-modal-habit__trash-btn-icon" />
                    </button>
                  </div>
                </li>
                <li className="edit-journal-modal-habit__note-item">
                  <div className="edit-journal-modal-habit__note-content-wrapper">
                    <p className="edit-journal-modal-habit__note">
                      Completed edit modal for habit tracker app.
                    </p>
                    <button className="edit-journal-modal-habit__trash-btn">
                      <img src={trashIcon} alt="Trash Icon" className="edit-journal-modal-habit__trash-btn-icon" />
                    </button>
                  </div>
                </li>
              </ul>

              {/* Edit Journal Modal Habit Footer */}
              <div className="edit-journal-modal-habit__footer">
                <textarea
                  name="" id=""
                  rows="3"
                  className="edit-journal-modal-habit__note-input"
                  placeholder='What progress have you made?'
                ></textarea>
                <button className="edit-journal-modal-habit__add-note-btn">
                  + Note
                </button>
              </div>
            </div>
          </div>

          {/* Edit Journal Modal  */}
          <div className="edit-journal-modal__footer">
            <button className="edit-journal-modal__save-btn">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Delete Habit Modal */}
      <div className="delete-habit-modal">
        <div className="delete-habit-modal__card">
          <p className="delete-habit-modal__msg">
            Delete this habit?
          </p>
          <div className="delete-habit-modal__btns">
            <button className="delete-habit-modal__delete-btn">Delete</button>
            <button className="delete-habit-modal__cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default View;