import React from "react"
import FormUnControlled from "./FormUnControlled"
import FormControlled from "./FormControlled"
import FormControlledWithoutReactHookForm from "./FormControlledWithoutReactHookForm"
import FormUnControlledWithoutReactHookForm from "./FormUnControlledWithoutReactHookForm"

function App() {
  return (
    <div>
      <h2>Controlled Component</h2>
      <FormControlled />
      <hr />

      <h2>UnControlled Component</h2>
      <FormUnControlled />
      <hr />

      <h2>Controlled Component(without react hook form)</h2>
      <FormControlledWithoutReactHookForm />
      <hr />

      <h2>UnControlled Component(without react hook form)</h2>
      <FormUnControlledWithoutReactHookForm />
    </div>
  )
}

export default App
