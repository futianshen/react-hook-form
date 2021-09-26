import React from "react"
import FormUnControlled from "./FormUnControlled"
import FormControlled from "./FormControlled"
import FormControlledWithoutReactHookForm from "./FormControlledWithoutReactHookForm"
import FormUnControlledWithoutReactHookForm from "./FormUnControlledWithoutReactHookForm"
import PracticeUnControlled from "./PracticeUnControlled"
import PracticeControlled from "./PracticeControlled"
import TodoList from "./TodoList"

function App() {
  return (
    <div id="app">
      {/* <h2>Controlled Component</h2>
      <FormControlled />
      <hr />

      <h2>UnControlled Component</h2>
      <FormUnControlled />
      <hr />

      <h2>Controlled Component(without react hook form)</h2>
      <FormControlledWithoutReactHookForm />
      <hr />

      <h2>UnControlled Component(without react hook form)</h2>
      <FormUnControlledWithoutReactHookForm /> */}
      {/* <h2>PracticeUnControlled</h2>
      <PracticeUnControlled />
      <h2>PracticeControlled</h2>
      <PracticeControlled /> */}
      <TodoList />
    </div>
  )
}

export default App
