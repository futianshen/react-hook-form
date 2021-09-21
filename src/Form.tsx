import React, { ChangeEventHandler, forwardRef } from "react"
import {
  Controller,
  useController,
  UseControllerProps,
  useForm
} from "react-hook-form"

type FormValues = {
  firstname: string
  lastname: string
  username: string
  password: string
}

const Form = () => {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      firstname: "firstname",
      lastname: "lastname",
      username: "username",
      password: "password",
    },
  })
  const submit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={submit}>
      <input {...register("firstname", { required: true, maxLength: 20 })} />
      <UncontrolledInput
        {...register("lastname", { required: true, maxLength: 20 })}
      />
      <Controller
        name="username"
        control={control}
        render={({ field: { value, onChange } }) => (
          <ControlledInput value={value} onChange={onChange} />
        )}
        rules={{ pattern: /^[A-Za-z]+$/i }}
      />
      <ControllerInput
        name="password"
        control={control}
        rules={{ pattern: /^[A-Za-z]+$/i }}
      />

      <input type="submit" />
    </form>
  )
}

const UncontrolledInput = forwardRef<HTMLInputElement>((props, ref) => {
  return <input {...props} ref={ref} />
})

const ControlledInput = (props: {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}) => {
  return <input {...props} />
}

const ControllerInput = (props: UseControllerProps<FormValues>) => {
  const {
    field: { ref, ...inputProps },
  } = useController(props)

  return <input {...inputProps} ref={ref} />
}

export default Form
