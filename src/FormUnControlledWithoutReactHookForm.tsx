import React, { forwardRef, useEffect, useRef } from "react"

const useInputRef = (initialValue: string) => {
  const inputElem = document.createElement("input")
  const inputRef = useRef(inputElem)

  useEffect(() => {
    // 為什麼這裡要放在 useEffect 裡面，不能直接放在 useEffect 外面？
    inputRef.current.value = initialValue
  }, [])

  return inputRef
}

function UnControlledForm() {
  const [usernameRef, passwordRef] = [
    useInputRef("username"),
    useInputRef("password"),
  ]

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
