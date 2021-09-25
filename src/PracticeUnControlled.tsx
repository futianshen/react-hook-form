import React from "react"
import { useForm } from "react-hook-form"

const countries = [
  { name: "台灣", cities: ["台北", "桃園", "高雄"] },
  { name: "日本", cities: ["大阪", "東京", "北海道"] },
]

function PracticeUnControlled() {
  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: "username",
      password: "password",
      firstName: "",
      lastName: "",
      nickname: "",
      phone: "",
      email: "",
      country: "台灣",
      city: "台北",
    },
  })
  const submit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={submit}>
      <input {...register("username")} />
      <input {...register("password")} />
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input {...register("nickname")} />
      <input {...register("phone")} />
      <input {...register("email")} />
      <select
        {...register("country")}
        onChange={(e) => {
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
      <select {...register("city")}>
        {countries
          .find((country) => country.name === watch("country"))
          ?.cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
      </select>
      <input type="submit" />
    </form>
  )
}

export default PracticeUnControlled
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
