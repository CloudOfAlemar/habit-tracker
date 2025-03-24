
import { useState, useRef, useEffect, createRef } from 'react';
import { Link } from 'react-router-dom';
import {createTracker, getUserTrackers, deleteTracker} from "../../utils/api";

import './Create.scss';

import caretIcon from '../../assets/caret-icon.svg';
import trashIcon from '../../assets/trash-icon.svg';
import linkArrowIcon from '../../assets/link-arrow-icon.svg';
import birdImg from '../../assets/bird.svg';

function Create() {
  const [userTrackers, setUserTrackers] = useState([]);

  // State Variables
  const [trackersList, setTrackersList] = useState(() => {
    const trackersListStorage = localStorage.getItem("trackersList");
    return trackersListStorage ? JSON.parse(trackersListStorage) : [];
  });
  const [trackerSelect, setTrackerSelect] = useState({});
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [monthTogglerText, setMonthTogglerText] = useState("Month");
  const [yearTogglerText, setYearTogglerText] = useState("Year");
  const [isMonthErrorVisible, setIsMonthErrorVisible] = useState(false);
  const [isYearErrorVisible, setIsYearErrorVisible] = useState(false);

  const [trackerDropdowns, setTrackerDropdowns] = useState({});
  const [userTrackerDropdowns, setUserTrackerDropdowns] = useState({});

  const [trackerDeleteSelected, setTrackerDeleteSelected] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Reference Variables
  const monthDropdownRef = useRef(null);
  const monthDropdownListRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const yearDropdownListRef = useRef(null);
  const trackerDropdownRefs = useRef({});
  const userTrackerDropdownRefs = useRef({});

  // Variables
  const currentYear = new Date().getFullYear();
  const yearOptionsList = [
    currentYear - 2,
    currentYear - 1,
    currentYear,
    currentYear + 1,
    currentYear + 2
  ];

  // Functions
  const handleMonthBtnClick = (event) => {
    setTrackerSelect(previousState => ({
      ...previousState,
      month: {
        name: event.target.textContent,
        id: event.target.dataset.monthid
      }
    }));
    setMonthTogglerText(event.target.textContent);
    setIsMonthErrorVisible(false);
    setIsMonthDropdownOpen(previousState => !previousState);
  }

  const handleYearBtnClick = (event) => {
    setTrackerSelect(previousState => ({
      ...previousState,
      year: event.target.textContent
    }));
    setYearTogglerText(event.target.textContent);
    setIsYearErrorVisible(false);
    setIsYearDropdownOpen(previousState => !previousState)
  }

  const handleCreateTracker = () => {
    if(!trackerSelect.year && !trackerSelect.month) {
      setIsYearErrorVisible(true);
      setIsMonthErrorVisible(true);
    } else if(!trackerSelect.year && trackerSelect.month) {
      setIsYearErrorVisible(true);
      setIsMonthErrorVisible(false);
    } else if(trackerSelect.year && !trackerSelect.month) {
      setIsYearErrorVisible(false);
      setIsMonthErrorVisible(true);
    } else {

      const getDaysArray = (year, monthId) => {
        return [...Array(new Date(year, parseInt(monthId) + 1, 0).getDate())].map((_, index) => {
          const currentDate = new Date(year, parseInt(monthId), index + 1);
          return {
            date: currentDate,
            name: currentDate.toLocaleDateString("en-US", {weekday: "long"}),
            dayOfTheMonth: index + 1,
            journal: {
              habitsLog: []
            }
          }
        })
      }

      setTrackersList(previousState =>
        previousState.some(tracker => tracker.year === trackerSelect.year)
        ? previousState.map(tracker =>
          tracker.year === trackerSelect.year
          ? {
              ...tracker, 
              months: tracker.months.some(month => month.name === trackerSelect.month.name)
              ? [...tracker.months]
              : [
                ...tracker.months,
                {
                  name: trackerSelect.month.name,
                  id: trackerSelect.month.id,
                  habits: [],
                  days: getDaysArray(trackerSelect.year, trackerSelect.month.id)
                }
              ].sort((a,b) => a.id - b.id)
            }
          : tracker
        )
        : [
          ...previousState,
          {
            year: trackerSelect.year,
            months: [
              {
                name: trackerSelect.month.name,
                id: trackerSelect.month.id,
                habits: [],
                days: getDaysArray(trackerSelect.year, trackerSelect.month.id)
              }
            ]
          }
        ].sort((a,b) => a.year - b.year)
      );
      
      setIsYearErrorVisible(false);
      setIsMonthErrorVisible(false);
      setMonthTogglerText("Month");
      setYearTogglerText("Year");
      setTrackerSelect({});
    }
  }

  const handleCreateTrackerBackend = async () => {
    if(!trackerSelect.year && !trackerSelect.month) {
      setIsYearErrorVisible(true);
      setIsMonthErrorVisible(true);
    } else if(!trackerSelect.year && trackerSelect.month) {
      setIsYearErrorVisible(true);
      setIsMonthErrorVisible(false);
    } else if(trackerSelect.year && !trackerSelect.month) {
      setIsYearErrorVisible(false);
      setIsMonthErrorVisible(true);
    } else {
      const {year, month: {name, id}} = trackerSelect;

      const daysToInsert = [...Array(new Date(year, parseInt(id) + 1, 0).getDate())]
        .map((_, index) => {
          const date = new Date(year, id, index + 1);
          const day = date.toLocaleDateString("en-US", {weekday: "long"});
          const dayOfMonth = index + 1;
          return {
            day,
            dayOfMonth,
            date,
            journalHabits: []
          }
        });

      const doesTrackerExist = userTrackers
        .find(tracker => tracker.year === parseInt(year))?.months
        .some(month => month.monthName === name);
      if(!doesTrackerExist) {
        try {
          const response = await createTracker(year, name, id, daysToInsert);
          const data = await response.json();
          if(userTrackers.length === 0 || userTrackers.every(tracker => tracker.year !== data.year)) {
            setUserTrackers(previousState => [
              ...previousState,
              {
                year: data.year,
                months: [{
                  monthName: data.month,
                  monthIndex: data.monthIndex,
                  trackerId: data._id
                }]
              }
            ].sort((a, b) => a.year - b.year));
          } else {
            setUserTrackers(previousState => 
              previousState.map(tracker => 
                tracker.year === data.year
                ? {
                  ...tracker,
                  months: [
                    ...tracker.months,
                    {monthName: data.month, monthIndex: data.monthIndex, trackerId: data._id}
                  ].sort((a, b) => a.monthIndex - b.monthIndex)
                }
                : tracker
              )
            );
          }
        } catch(error) {
          console.log( error )
        }
      }

      setIsYearErrorVisible(false);
      setIsMonthErrorVisible(false);
      setMonthTogglerText("Month");
      setYearTogglerText("Year");
      setTrackerSelect({});
    }
  }

  const handleDeleteTracker = async (yearToDelete, monthToDelete, trackerId) => {
    try {
      const response = await deleteTracker(trackerId);
      const data = await response.json();
      setUserTrackers(previousState => 
        previousState.map(tracker => 
          tracker.year === yearToDelete
          ? {
            ...tracker,
            months: tracker.months.filter(month => 
              month.monthName !== monthToDelete
            )
          }
          : tracker
        ).filter(tracker => tracker.months.length !== 0)
      );
      console.log( data )
    } catch(error) {
      console.log( error );
    }
  }

  // Use Effects

  useEffect(() => {
    const fetchUserTrackers = async () => {
      try {
        const response = await getUserTrackers();
        const data = await response.json();

        const organizedData = data.reduce((acc, tracker) => {
          const existingYear = acc.find(accTracker => accTracker.year === tracker.year);
          if(!existingYear) {
            acc.push({
              year: tracker.year,
              months: [
                {monthName: tracker.month, monthIndex: tracker.monthIndex, trackerId: tracker._id}
              ]
            })
            return acc;
          } else {
            return acc.map(accTracker => 
              accTracker.year === tracker.year
              ? {
                ...accTracker,
                months: [
                  ...accTracker.months,
                  {monthName: tracker.month, monthIndex: tracker.monthIndex, trackerId: tracker._id}
                ].sort((a,b) => a.monthIndex - b.monthIndex)
              }
              : accTracker
            );
          }
        }, []).sort((a, b) => a.year - b.year);
        
        setUserTrackerDropdowns(() => 
          organizedData.reduce((acc, data) => {
            acc[`isDropdownOpen${data.year}`] = false;
            return acc;
          }, {})
        );

        console.log( "Tracker Data: ", data );
        setUserTrackers(organizedData);
      } catch(error) {
        console.log( error )
      }
    } 
    fetchUserTrackers();
  }, []);

  useEffect(() => {
    userTrackers.forEach(tracker => {
      const containerRefs = userTrackerDropdownRefs.current;
      if(!containerRefs[`trackerDropdown${tracker.year}`]) {
        containerRefs[`trackerDropdown${tracker.year}`] = null;
      }
    })

    console.log( "User Trackers: ", userTrackers )
    console.log( "User Tracker Dropdown Refs: ", userTrackerDropdownRefs.current );
  }, [userTrackers]);

  useEffect(() => {
    console.log( "User Tracker Dropdowns: ", userTrackerDropdowns )
  }, [userTrackerDropdowns]);

  useEffect(() => {
    console.log( `Tracker Select: `, trackerSelect )
  }, [trackerSelect]);

  // useEffect(() => {
  //   console.log( trackerDropdowns )
  // }, [trackerDropdowns]);

  useEffect(()=> {
    console.log( trackerDeleteSelected )
  },[trackerDeleteSelected]);

  // useEffect(() => {
    
  //   trackersList.length !== 0 && localStorage.setItem("trackersList", JSON.stringify(trackersList));
  //   trackersList.length === 0 && localStorage.removeItem("trackersList");

  //   trackersList.forEach(tracker => {
  //     const year = tracker.year;
  //     const dropdown = trackerDropdownRefs.current[`trackerDropdown${year}`].current;
  //     if(
  //       trackerDropdowns[`isOpen${year}`] &&
  //       dropdown
  //     ) {
  //       dropdown.style.maxHeight = `${dropdown.scrollHeight}px`
  //     }
  //   });
  // }, [trackersList]);

  useEffect(() => {
    const handleClickOutsideMonthDropdown = (event) => {
      if(
        isMonthDropdownOpen &&
        monthDropdownRef.current &&
        !monthDropdownRef.current.contains(event.target)
      ) {
        setIsMonthDropdownOpen(previousState => !previousState);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMonthDropdown);

    return () => document.removeEventListener("mousedown", handleClickOutsideMonthDropdown);
  }, [isMonthDropdownOpen]);

  useEffect(() => {
    const handleClickOutsideYearDropdown = (event) => {
      if(
        isYearDropdownOpen &&
        yearDropdownRef.current &&
        !yearDropdownRef.current.contains(event.target)
      ) {
        setIsYearDropdownOpen(previousState => !previousState)
      }
    }

    document.addEventListener("mousedown", handleClickOutsideYearDropdown);

    return () => document.removeEventListener("mousedown", handleClickOutsideYearDropdown);
  }, [isYearDropdownOpen]);

  return (
    <main className="main">
      <section className="create">
        <div className="create__container">

          <div className="create__header-tracker-wrapper">

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
                <div 
                  className="create-tracker__month-dropdown"
                  ref={monthDropdownRef}
                >
                  <button 
                    className="create-tracker__month-toggler"
                    onClick={() => {
                      setIsMonthDropdownOpen(previousState => !previousState);
                      isYearDropdownOpen && setIsYearDropdownOpen(previousState => !previousState)
                    }}
                  >
                    {monthTogglerText}
                    <img 
                      src={caretIcon} 
                      alt="Caret arrow." 
                      className={`create-tracker__month-toggler-caret-icon ${isMonthDropdownOpen && "create-tracker__month-toggler-caret-icon--rotate"}`}
                    />
                  </button>
                  <p className={`create-tracker__month-toggler-error-msg ${isMonthErrorVisible && "create-tracker__month-toggler-error-msg--show"}`}>
                    Month required.
                  </p>
                  <ul 
                    className="create-tracker__month-list"
                    ref={monthDropdownListRef}
                    style={{
                      maxHeight: isMonthDropdownOpen && monthDropdownListRef.current ? `${monthDropdownListRef.current.scrollHeight}px` : "0px",
                      border: isMonthDropdownOpen ? "1px solid #EFEFEF" : "1px solid transparent"
                    }}
                  >
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={0}
                      >January</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={1}
                      >February</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={2}
                      >March</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={3}
                      >April</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={4}
                      >May</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={5}
                      >June</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={6}
                      >July</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={7}
                      >August</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={8}
                      >September</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={9}
                      >October</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={10}
                      >November</button>
                    </li>
                    <li className="create-tracker__month-item">
                      <button 
                        className="create-tracker__month-btn"
                        tabIndex={isMonthDropdownOpen ? 0 : -1}
                        onClick={handleMonthBtnClick}
                        data-monthid={11}
                      >December</button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Year Control */}
              <div className="create-tracker__year-control">
                <span className="create-tracker__year-label">Select year</span>
                <div 
                  className="create-tracker__year-dropdown"
                  ref={yearDropdownRef}
                >
                  <button 
                    className="create-tracker__year-toggler" 
                    onClick={() => {
                      setIsYearDropdownOpen(previousState => !previousState)
                      isMonthDropdownOpen && setIsMonthDropdownOpen(previousState => !previousState);
                    }}
                  >
                    {yearTogglerText}
                    <img 
                      src={caretIcon} 
                      alt="Caret arrow." 
                      className={`create-tracker__year-toggler-caret-icon ${isYearDropdownOpen && "create-tracker__year-toggler-caret-icon--rotate"}`} 
                    />
                  </button>
                  <p className={`create-tracker__year-toggler-error-msg ${isYearErrorVisible && "create-tracker__year-toggler-error-msg--show"}`}>
                    Year required.
                  </p>
                  <ul 
                    className="create-tracker__year-list"
                    ref={yearDropdownListRef}
                    style={{
                      maxHeight: isYearDropdownOpen && yearDropdownListRef ? `${yearDropdownListRef.current.scrollHeight}px` : "0px",
                      border: isYearDropdownOpen ? "1px solid #EFEFEF" : "1px solid transparent"
                    }}
                  >
                    {yearOptionsList.map((year, index) => (
                      <li className="create-tracker__year-item" key={index}>
                        <button 
                          className="create-tracker__year-btn"
                          tabIndex={isYearDropdownOpen ? 0 : -1}
                          onClick={handleYearBtnClick}
                        >{year}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Create Button */}
              <button
                className="create-tracker__create-btn"
                onClick={() => {
                  // handleCreateTracker();
                  handleCreateTrackerBackend();
                }}
              >Create</button>
            </div>
          </div>

          {/* Tracker Dropdowns */}
          <div 
            className="create__tracker-dropdowns"
            style={{
              display: userTrackers.length === 0 ? "none" : "flex"
            }}
          >

            {userTrackers.map((tracker, index) => {
              
              return (
                <div className="tracker-dropdown" key={index}>

                  <button 
                    className="tracker-dropdown__year-toggler"
                    style={{
                      marginBottom: userTrackerDropdowns[`isDropdownOpen${tracker.year}`] ? "2rem" : "0"
                    }}
                    onClick={() => {
                      setUserTrackerDropdowns(previousState => {
                        const closedDropdowns = Object.entries(previousState)
                          .reduce((acc, [key, value]) => {
                            acc[key] = false;
                            return acc;
                          }, {});
                        if(previousState[`isDropdownOpen${tracker.year}`]) {
                          return closedDropdowns;
                        } else {
                          return {...closedDropdowns, [`isDropdownOpen${tracker.year}`]: true}
                        }
                      })
                    }}
                  >
                    {tracker.year}
                    <img
                      src={caretIcon} alt="Caret arrow" 
                      className="tracker-dropdown__year-toggler-caret-icon"
                    />
                  </button>
                  
                  <ul 
                    ref={element => userTrackerDropdownRefs.current[`trackerDropdown${tracker.year}`] = element}
                    className="tracker-dropdown__list"
                    style={{
                      maxHeight: userTrackerDropdowns[`isDropdownOpen${tracker.year}`] 
                        ? `${userTrackerDropdownRefs.current[`trackerDropdown${tracker.year}`].scrollHeight}px`
                        : "0px"
                    }}  
                  >
                    {tracker.months.map((month, index) => (
                      <li className="tracker-dropdown__item" key={index}>
                        <Link to={`/view?trackerId=${month.trackerId}`} className="tracker-dropdown__link">
                          <img src={linkArrowIcon} alt="Link arrow icon." className="tracker-dropdown__link-arrow-icon" />
                          {month.monthName}
                        </Link>
                        <button
                          className="tracker-dropdown__trash-btn"
                          onClick={() => {
                            setIsDeleteModalOpen(true);
                            setTrackerDeleteSelected({year: tracker.year, month: month.monthName, trackerId: month.trackerId});
                          }}
                        >
                          <img src={trashIcon} alt="Trash icon." className="tracker-dropdown__trash-btn-icon" />
                        </button>
                      </li>
                    ))}
                  </ul>

                </div>
              )
            })}

            {/* {trackersList.map((obj, trackerDropdownIndex) => {
              if(!trackerDropdownRefs.current[`trackerDropdown${obj.year}`]) {
                trackerDropdownRefs.current[`trackerDropdown${obj.year}`] = createRef();
              }
              return (
                <div className="tracker-dropdown" key={trackerDropdownIndex}>
                  <button 
                    className="tracker-dropdown__year-toggler"
                    onClick={() => {
                      setTrackerDropdowns(previousState => {
                        const closedDropdowns = 
                          Object.entries(previousState)
                          .reduce((acc, [key, value]) => {
                            acc[key] = false;
                            return acc;
                          }, {});
                        if(previousState[`isOpen${obj.year}`]) {
                          return closedDropdowns;
                        } else {
                          return {...closedDropdowns, [`isOpen${obj.year}`]: true}
                        }
                      });
                    }}
                    style={{
                      marginBottom: trackerDropdowns[`isOpen${obj.year}`] ? "2rem" : "0rem"
                    }}
                  >
                    {obj.year}
                    <img 
                      src={caretIcon} alt="Caret arrow." 
                      className={`tracker-dropdown__year-toggler-caret-icon ${trackerDropdowns[`isOpen${obj.year}`] ? "tracker-dropdown__year-toggler-caret-icon--rotate" : ""}`}
                      /> 
                  </button>
                  <ul 
                    className="tracker-dropdown__list"
                    ref={trackerDropdownRefs.current[`trackerDropdown${obj.year}`]}
                    style={{
                      maxHeight: trackerDropdowns[`isOpen${obj.year}`] && trackerDropdownRefs.current[`trackerDropdown${obj.year}`].current ? `${trackerDropdownRefs.current[`trackerDropdown${obj.year}`].current.scrollHeight}px` : "0px",
                    }}
                  >
                    {obj.months.map((month, trackerItemIndex) => (
                      <li className="tracker-dropdown__item" key={trackerItemIndex}>
                        <Link to={`/view?year=${obj.year}&month=${month.name}&monthid=${month.id}`} className="tracker-dropdown__link">
                          <img src={linkArrowIcon} alt="Link arrow icon." className="tracker-dropdown__link-arrow-icon" />
                          {month.name}
                        </Link>
                        <button
                          className="tracker-dropdown__trash-btn"
                          onClick={() => {
                            setTrackerDeleteSelected({year: obj.year, month })
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <img src={trashIcon} alt="Trash icon." className="tracker-dropdown__trash-btn-icon" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })} */}

          </div>

          {userTrackers.length === 0 && (
            <div className="missing-single-chart">
            <div className="missing-single-chart__img-wrapper">
              <img 
                src={birdImg} alt="Image of a bird listening to music in waiting." 
                className="missing-single-chart__bird-img" 
              />
            </div>
            <p className="missing-single-chart__missing-text">
              Waiting for a new tracker to be created...
            </p>
          </div>
          )}

        </div>
      </section>

      {/* Delete Tracker Modal */}
      <div 
        className={`delete-tracker-modal ${isDeleteModalOpen ? "delete-tracker-modal--show" : ""}`}
      >
        <div className="delete-tracker-modal__card">
          <p className="delete-tracker-modal__msg">
            Delete this tracker?
          </p>
          <div className="delete-tracker-modal__btns">
            <button
              className="delete-tracker-modal__delete-btn"
              onClick={()=> {
                const {year, month, trackerId} = trackerDeleteSelected;
                handleDeleteTracker(year, month, trackerId);
                setIsDeleteModalOpen(false);
              }}
            >Delete</button>
            <button 
              className="delete-tracker-modal__cancel-btn"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setTrackerDeleteSelected({});
              }}  
            >Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Create;