import React from "react"
import FormUnControlled from "./FormUnControlled"
import FormControlled from "./FormControlled"

function App() {
  return (
    <div>
      <h2>Controlled Component</h2>
      <FormControlled />
      <hr />
      <h2>UnControlled Component</h2>
      <FormUnControlled />
    </div>
  )
}

export default App
