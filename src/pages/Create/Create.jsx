
import { useState, useRef, useEffect } from 'react';

import './Create.scss';

import caretIcon from '../../assets/caret-icon.svg';
import trashIcon from '../../assets/trash-icon.svg';
import linkArrowIcon from '../../assets/link-arrow-icon.svg';

function Create() {

  // State Variables
  const [trackersList, setTrackersList] = useState([]);
  const [trackerSelect, setTrackerSelect] = useState({});
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [monthTogglerText, setMonthTogglerText] = useState("Month");
  const [isMonthErrorVisible, setIsMonthErrorVisible] = useState(false);
  const [yearTogglerText, setYearTogglerText] = useState("Year");
  const [isYearErrorVisible, setIsYearErrorVisible] = useState(false);

  // Reference Variables
  const monthDropdownRef = useRef(null);
  const monthDropdownListRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const yearDropdownListRef = useRef(null);

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
  const handleMonthDropdownToggle = () => setIsMonthDropdownOpen(previousState => !previousState);
  const handleYearDropdownToggle = () => setIsYearDropdownOpen(previousState => !previousState);

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
    handleMonthDropdownToggle();
  }

  const handleYearBtnClick = (event) => {
    setTrackerSelect(previousState => ({
      ...previousState,
      year: event.target.textContent
    }));
    setYearTogglerText(event.target.textContent);
    setIsYearErrorVisible(false);
    handleYearDropdownToggle();
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

      const yearExists = trackersList.some(obj => obj.year === trackerSelect.year);

      const newTrackersListState = trackersList.map(obj => {
        const yearMatches = obj.year === trackerSelect.year;
        const containsMonth = obj.months.some(obj => obj.name === trackerSelect.month.name);

        if(yearMatches && !containsMonth) {
          return {...obj, months: [...obj.months, {name: trackerSelect.month.name, id: trackerSelect.month.id}]};
        } else {
          return obj;
        }
      });

      if(trackersList.length === 0 || !yearExists) {
        setTrackersList(previousState => [
          ...previousState,
          {
            year: trackerSelect.year,
            months: [{name: trackerSelect.month.name, id: trackerSelect.month.id}]
          }
        ].sort((a, b) => a.year - b.year));
      } else {
        setTrackersList(newTrackersListState.map(obj => {
          return {...obj, months: [...obj.months.sort((a, b) => a.id - b.id)]};
        }).sort((a, b) => a.year - b.year));
      }
      
      setIsYearErrorVisible(false);
      setIsMonthErrorVisible(false);
      setMonthTogglerText("Month");
      setYearTogglerText("Year");
      setTrackerSelect({});
    }
  }

  // Use Effects
  // useEffect(() => {
  //   console.log( `Tracker List: `, trackersList );
  // }, [trackersList]);

  // useEffect(() => {
  //   console.log( `Tracker Select: `, trackerSelect )
  // }, [trackerSelect]);

  useEffect(() => {
    const handleClickOutsideMonthDropdown = (event) => {
      if(
        isMonthDropdownOpen &&
        monthDropdownRef.current &&
        !monthDropdownRef.current.contains(event.target)
      ) {
        handleMonthDropdownToggle();
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
        handleYearDropdownToggle();
      }
    }

    document.addEventListener("mousedown", handleClickOutsideYearDropdown);

    return () => document.removeEventListener("mousedown", handleClickOutsideYearDropdown);
  }, [isYearDropdownOpen]);

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
              <div 
                className="create-tracker__month-dropdown"
                ref={monthDropdownRef}
              >
                <button 
                  className="create-tracker__month-toggler"
                  onClick={() => {
                    handleMonthDropdownToggle();
                    isYearDropdownOpen && handleYearDropdownToggle();
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
                    handleYearDropdownToggle();
                    isMonthDropdownOpen && handleMonthDropdownToggle();
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

          {/* Tracker Dropdowns */}
          <div className="create__tracker-dropdowns">

            {trackersList.map((obj, trackerDropdownIndex) => (
              <div className="tracker-dropdown" key={trackerDropdownIndex}>
                <button 
                  className="tracker-dropdown__year-toggler"
                  onClick={(event) => {
                    
                  }}
                >
                  {obj.year}
                  <img src={caretIcon} alt="Caret arrow." className="tracker-dropdown__year-toggler-caret-icon" /> 
                </button>
                <ul className="tracker-dropdown__list">
                  {obj.months.map((month, trackerItemIndex) => (
                    <li className="tracker-dropdown__item" key={trackerItemIndex}>
                      <a href="" className="tracker-dropdown__link">
                        <img src={linkArrowIcon} alt="Link arrow icon." className="tracker-dropdown__link-arrow-icon" />
                        {month.name}
                      </a>
                      <button className="tracker-dropdown__trash-btn">
                        <img src={trashIcon} alt="Trash icon." className="tracker-dropdown__trash-btn-icon" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

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

/* 

Tracker Select:

{
  year: 2024,
  month: {name: "December", id: 11}
}

{
  year: 2024,
  month: {name: "November", id: 10}
}

=========================================

Trackers List:

[
  {
    year: 2023,
    months: [
      {name: "August", id: 7}
    ]
  },
  {
    year: 2024,
    months: [
      {name: "December", id: 11}
    ]
  },
  {
    year: 2025,
    months: [
      {name: "January", id: 0}
      {name: "February", id: 1}
    ]
  },
]

*/