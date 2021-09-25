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

因為業務需求，最近正在將公司專案中的 Antd Form migrate 到 React-Hook-Form，發現 React Hook Form 提供了 controlled 和 uncontrolled component 的兩種解決方案，這跟我原來所熟悉的 Antd 基於 Controlled Component 的作法很不一樣，所以這篇文章
主要是我想要試圖分析，這兩種有什麼差別，他們的優勢和劣勢分別是什麼？

### 這篇文章希望能解決自己的什麼問題？

什麼場景下適合使用 controlled component？什麼時候適合使用 uncontrolled component ?

主流的表單設計 Controlled Component
Antd, Formik

### 初探 React-Hook-Form 從簡單的範例開始

參考官方文件，我們可以很快的建立一個簡單的表單

#### controlled component

```tsx
import React, { ChangeEventHandler } from "react"
import {
  useForm,
  Controller,
  useController,
  UseControllerProps,
} from "react-hook-form"

function FormControlled() {
  const { control, handleSubmit } = useForm({
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

function UseControllerInput(
  props: UseControllerProps<{ username: string; password: string }>
) {
  const { field } = useController(props)

  return <input {...field} />
}
```

[程式碼解釋]

#### Uncontrolled Component

```tsx
import React, { forwardRef } from "react"
import { useForm } from "react-hook-form"

function UnControlledForm() {
  const { register, handleSubmit } = useForm({
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

const UncontrolledInput = forwardRef(function (props, ref) {
  return <input {...props} ref={ref} />
})
```

[程式碼解釋]

### 最最最基本的表單需要什麼？

從上面這個基本案例我們只做到 2 件事情

1. 蒐集資料
2. 提交表單

但如果只是這樣，我們其實不需要使用 React Hook Form，因為這樣我們自己使用 React 的 Hook 也能做的到

#### Controlled Component

```tsx
import React, { useState } from "react"

function FormControlled() {
  const [{ username, password }, setFormValues] = useState({
    username: "username",
    password: "password",
  })
  const submit = () => {
    const data = { username, password }
    console.log(data)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <input
        name="username"
        value={username}
        onChange={(e) =>
          setFormValues((prev) => ({
            username: e.target.value,
            password: prev.password,
          }))
        }
      />
      <input
        name="password"
        value={password}
        onChange={(e) =>
          setFormValues((prev) => ({
            username: prev.username,
            password: e.target.value,
          }))
        }
      />
      <input type="submit" />
    </form>
  )
}
```

[程式碼解釋]

#### UnControlled Component

```tsx
import React, { forwardRef, useEffect, useRef } from "react"

const useInputRef = (initialValue: string) => {
  const inputElem = document.createElement("input")
  const inputRef = useRef(inputElem)

  useEffect(() => {
    // 為什麼這裡要放在 useEffect 裡面，不能直接放在 useEffect 外面？
    inputRef.current.value = initialValue
  }, [])

  return inputRef
}

function UnControlledForm() {
  const [usernameRef, passwordRef] = [
    useInputRef("username"),
    useInputRef("password"),
  ]

  const submit = () => {
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }
    console.log(data)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <input
        ref={usernameRef}
        onChange={(e) => (usernameRef.current.value = e.target.value)}
      />
      <UncontrolledInput
        ref={passwordRef}
        onChange={(value) => (passwordRef.current.value = value)}
      />

      <input type="submit" />
    </form>
  )
}

const UncontrolledInput = forwardRef<
  HTMLInputElement,
  { onChange?: (value: string) => void }
>(function (props, ref) {
  return <input onChange={(e) => props.onChange?.(e.target.value)} ref={ref} />
})
```

[程式碼解釋]

### React Hook Form 幫我們解決了什麼問題？

### 從 Use Case 開始，做一些更複雜的操作，可以跟我一起做做看

從基本的擴展

從上面這個基本案例我們只做到 2 件事情

1. 蒐集資料
2. 提交表單

副作用

- 連動表單

  - B 项的值跟随 A 项变化 `Controller`
  - 自動幫忙加 @gmail.com `Controller`

- 表單驗證
  - 敏感词禁止 `Controller`

- 動態表單
  - `useFieldArray`

- 錯誤處理
  - 提示
  - focus

username
password
firstName
lastName
nickname
phone
email

### 看看背後是怎麼實作的 有時間的話看看 Source Code

### 結論，什麼時候該使用哪一個？

在選擇使用哪一種方案的時候我們應該考慮什麼？
給一個混用的案例

你又遇到什麼複雜的表單操作嗎？歡迎和我討論

Performance
開發者體驗

Building forms in React can be a hard and repetitive process. You have to deal with the form data, validate it, configure when and how to show the error message for invalid inputs, and also be able to reset the form to the initial state. In such a situation, you’ll want to use a form library to help out.

When doing so, there are various features you should use to evaluate a form library. They are:

    Form state management
    Validation
    Integration with custom component and third-party libraries
    Syntax
    Performance


### 參考資料

- GitHub Repo

### 心得

做一個能優化使用者體驗的東西研究
研究他背後是用了那些技術和解決方案
工程師，成為一個解決方案的研究者

提供一個解決方案

UX 的定義
提高所有合作夥伴的 UX

我想要交付什麼？提高所有合作夥伴的 UX
死嗑自己 娛樂大家

如何了解一個技術，能不能用盡所有文件上的東西，想辦法找到一個現實中的問題來解決。

> 過一段時間就重構自己的文章，對自己的文字負責
