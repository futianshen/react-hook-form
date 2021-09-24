import React, { ChangeEventHandler } from "react"
import {
  useForm,
  Controller,
  useController,
  UseControllerProps,
} from "react-hook-form"

type FormValues = {
  username: string
  password: string
}

function FormControlled() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: "username",
      password: "password",
    },
  })
  const submit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={submit}>
      <Controller
        name="username"
        control={control}
        render={({ field: { value, onChange } }) => (
          <ControlledInput value={value} onChange={onChange} />
        )}
      />
      <UseControllerInput name="password" control={control} />

      <input type="submit" />
    </form>
  )
}

function ControlledInput(props: {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}) {
  return <input {...props} />
}

function UseControllerInput(props: UseControllerProps<FormValues>) {
  const { field } = useController(props)

  return <input {...field} />
}

export default FormControlled
