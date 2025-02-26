

import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect, useMemo } from 'react';
import './View.scss';

import caretIcon from '../../assets/caret-icon.svg';
import editIcon from '../../assets/edit-icon.svg';
import trashIcon from '../../assets/trash-icon.svg';

function View() {

  // React Hook - useLocation(): provides an object that contains information
  // about the current URL.
  const location = useLocation();

  // Javascript Web API - URLSearchParams(URL): provides methods to manipulate
  // URL parameters.
  const queryParams = new URLSearchParams(location.search);

  // React Hook - useRef: stores a reference of a DOM element to manipulate it
  // directly or stores a mutable value that doesn't trigger a re-render.
  const dropdownRef = useRef(null);
  const dropdownListRef = useRef(null);
  const newHabitInputRef = useRef(null);

  // React Hook - useMemo: used to recompute a value with a heavy calculation
  // only when the dependency changes and NOT on every render.
  const data = useMemo(() => {
    const year = queryParams.get("year");
    const month = queryParams.get("month");
    const monthid = queryParams.get("monthid");
    const daysInMonth = new Date(year, parseInt(monthid) + 1, 0).getDate();
    const dates = [];
    for(let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, monthid, i));
    }
    return {
      year,
      month,
      monthid,
      dates
    }
  });

  // React Hook - useState: changes to state variables trigger UI re-renders
  // to reflect the updated data.
  const [trackersList, setTrackersList] = useState(() => {
    const trackersListStorage = localStorage.getItem("trackersList");
    return trackersListStorage ? JSON.parse(trackersListStorage) : [];
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNewHabitModalOpen, setIsNewHabitModalOpen] = useState(false);

  const getCurrentTrackerHabits = () => {
    return trackersList.find(tracker => tracker.year === data.year)
      ?.months.find(month => month.name === data.month)?.habits || [];
  }

  const getSingleChartRowsCount = () => {
    const completeRows = Math.floor(data.dates.length / 7);
    const incompleteRows = data.dates.length % 7;
    return incompleteRows ? completeRows + 1 : completeRows;
  }

  const deleteHabit = (habitToDelete) => {
    setTrackersList(previousState => 
      previousState.map(tracker => 
        tracker.year === data.year ?
        {
          ...tracker,
          months: tracker.months.map(month =>
            month.name === data.month ?
            {
              ...month,
              habits: month.habits.filter(habit => habit !== habitToDelete)
            } :
            month
          )
        } :
        tracker
      )
    )
  }

  // React Hook - useEffect: runs code when a dependency variable changes.
  useEffect(() => {
    console.log( trackersList )
    localStorage.setItem("trackersList", JSON.stringify(trackersList));
  }, [trackersList]);

  useEffect(() => {
    if(!isNewHabitModalOpen) {
      newHabitInputRef.current.value = "";
    }
  }, [isNewHabitModalOpen]);

  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if(isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(previousState => !previousState);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, [isDropdownOpen]);

  return (
    <main className="main">
      <section className="view">
        <div className="view__container">

          {/* View Header */}
          <div className="view__header">
            <h1 className="view__heading">
              View <span className="view__heading-alt-color">Tracker</span>
            </h1>
          </div>

          {/* View All */}
          <div className="view__all">

            {/* View Dropdown */}
            <div 
              className="view-dropdown"
              ref={dropdownRef}
            >
              <button 
                className="view-dropdown__toggler"
                onClick={() => {
                  setIsDropdownOpen(previousState => !previousState);
                }}   
              >
                {`${data.month} (${data.year})`}
                <img 
                  src={caretIcon} alt="Caret icon." 
                  className={`view-dropdown__toggler-caret-icon ${isDropdownOpen ? "view-dropdown__toggler-caret-icon--rotate" : ""}`} 
                />
              </button>

              <ul 
                className="view-dropdown__list"
                ref={dropdownListRef}
                style={{
                  maxHeight: isDropdownOpen && dropdownListRef.current ? `${dropdownListRef.current.scrollHeight}px`: "0px",
                  border: isDropdownOpen ? "1px solid #EFEFEF" : "1px solid transparent"
                }}
              >
                {trackersList.flatMap(tracker =>
                  tracker.months.map(({name, id}) => (
                    <li className="view-dropdown__item" key={`${tracker.year}-${id}`}>
                      <Link 
                        to={`/view?year=${tracker.year}&month=${name}&monthid=${id}`} 
                        className="view-dropdown__option"
                        onClick={() => setIsDropdownOpen(previousState => !previousState)}  
                      >{`${name} ${tracker.year}`}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Full Chart */}
            <div className="full-chart">

              {/* Habit Side */}
              <div className="full-chart__habit-side">

                {/* Habit Side Header */}
                <div className="full-chart__habit-side-header">
                  <button 
                    className="full-chart__add-habit-btn"
                    onClick={() => {
                      setIsNewHabitModalOpen(previousState => !previousState);
                    }}
                  >+ Habit</button>
                </div>

                {/* Habit Side Body */}
                <div className="full-chart__habit-side-body">

                  {getCurrentTrackerHabits().map((habit, index) => (
                    <p className="full-chart__habit-title" key={index}>{habit}</p>
                  ))}
                  
                </div>
              </div>

              {/* Tracking Side */}
              <div className="full-chart__tracking-side">

                {/* Tracking Side Header */}
                <div className="full-chart__tracking-side-header">
                  
                  {data.dates.map((date, index) => {
                    const dayNumeric = date.toLocaleDateString("en-US", {day: "numeric"});
                    const dayNarrow = date.toLocaleDateString("en-US", {weekday: "narrow"});
                   
                    return (
                      <div className="full-chart__pill" key={index}>
                        <button className="full-chart__journal-btn">
                          <img src={editIcon} alt="Edit icon." className="full-chart__edit-icon" />
                        </button>
                        <div className="full-chart__short-date">
                          <span className="full-chart__short-date-letter">{dayNarrow}</span>
                          <span className="full-chart__short-date-number">{dayNumeric}</span>
                        </div>
                      </div> 
                    )
                  })}
                </div>

                {/* Tracking Side Body */}
                <div className="full-chart__tracking-side-body">

                  {getCurrentTrackerHabits().map((habit, index) => (
                    <div className="full-chart__bullet-row" key={index}>
                      {data.dates.map((date, index) => (
                        <span className="full-chart__bullet" key={index}></span>
                      ))}
                    </div> 
                  ))}

                </div>

              </div>
            </div>

          </div>

          {/* View Single */}
          <div className="view__single">

            {getCurrentTrackerHabits().map((habit, index) => (
              
              <div className="single-chart" key={index}>

                {/* Single Chart Header */}
                <div className="single-chart__header">
                  <h2 className="single-chart__heading">
                    {habit}
                  </h2>
                  <button 
                    className="single-chart__trash-btn"
                    onClick={() => deleteHabit(habit)}
                  >
                    <img src={trashIcon} alt="Trash icon." className="single-chart__trash-btn-icon" />
                  </button>
                </div>

                {/* Single Chart Body */}
                <div className="single-chart__body">

                  {[...Array(getSingleChartRowsCount())].map((_,index) => {
                    const totalDays = data.dates.length;
                    const isLastRow = index === getSingleChartRowsCount() -1;
                    const remainingBullets = totalDays % 7;
                    const bulletCount = isLastRow && remainingBullets !== 0  ? remainingBullets : 7;
                    return (
                      <div className="single-chart__bullet-row" key={index}>
                        {[...Array(bulletCount)].map((_, index) => (
                          <span className="single-chart__bullet" key={index}></span>
                        ))}
                      </div>
                    )
                  })}

                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* New Habit Modal */}
      <div 
        className={`new-habit-modal ${isNewHabitModalOpen ? "new-habit-modal--show" : ""}`}
      >
        <div className="new-habit-modal__card">

          {/* Habit Control */}
          <div className="new-habit-modal__habit-control">
            <span className="new-habit-modal__label">Add Habit</span>
            <input
              type="text"
              className="new-habit-modal__input"
              placeholder="New Habit"
              ref={newHabitInputRef}
            />
          </div>

          {/* Buttons */}
          <div className="new-habit-modal__btns">
            <button
              className="new-habit-modal__add-btn"
              onClick={() => {
                if(
                  newHabitInputRef.current &&
                  newHabitInputRef.current.value !== ""
                ) {
                  // Updates trackersList with new Habit
                  setTrackersList(previousState => 
                    previousState.map(tracker => 
                      tracker.year === data.year ?
                      {
                        ...tracker,
                        months: tracker.months.map(month => 
                          month.name === data.month ?
                          {
                            ...month,
                            habits: [...(month.habits ?? []), newHabitInputRef.current.value]
                          } :
                          month
                        )
                      } :
                      tracker
                    )
                  );
                  setIsNewHabitModalOpen(previousState => !previousState);
                }
              }}
            >Add</button>
            <button
              className="new-habit-modal__cancel-btn"
              onClick={() => {
                setIsNewHabitModalOpen(previousState => !previousState);
              }}
            >Cancel</button>
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

  // Delete this after
  // const trackersListDemo = [
  //   {
  //     year: 2025,
  //     months: [
  //       {
  //         name: "January",
  //         id: "0",
  //         habits: [
  //           "Build Projects",
  //           "Learn New Technologies",
  //           "Workout"
  //         ],
  //         days: [
  //           {
  //             name: "Wednesday",
  //             id: "1",
  //             journal: {
  //               habits: [
  //                 {
  //                   title: "Build Projects",
  //                   status: "green",
  //                   notes: [
  //                     "I completed the responsive design today.",
  //                     "I made progress on the backend."
  //                   ]
  //                 }
  //               ]
  //             }
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]