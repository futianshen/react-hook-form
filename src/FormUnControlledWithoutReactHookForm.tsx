import React, { forwardRef, useEffect, useRef } from "react"

function UnControlledForm() {
  const [usernameRef, passwordRef] = Array(2)
    .fill("input")
    .map((inputElem) =>
      useRef<HTMLInputElement>(document.createElement(inputElem))
    )

  useEffect(() => {
    ;[usernameRef.current.value, passwordRef.current.value] = [
      "username",
      "password",
    ]
  }, [])

  const submit = () => {
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }
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
        ref={usernameRef}
        onChange={(e) => (usernameRef.current.value = e.target.value)}
      />
      <UncontrolledInput
        ref={passwordRef}
        onChange={(value) => (passwordRef.current.value = value)}
      />

      <input type="submit" />
    </form>
  )
}

const UncontrolledInput = forwardRef<
  HTMLInputElement,
  { onChange?: (value: string) => void }
>(function (props, ref) {
  return <input onChange={(e) => props.onChange?.(e.target.value)} ref={ref} />
})

export default UnControlledForm
