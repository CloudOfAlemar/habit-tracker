

import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect, useMemo, createRef } from 'react';
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
  const noteInputRefs = useRef([]);

  // React Hook - useState: changes to state variables trigger UI re-renders
  // to reflect the updated data.
  const [trackersList, setTrackersList] = useState(() => {
    const trackersListStorage = localStorage.getItem("trackersList");
    return trackersListStorage ? JSON.parse(trackersListStorage) : [];
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNewHabitModalOpen, setIsNewHabitModalOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isEditJournalOpen, setIsEditJournalOpen] = useState(false);
  const [currentJournalData, setCurrentJournalData] = useState({});
  const [currentEditJournalData, setCurrentEditJournalData] = useState({});
  const [isDeleteHabitModalOpen, setIsDeleteHabitModalOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState("");

  // React Hook - useMemo: used to recompute a value with a heavy calculation
  // only when the dependency changes and NOT on every render.
  const data = useMemo(() => {
    const year = queryParams.get("year");
    const month = queryParams.get("month");
    const monthid = queryParams.get("monthid");
    const currentHabits = () => {
      return trackersList.find(tracker => tracker.year === data.year)
        ?.months.find(month => month.name === data.month)?.habits || [];
    }
    const currentDays = () => {
      return trackersList.find(tracker => tracker.year === data.year)
        ?.months.find(month => month.name === data.month)?.days || [];
    }

    return {
      year,
      month,
      monthid,
      currentHabits,
      currentDays
    }
  });

  // Functions
  const getSingleChartRowsCount = () => {
    const completeRows = Math.floor(data.currentDays().length / 7);
    const incompleteRows = data.currentDays().length % 7;
    return incompleteRows ? completeRows + 1 : completeRows;
  }

  const deleteHabit = (habitToDelete) => {
    setTrackersList(previousState => 
      previousState.map(tracker => 
        tracker.year === data.year ?
        {
          ...tracker,
          months: tracker.months.map(month => 
            month.name === data.month
            ? {
              ...month,
              habits: month.habits.filter(habit => 
                habit !== habitToDelete
              ),
              days: month.days.map(day => ({
                ...day,
                journal: {
                  habitsLog : day.journal.habitsLog.filter(habitLog => 
                    habitLog.title !== habitToDelete
                  )
                }
              }))
            }
            : month
          )
        } :
        tracker
      )
    )
  }

  const updateEditJournalStatus = (event, habitLog) => {
    const status = event.target.dataset.statusColor;
    const habitLogStatus = habitLog.status;
    setCurrentEditJournalData(previousState => ({
      ...previousState,
      habitsLog: previousState.habitsLog.map(log => 
        log.title === habitLog.title
        ? {
          ...log,
          status: status === habitLogStatus ? "" : status
        }
        : log
      )
    }));
  }

  // React Hook - useEffect: runs code when a dependency variable changes.

  useEffect(() => {
    console.log(currentJournalData);
    // console.log( trackersList )
  }, [currentJournalData]);

  useEffect(() => {
    console.log( currentJournalData )
    console.log(currentEditJournalData);
  }, [currentEditJournalData]);

  useEffect(() => {
    console.log( noteInputRefs.current )
  }, [currentEditJournalData.habitsLog]);

  useEffect(() => {
    trackersList.length > 0 && localStorage.setItem("trackersList", JSON.stringify(trackersList));
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
                    onClick={() => setIsNewHabitModalOpen(previousState => !previousState)}
                  >+ Habit</button>
                </div>

                {/* Habit Side Body */}
                <div className="full-chart__habit-side-body">

                  {data.currentHabits().map((habit, index) => (
                    <p className="full-chart__habit-title" key={index}>{habit}</p>
                  ))}
                  
                </div>
              </div>

              {/* Tracking Side */}
              <div className="full-chart__tracking-side">

                {/* Tracking Side Header */}
                <div className="full-chart__tracking-side-header">

                  {trackersList.length > 0 && trackersList
                    .find(tracker => tracker.year === data.year)?.months
                    .find(month => month.name === data.month).days
                    .map(({name, dayOfTheMonth, date, journal: {habitsLog}}, index) => {
                      const dayLetter = name.charAt(0);
                      return (
                        <div className="full-chart__pill" key={index}>
                          <button 
                            className="full-chart__journal-btn"
                            onClick={() => {
                              setIsJournalOpen(previousState => !previousState);
                              setCurrentJournalData(previousState => {
                                const currentDate = new Date(date);
                                const weekday = currentDate.toLocaleDateString("en-US", {weekday: "long"});
                                const currentYear = currentDate.getFullYear();
                                const currentShortMonth = currentDate.toLocaleDateString("en-US", {month: "short"});
                                const currentShortWeekday = currentDate.toLocaleDateString("en-US", {weekday: "short"});
                                const currentTwoDigitDay = currentDate.toLocaleDateString("en-US", {day: "2-digit"});
                                const dayOfTheMonth = currentDate.getDate();
                                
                                return {
                                  ...previousState,
                                  year: currentYear,
                                  shortMonth: currentShortMonth,
                                  shortWeekday: currentShortWeekday,
                                  twoDigitDay: currentTwoDigitDay,
                                  weekday,
                                  currentDate,
                                  dayOfTheMonth,
                                  habitsLog
                                }
                              })
                            }}
                          >
                            <img src={editIcon} alt="Edit icon." className="full-chart__edit-icon" />
                          </button>
                          <div className="full-chart__short-date">
                            <span className="full-chart__short-date-letter">{dayLetter}</span>
                            <span className="full-chart__short-date-number">{dayOfTheMonth}</span>
                          </div>
                        </div> 
                      )
                    })}

                </div>

                {/* Tracking Side Body */}
                <div className="full-chart__tracking-side-body">

                  {data.currentHabits().map((habit, index) => {
                    return (
                      <div className="full-chart__bullet-row" key={index}>
                        {data.currentDays().map((day, index) => {
                          const habitLog = day.journal.habitsLog.find(log => 
                            log.title === habit
                          );
                          return (
                            <span 
                              className="full-chart__bullet"
                              key={index}
                              style={{
                                backgroundColor: `${
                                  habitLog.status === "green"
                                  ? "#C9FFC8"
                                  : habitLog.status === "yellow"
                                  ? "#FFFEC8"
                                  : habitLog.status === "red"
                                  ? "#FFE3E9"
                                  : "transparent"
                                }`
                              }}
                            ></span>
                          )
                        })}
                      </div> 
                    )
                  })}

                </div>

              </div>
            </div>

          </div>

          {/* View Single */}
          <div className="view__single">

            {data.currentHabits().map((habit, index) => (
              
              <div className="single-chart" key={index}>

                {/* Single Chart Header */}
                <div className="single-chart__header">
                  <h2 className="single-chart__heading">
                    {habit}
                  </h2>
                  <button 
                    className="single-chart__trash-btn"
                    onClick={() => {
                      setHabitToDelete(habit);
                      setIsDeleteHabitModalOpen(previousState => !previousState);
                    }}
                  >
                    <img src={trashIcon} alt="Trash icon." className="single-chart__trash-btn-icon" />
                  </button>
                </div>

                {/* Single Chart Body */}
                <div className="single-chart__body">

                  {[...Array(getSingleChartRowsCount())].map((_,index) => {
                    const totalDays = data.currentDays().length;
                    const isLastRow = index === getSingleChartRowsCount() - 1;
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
                // Extract Logic into smaller functions to avoid deep nesting
                if(
                  newHabitInputRef.current &&
                  newHabitInputRef.current.value !== ""
                ) {
                  // Updates trackersList with new Habit
                  setTrackersList(previousState => 
                    previousState.map(tracker => 
                      tracker.year === data.year
                      ? {
                          ...tracker,
                          months: tracker.months.map(month => 
                            month.name === data.month
                            ? {
                                ...month,
                                habits: [...(month.habits ?? []), newHabitInputRef.current.value],
                                days: month.days.map(day => 
                                  ({
                                    ...day,
                                    journal: {
                                      habitsLog: [
                                        ...day.journal.habitsLog,
                                        {
                                          title: newHabitInputRef.current.value,
                                          status: "",
                                          notes: []
                                        }
                                      ]
                                    }
                                  })
                                )
                              }
                            : month
                          )
                        } 
                      : tracker
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
      <div className={`journal-modal ${isJournalOpen ? "journal-modal--show" : ""}`}>
        <div className="journal-modal__card">

          {/* Journal Modal Header */}
          <div className="journal-modal__header">
            <h3 className="journal-modal__heading">
              {`${currentJournalData.year} ${currentJournalData.shortMonth} ${currentJournalData.shortWeekday} ${currentJournalData.twoDigitDay}`}
            </h3>
          </div>

          {/* Journal Modal Body */}
          <div className="journal-modal__body">

            {currentJournalData.habitsLog?.map((log, index) => {
              return (
                <div className="journal-modal-habit" key={index}>
                  <div className="journal-modal-habit__header">
                    <div className="journal-modal-habit__status">
                      <span
                        className="journal-modal-habit__status-bullet"
                        style={{
                          backgroundColor: `${
                            log.status === "green"
                            ? "#C9FFC8"
                            : log.status === "yellow"
                            ? "#FFFEC8"
                            : log.status === "red"
                            ? "#FFE3E9"
                            : "transparent"
                          }`
                        }}
                      ></span>
                    </div>
                    <h3 className="journal-modal-habit__heading">
                      {log.title}
                    </h3>
                  </div>
                  <ul className="journal-modal-habit__note-list">
  
                    {log.notes.map((note, index) => (
                      <li className="journal-modal-habit__note-item" key={index}>
                        <p className="journal-modal-habit__note">
                          {note}
                        </p>
                      </li>
                    ))}
  
                  </ul>
                </div>
              )
            })}

          </div>

          {/* Journal Modal Footer */}
          <div className="journal-modal__footer">
            <button 
              className="journal-modal__btn"
              onClick={() => {
                setIsJournalOpen(previousState => !previousState);
                setIsEditJournalOpen(previousState => !previousState);
                setCurrentEditJournalData(() => ({
                  ...currentJournalData
                }));
              }}
            >Edit</button>
            <button 
              className="journal-modal__close-btn"
              onClick={()=> setIsJournalOpen(previousState => !previousState)}
            >Close</button>
          </div>
        </div>
      </div>

      {/* Edit Journal Modal */}
      <div className={`edit-journal-modal ${isEditJournalOpen ? "edit-journal-modal--show" : ""}`}>
        <div className="edit-journal-modal__card">

          {/* Edit Journal Modal Header */}
          <div className="edit-journal-modal__header">
            <h3 className="edit-journal-modal__heading">
              {`${currentEditJournalData.year}
              ${currentEditJournalData.shortMonth}
              ${currentEditJournalData.shortWeekday}
              ${currentEditJournalData.twoDigitDay}`}
            </h3>
          </div>

          {/* Edit Journal Modal Body */}
          <div className="edit-journal-modal__body">

            {currentEditJournalData.habitsLog?.map((habitLog, index) => {
              if(!noteInputRefs.current[index]) {
                noteInputRefs.current[index] = createRef();
              }
              return (
                <div className="edit-journal-modal-habit" key={index}>

                  {/* Edit Journal Modal Habit Header */}
                  <div className="edit-journal-modal-habit__header">
                    <div className="edit-journal-modal-habit__status">
                      <span 
                        className="edit-journal-modal-habit__status-bullet edit-journal-modal-habit__status-bullet--green"
                        data-status-color="green"
                        onClick={(event) => {
                          updateEditJournalStatus(event, habitLog);
                        }}
                        style={{
                          border: `${habitLog.status === "green" ? "2px solid #6C63FF" : "1px solid #A29CBB"}`
                        }}
                      ></span>
                      <span 
                        className="edit-journal-modal-habit__status-bullet edit-journal-modal-habit__status-bullet--yellow"
                        data-status-color="yellow"
                        onClick={(event) => {
                          updateEditJournalStatus(event, habitLog);
                        }}
                        style={{
                          border: `${habitLog.status === "yellow" ? "2px solid #6C63FF" : "1px solid #A29CBB"}`
                        }}
                      ></span>
                      <span 
                        className="edit-journal-modal-habit__status-bullet edit-journal-modal-habit__status-bullet--red"
                        data-status-color="red"
                        onClick={(event) => {
                          updateEditJournalStatus(event, habitLog);
                        }} 
                        style={{
                          border: `${habitLog.status === "red" ? "2px solid #6C63FF" : "1px solid #A29CBB"}`
                        }}
                      ></span>
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
                      {habitLog.title}
                    </h3>
                  </div>

                  {/* Edit Journal Modal Habit Note List */}
                  <ul className="edit-journal-modal-habit__note-list">
                    {habitLog.notes?.map((note, index) => (
                      <li className="edit-journal-modal-habit__note-item" key={index}>
                        <div className="edit-journal-modal-habit__note-content-wrapper">
                          <p className="edit-journal-modal-habit__note">
                            {note}
                          </p>
                          <button 
                            className="edit-journal-modal-habit__trash-btn"
                            onClick={() => {
                              setCurrentEditJournalData(previousState => ({
                                ...previousState,
                                habitsLog: previousState.habitsLog.map(log => 
                                  log.title === habitLog.title
                                  ? {
                                    ...log,
                                    notes: log.notes.filter(logNote => 
                                      logNote !== note
                                    )
                                  }
                                  : log
                                )
                              }));
                            }}  
                          >
                            <img src={trashIcon} alt="Trash Icon" className="edit-journal-modal-habit__trash-btn-icon" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Edit Journal Modal Habit Footer */}
                  <div className="edit-journal-modal-habit__footer">
                    <textarea
                      ref={noteInputRefs.current[index]}
                      name="" id=""
                      rows="3"
                      className="edit-journal-modal-habit__note-input"
                      placeholder='What progress have you made?'
                    ></textarea>
                    <button 
                      className="edit-journal-modal-habit__add-note-btn"
                      onClick={() => {
                        const inputValue = noteInputRefs.current[index].current.value.trim();
                        if(inputValue) {
                          setCurrentEditJournalData(previousState => {
                            return {
                              ...previousState,
                              habitsLog: previousState.habitsLog.map(log => 
                                log.title === habitLog.title
                                ? {
                                  ...log,
                                  notes: [
                                    ...log.notes,
                                    inputValue
                                  ]
                                }
                                : log
                              )
                            }
                          });
                          noteInputRefs.current[index].current.value = "";
                        }
                      }}
                    >
                      + Note
                    </button>
                  </div>
                </div>
              )
              
            })}

          </div>

          {/* Edit Journal Modal Footer */}
          <div className="edit-journal-modal__footer">
            <button 
              className="edit-journal-modal__save-btn"
              onClick={() => {
                setTrackersList(previousState => 
                  previousState.map(tracker => 
                    tracker.year === data.year
                    ? {
                      ...tracker,
                      months: tracker.months.map(month => 
                        month.name === data.month
                        ? {
                          ...month,
                          days: month.days.map(day => 
                            // instead of weekday use day of the month
                            day.dayOfTheMonth === currentEditJournalData.dayOfTheMonth
                            ? {
                              ...day,
                              journal: {
                                habitsLog: [
                                  ...currentEditJournalData.habitsLog
                                ]
                              }
                            }
                            : day
                          )
                        }
                        : month
                      )
                    }
                    : tracker
                  )
                );
                setCurrentJournalData(previousState => ({
                  ...previousState,
                  habitsLog: [...currentEditJournalData.habitsLog]
                }));
                setIsEditJournalOpen(previousState => !previousState);
                setIsJournalOpen(previousState => !previousState);
              }}
            >Save</button>
            <button 
              className="edit-journal-modal__cancel-btn"
              onClick={() => {
                setIsEditJournalOpen(previousState => !previousState);
                setIsJournalOpen(previousState => !previousState);
              }}  
            >Cancel</button>
          </div>
        </div>
      </div>

      {/* Delete Habit Modal */}
      <div 
        className={`delete-habit-modal ${isDeleteHabitModalOpen ? "delete-habit-modal--show" : ""}`}
      >
        <div className="delete-habit-modal__card">
          <p className="delete-habit-modal__msg">
            Delete this habit?
          </p>
          <div className="delete-habit-modal__btns">
            <button 
              className="delete-habit-modal__delete-btn"
              onClick={() => {
                deleteHabit(habitToDelete);
                setIsDeleteHabitModalOpen(previousState => !previousState);
              }}
            >Delete</button>
            <button
              className="delete-habit-modal__cancel-btn"
              onClick={() => {
                setIsDeleteHabitModalOpen(previousState => !previousState);
              }}
            >Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default View;