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