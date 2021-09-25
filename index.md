#react
#react-hook-form
#front-end
#form
#controlled component
#uncontrolled component

### 誰可能比較適合閱讀

React 16.8 之後版本
有表單的需要

### Acknowledge

- controlled component
- uncontrolled component
- useState
- useRef
- useEffect
- forwardRef

### 想要解決的問題

因為業務需求，最近正在將公司專案中的 Antd Form migrate 到 React-Hook-Form，發現 React-Hook-Form 提供了 controlled 和 uncontrolled component 的兩種解決方案，這跟我原來所熟悉的 Antd 表單很不一樣。

### 這篇文章希望能解決自己的什麼問題？

什麼場景下適合使用 controlled component？什麼時候適合使用 uncontrolled component ?

主流的表單設計
Antd, Formik

### 從簡單的範例開始

#### controlled component

```tsx
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
```

#### Uncontrolled Component

```tsx
type FormValues = {
  username: string
  password: string
}

function UnControlledForm() {
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

const UncontrolledInput = forwardRef<HTMLInputElement>(function (props, ref) {
  return <input {...props} ref={ref} />
})
```

### 最最最基本的表單需要什麼？
- 蒐集資料
- 提交表單

如果只是這樣我們用 ref 也能做到


### 開始解釋 Code

### 看看背後是怎麼實作的

### 從 Use Case 開始，做一些更複雜的操作

從基本的擴展


- 自動幫忙加 @gmail.com `Controller`
- 連動表單 B 项的值跟随 A 项变化 `Controller`
- 敏感词禁止 `Controller`
- 动态增减表单项 `useFieldArray`
- 错误提示與错误聚焦

### 結論


### 心得
做一個能優化使用者體驗的東西研究
研究他背後是用了那些技術和解決方案
工程師，成為一個解決方案的研究者

提供一個解決方案