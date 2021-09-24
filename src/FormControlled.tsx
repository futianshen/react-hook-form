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

const FormControlled = () => {
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

const ControlledInput = (props: {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}) => <input {...props} />

const UseControllerInput = (props: UseControllerProps<FormValues>) => {
  const { field } = useController(props)

  return <input {...field} />
}

export default FormControlled
