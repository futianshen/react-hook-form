import {
  Controller,
  useController,
  UseControllerProps,
  useForm,
} from "react-hook-form"
import React from "react"

const countries = [
  { name: "台灣", cities: ["台北", "桃園", "高雄"] },
  { name: "日本", cities: ["大阪", "東京", "北海道"] },
]

function PracticeControlled() {
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      username: "username",
      password: "password",
      firstName: "",
      lastName: "",
      nickname: "",
      phone: "",
      email: "",
      country: "台灣",
      city: "日本",
    },
  })
  const submit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={submit}>
      <Input name="username" control={control} />
      <Input name="password" control={control} />
      <Input name="firstName" control={control} />
      <Input name="lastName" control={control} />
      <Input name="nickname" control={control} />
      <Input name="phone" control={control} />
      <Input name="email" control={control} />

      <Controller
        name="country"
        control={control}
        render={({ field: { value, onChange } }) => (
          <select
            value={value}
            onChange={(e) => {
              onChange(e)
              setValue("country", e.target.value)
              setValue(
                "city",
                countries.find((country) => country.name === e.target.value)
                  ?.cities[0] || ""
              )
            }}
          >
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field: { value, onChange } }) => {
          console.log("render")
          return (
            <select value={value} onChange={onChange}>
              {countries
                .find((country) => country.name === getValues("country"))
                ?.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          )
        }}
      />

      <input type="submit" />
    </form>
  )
}

function Input(
  props: UseControllerProps<{
    username: string
    password: string
    firstName: string
    lastName: string
    nickname: string
    phone: string
    email: string
    country: string
    city: string
  }>
) {
  const { field } = useController(props)

  return <input {...field} />
}

export default PracticeControlled
//
// - [x]連動表單 B 项的值跟随 A 项变化 `Controller`
//
// - 表單驗證
// - 敏感词禁止 `Controller`
//
// - 動態表單
// - `useFieldArray`
//
// - 錯誤處理
// - 提示
// - focus