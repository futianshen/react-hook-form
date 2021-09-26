import React from "react"
import { useForm } from "react-hook-form"

const countries = [
  { name: "台灣", cities: ["台北", "桃園", "高雄"] },
  { name: "日本", cities: ["大阪", "東京", "北海道"] },
  { name: "中國", cities: ["北京", "上海"] },
  { name: "韓國", cities: ["首爾", "釜山"] },
]

function PracticeUnControlled() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      country: "台灣",
      city: "台北",
    },
  })
  const submit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={submit}>
      <label>
        <span>username</span>
        <input {...register("username", { required: true, maxLength: 20 })} />
        {errors.username?.type && <span>{errors.username.type}</span>}
      </label>

      <label>
        <span>password</span>
        <input
          type="password"
          {...register("password", { required: true, maxLength: 20 })}
        />
        {errors.password?.type && <span>{errors.password.type}</span>}
      </label>

      <select {...register("country")}>
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
// - 表單驗證
// - [x]連動表單 B 项的值跟随 A 项变化 `Controller`
// - [x]錯誤處理
//    - [x]提示
//    - focus

// watch 和 useWatch 有什麼不同？
