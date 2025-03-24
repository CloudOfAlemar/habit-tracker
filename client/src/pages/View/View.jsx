

import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect, useMemo, createRef } from 'react';
import { getUserTrackers, updateHabits } from "../../utils/api";
import './View.scss';

import caretIcon from '../../assets/caret-icon.svg';
import editIcon from '../../assets/edit-icon.svg';
import trashIcon from '../../assets/trash-icon.svg';
import birdImg from '../../assets/bird.svg';

function View() {

  // React Hook - useLocation(): provides an object that contains information
  // about the current URL.
  const location = useLocation();

  // Javascript Web API - URLSearchParams(URL): provides methods to manipulate
  // URL parameters.
  const queryParams = new URLSearchParams(location.search);
  const trackerIdParam = queryParams.get("trackerId");

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

  const [currentTracker, setCurrentTracker] = useState({});
  const [userTrackers, setUserTrackers] = useState([]);

  // React Hook - useMemo: used to recompute a value with a heavy calculation
  // only when the dependency changes and NOT on every render.
  const data = useMemo(() => {
    const year = queryParams.get("year");
    const month = queryParams.get("month");
    const monthId = queryParams.get("monthId");
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
      monthId,
      currentHabits,
      currentDays
    }
  });

  // Functions
  const getSingleChartRowsCount = () => {
    const completeRows = Math.floor(currentTracker.days.length / 7);
    const incompleteRows = currentTracker.days.length % 7;
    return incompleteRows ? completeRows + 1 : completeRows;
  }

  // const deleteHabit = (habitToDelete) => {
  //   setTrackersList(previousState => 
  //     previousState.map(tracker => 
  //       tracker.year === data.year ?
  //       {
  //         ...tracker,
  //         months: tracker.months.map(month => 
  //           month.name === data.month
  //           ? {
  //             ...month,
  //             habits: month.habits.filter(habit => 
  //               habit !== habitToDelete
  //             ),
  //             days: month.days.map(day => ({
  //               ...day,
  //               journal: {
  //                 habitsLog : day.journal.habitsLog.filter(habitLog => 
  //                   habitLog.title !== habitToDelete
  //                 )
  //               }
  //             }))
  //           }
  //           : month
  //         )
  //       } :
  //       tracker
  //     )
  //   )
  // }



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

  const handleAddHabit = () => {
    if(newHabitInputRef.current && newHabitInputRef.current.value !== "") {
      const newHabit = newHabitInputRef.current.value;
      setCurrentTracker(previousState => ({
        ...previousState,
        habits: [...previousState.habits, newHabit],
        days: previousState.days.map(dayObj => ({
          ...dayObj,
          journalHabits: [
            ...dayObj.journalHabits,
            {
              habitTitle: newHabit,
              habitStatus: "",
              habitNotes: []
            }
          ]
        }))
      }));
      setIsNewHabitModalOpen(previousState => !previousState);
    }
  }

  const handleDeleteHabit = (habitToDelete) => {
    setCurrentTracker(previousState => ({
      ...previousState,
      habits: previousState.habits.filter(habit => habit !== habitToDelete),
      days: previousState.days.map(dayObj => ({
        ...dayObj,
        journalHabits: dayObj.journalHabits.filter(habitObj => 
          habitObj.habitTitle !== habitToDelete
        )
      }))
    }));
  }

  // React Hook - useEffect: runs code when a dependency variable changes.
  useEffect(() => {
    const fetchUserTrackers = async () => {
      try {
        const response = await getUserTrackers();
        const userTrackersData = await response.json();

        const sortedTrackersData = userTrackersData.sort((a, b) => 
          a.year !== b.year ? a.year - b.year : a.monthIndex - b.monthIndex
        );

        setUserTrackers(sortedTrackersData);
        setCurrentTracker(userTrackersData.find(tracker => tracker._id === queryParams.get("trackerId")));
        console.log( "User Trackers Data: ", userTrackersData );
      } catch(error) {
        console.log( error )
      }
    }
    fetchUserTrackers();
  }, [trackerIdParam]);

  useEffect(() => {
    const updateHabitsBackend = async () => {
      try{
        const response = await updateHabits(
          currentTracker._id,
          currentTracker.habits,
          currentTracker.days
        );
        const updatedTracker = await response.json();
        console.log( "Upated Tracker: ", updatedTracker );
      }catch(error) {
        console.log( error );
      }
    }
    if(currentTracker?.habits) {
      updateHabitsBackend();
    }
  }, [currentTracker?.habits]);

  useEffect(() => {
    console.log( "Current Tracker: ", currentTracker );
  }, [currentTracker]);

  useEffect(() => {
    console.log( "User Trackers: ", userTrackers );
  }, [userTrackers]);

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
                {`${currentTracker?.month || "Month"} (${currentTracker?.year || "Year"})`}
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
                {userTrackers
                  .filter(tracker => tracker._id !== currentTracker?._id)
                  .map((tracker, index) => (
                    <li className="view-dropdown__item" key={index}>
                      <Link 
                        to={`/view?trackerId=${tracker._id}`} 
                        className="view-dropdown__option"
                        onClick={() => {
                          setIsDropdownOpen(previousState => !previousState);
                          
                        }} 
                      >{`${tracker.month} ${tracker.year}`}
                      </Link>
                    </li>
                  ))}

                {/* {trackersList.flatMap(tracker =>
                  tracker.months.map(({name, id}) => (
                    <li className="view-dropdown__item" key={`${tracker.year}-${id}`}>
                      <Link 
                        to={`/view?year=${tracker.year}&month=${name}&monthId=${id}`} 
                        className="view-dropdown__option"
                        onClick={() => setIsDropdownOpen(previousState => !previousState)}  
                      >{`${name} ${tracker.year}`}
                      </Link>
                    </li>
                  ))
                )} */}
              </ul>
            </div>

            {/* Full Chart */}
            <div 
              className="full-chart"
              style={{
                display: !currentTracker?.year ? "none" : "flex"
              }}
            >

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

                  {currentTracker?.habits?.map((habit, index) => (
                    <p className="full-chart__habit-title" key={index}>{habit}</p>
                  ))}
                  
                </div>
              </div>

              {/* Tracking Side */}
              <div className="full-chart__tracking-side">

                {/* Tracking Side Header */}
                <div className="full-chart__tracking-side-header">

                  {currentTracker?.days?.map((trackerDay, index) => {
                    const dayOfMonth = new Date(trackerDay.date).toLocaleDateString("en-US", {day: "2-digit"});
                    const dayLetter = trackerDay?.day?.charAt(0);
                    return (
                      <div className="full-chart__pill" key={index}>
                        <button 
                          className="full-chart__journal-btn"
                        >
                          <img src={editIcon} alt="Edit icon." className="full-chart__edit-icon" />
                        </button>
                        <div className="full-chart__short-date">
                          <span className="full-chart__short-date-letter">{dayLetter}</span>
                          <span className="full-chart__short-date-number">{dayOfMonth}</span>
                        </div>
                      </div>
                    )
                  })}

                </div>

                {/* Tracking Side Body */}
                <div className="full-chart__tracking-side-body">

                  {currentTracker?.habits?.map((habit, index) => {
                    return (
                      <div className="full-chart__bullet-row" key={index}>
                        {currentTracker.days.map((day, index) => {
                          const habitObj = day.journalHabits
                            ?.find(habitObj => habitObj.habitTitle === habit);
                          return (
                            <span 
                              className="full-chart__bullet"
                              key={index}
                              style={{
                                backgroundColor: `${
                                  habitObj?.habitStatus === "green"
                                  ? "#C9FFC8"
                                  : habitObj?.habitStatus === "yellow"
                                  ? "#FFFEC8"
                                  : habitObj?.habitStatus === "red"
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

            {currentTracker?.habits?.map((habit, index) => {
              let count = 0;
              return (
              
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
  
                    {/* Work on displaying status color */}
  
                    {[...Array(getSingleChartRowsCount())].map((_,index) => {
                      const totalDays = currentTracker.days.length;
                      const isLastRow = index === getSingleChartRowsCount() - 1;
                      const remainingBullets = totalDays % 7;
                      const bulletCount = isLastRow && remainingBullets !== 0  ? remainingBullets : 7;
                      return (
                        <div className="single-chart__bullet-row" key={index}>
                          {[...Array(bulletCount)].map((_, index) => {
                            count++;
                            const bulletStatus = currentTracker.days
                              .find(day => day.dayOfMonth === count)?.journalHabits
                              .find(habitObj => habitObj.habitTitle === habit)?.habitStatus;

                            return (
                              <span 
                                className="single-chart__bullet" 
                                key={index}
                                data-day-count={count}
                                style={{
                                  backgroundColor: `${
                                  bulletStatus === "green"
                                  ? "#C9FFC8"
                                  : bulletStatus === "yellow"
                                  ? "#FFFEC8"
                                  : bulletStatus === "red"
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
              )
            })}

          </div>

          {(data.currentHabits().length === 0 && data.year) && (
            <div className="missing-single-chart">
              <div className="missing-single-chart__img-wrapper">
                <img 
                  src={birdImg} alt="Image of a bird listening to music in waiting." 
                  className="missing-single-chart__bird-img" 
                />
              </div>
              <p className="missing-single-chart__missing-text">
                Waiting for a new habit to be created...
              </p>
            </div>
          )}

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
                handleAddHabit();
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
                // deleteHabit(habitToDelete);
                handleDeleteHabit(habitToDelete);
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