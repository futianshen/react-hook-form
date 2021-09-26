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
  { name: "中國", cities: ["北京", "上海"] },
  { name: "韓國", cities: ["首爾", "釜山"] },
]

function PracticeControlled() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
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
        <Controller
          name="username"
          control={control}
          rules={{ required: true, maxLength: 20 }}
          render={({ field: { ref, name, value, onChange } }) => (
            <input ref={ref} name={name} value={value} onChange={onChange} />
          )}
        />
        {errors.username?.type && <span>{errors.username.type}</span>}
      </label>

      <label>
        <span>password</span>
        <Controller
          name="password"
          control={control}
          rules={{ required: true, maxLength: 20 }}
          render={({ field: { ref, name, value, onChange } }) => (
            <input
              ref={ref}
              type="password"
              name={name}
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errors.password?.type && <span>{errors.password.type}</span>}
      </label>

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

export default PracticeControlled
// - 表單驗證
// - [x]連動表單 B 项的值跟随 A 项变化 `Controller`
// - [x]錯誤處理
//   - [x]提示
//   - focus

// useController 和 Controller 使用場景上有什麼不同？
