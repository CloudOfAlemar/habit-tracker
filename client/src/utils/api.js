export const createUser = (username, password) => {
  return fetch("/api/users", {
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
  return fetch("/api/auth/login", {
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

export const createTracker = (year, month, monthIndex) => {
  const token = localStorage.getItem("token");
  return fetch("/api/trackers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      year,
      month,
      monthIndex
    })
  })
}

export const deleteTracker = (trackerId) => {
  const token = localStorage.getItem("token");
  return fetch("/api/trackers/delete", {
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
  return fetch("/api/trackers/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}