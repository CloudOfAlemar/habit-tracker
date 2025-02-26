
import { useState, useRef, useEffect, createRef } from 'react';

import './Create.scss';

import caretIcon from '../../assets/caret-icon.svg';
import trashIcon from '../../assets/trash-icon.svg';
import linkArrowIcon from '../../assets/link-arrow-icon.svg';
import { Link } from 'react-router-dom';

function Create() {

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

  const [trackerDeleteSelected, setTrackerDeleteSelected] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Reference Variables
  const monthDropdownRef = useRef(null);
  const monthDropdownListRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const yearDropdownListRef = useRef(null);
  const trackerDropdownRefs = useRef({});

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

  // Use Effects

  // useEffect(() => {
  //   console.log( `Tracker Select: `, trackerSelect )
  // }, [trackerSelect]);

  // useEffect(() => {
  //   console.log( trackerDropdowns )
  // }, [trackerDropdowns]);

  // useEffect(()=> {
  //   console.log( trackerDeleteSelected )
  // },[trackerDeleteSelected]);

  useEffect(() => {
    // console.log( trackersList )
    
    trackersList.length !== 0 && localStorage.setItem("trackersList", JSON.stringify(trackersList));

    trackersList.forEach(tracker => {
      const year = tracker.year;
      const dropdown = trackerDropdownRefs.current[`trackerDropdown${year}`].current;
      if(
        trackerDropdowns[`isOpen${year}`] &&
        dropdown
      ) {
        dropdown.style.maxHeight = `${dropdown.scrollHeight}px`
      }
    });
  }, [trackersList]);

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
                onClick={handleCreateTracker}
              >Create</button>
            </div>
          </div>

          {/* Tracker Dropdowns */}
          <div className="create__tracker-dropdowns">

            {trackersList.map((obj, trackerDropdownIndex) => {
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
            })}

          </div>

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
                const updatedTrackersList = trackersList.map(trackerObj => {
                  const containsYear = trackerObj.year === trackerDeleteSelected.year;
                  const containsMonth = trackerObj.months.some(monthObj => monthObj.name === trackerDeleteSelected.month.name);
                  if(containsYear && containsMonth) {
                    const updatedMonths = trackerObj.months.filter(month => month.name !== trackerDeleteSelected.month.name);
                    return {...trackerObj, months: [...updatedMonths]};
                  } else {
                    return trackerObj;
                  }
                });

                const filteredTrackersList = updatedTrackersList.filter(obj => obj.months.length !== 0);
                setTrackersList(filteredTrackersList);
                setIsDeleteModalOpen(false);
              }}
            >Delete</button>
            <button 
              className="delete-tracker-modal__cancel-btn"
              onClick={() => setIsDeleteModalOpen(false)}  
            >Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Create;