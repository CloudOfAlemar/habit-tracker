const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const createUser = (username, password) => {
  return fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });
}

export const login = (username, password) => {
  return fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });
}

export const createTracker = (year, month, monthIndex, daysToInsert) => {
  const token = localStorage.getItem("token");
  return fetch(`${API_BASE_URL}/api/trackers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      year,
      month,
      monthIndex,
      daysToInsert
    })
  })
}

export const deleteTracker = (trackerId) => {
  const token = localStorage.getItem("token");
  return fetch(`${API_BASE_URL}/api/trackers/delete`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      Authorization : `Bearer ${token}`
    },
    body: JSON.stringify({trackerId})
  });
}

export const getUserTrackers = () => {
  const token = localStorage.getItem("token");
  return fetch(`${API_BASE_URL}/api/trackers/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

export const updateHabits = (trackerId, habits, days) => {
  const token = localStorage.getItem("token");
  return fetch(`${API_BASE_URL}/api/trackers/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({trackerId, habits, days})
  });
}

export const updateJournalHabits = (trackerId, dayId, journalHabits) => {
  const token = localStorage.getItem("token");
  return fetch(`${API_BASE_URL}/api/trackers/journalHabits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({trackerId, dayId, journalHabits})
  });
}