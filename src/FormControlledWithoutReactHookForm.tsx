import React, { useState } from "react"

function FormControlled() {
  const [{ username, password }, setFormValues] = useState({
    username: "username",
    password: "password",
  })
  const submit = () => {
    const data = { username, password }
    console.log(data)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <input
        name="username"
        value={username}
        onChange={(e) =>
          setFormValues((prev) => ({
            username: e.target.value,
            password: prev.password,
          }))
        }
      />
      <input
        name="password"
        value={password}
        onChange={(e) =>
          setFormValues((prev) => ({
            username: prev.username,
            password: e.target.value,
          }))
        }
      />
      <input type="submit" />
    </form>
  )
}

export default FormControlled
