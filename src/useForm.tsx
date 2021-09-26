import React, { MutableRefObject } from "react"

export type ChangeHandler = (event: {
  target: any
  type?: any
}) => Promise<void | boolean>

const register: (name: string) => {
  onChange: ChangeHandler
  onBlur: ChangeHandler
  name: string
  ref: React.Ref<any>
} = (name) => {
  return {
    name,
    onChange: (event: any) => new Promise(() => {}),
    onBlur: (event: any) => new Promise(() => {}),
    ref: (ref: HTMLInputElement | null): void => {},
  }
}

const watch: (fieldName: string, defaultValue: string) => void = (
  fieldName,
  defaultValue
) => {
  const fieldValues = { [fieldName]: defaultValue }

  return fieldValues[fieldName]
}

export function useForm(props: { defaultValues: Record<string, any> }) {
  const _formControl = React.useRef<{
    register: typeof register
    watch: typeof watch
    formState: { errors: Record<string, any> }
  }>()

  const [formState, updateFormState] = React.useState({
    errors: {},
  })

  if (_formControl.current === null) {
    _formControl.current = {
      register,
      watch,
      formState,
    }
  }

  return _formControl.current
}
