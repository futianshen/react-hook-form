import React, { forwardRef } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  username: string
  password: string
}

function FormUnControlled() {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: "username",
      password: "password",
    },
  })
  const submit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={submit}>
      <input {...register("username", { required: true, maxLength: 20 })} />
      <UncontrolledInput
        {...register("password", { required: true, maxLength: 20 })}
      />

      <input type="submit" />
    </form>
  )
}

const UncontrolledInput = forwardRef<HTMLInputElement>((props, ref) => (
  <input {...props} ref={ref} />
))

export default FormUnControlled
