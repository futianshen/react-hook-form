import React, { ReactElement } from "react"
import {
  Control,
  useFieldArray,
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch
} from "react-hook-form"

const initialList = [
  {
    value: "todo",
    isDone: false,
    isGroup: false,
    list: [],
  },
  {
    value: "todo-group",
    isDone: false,
    isGroup: true,
    list: [
      {
        value: "group-todo-01",
        isDone: false,
      },
      {
        value: "group-todo-02",
        isDone: false,
      },
    ],
  },
]

type FormValues = {
  nestedList: {
    isGroup: boolean
    value: string
    isDone: boolean
    list: {
      value: string
      isDone: boolean
    }[]
  }[]
}

function TodoList() {
  const { control, register, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      nestedList: [],
    },
  })
  const name = "nestedList"
  const { fields, append, remove } = useFieldArray({ name, control })

  return (
    <>
      <button
        onClick={() => append({ value: "todo", isDone: false, isGroup: false })}
      >
        Add Todo
      </button>
      <button
        onClick={() =>
          append({
            value: "todoGroup",
            isDone: false,
            isGroup: true,
            list: [{ value: "todo", isDone: false }],
          })
        }
      >
        Add Group
      </button>

      <ol>
        {fields.map((field, index) => (
          <Todo
            key={field.id}
            name={`${name}.${index}`}
            control={control}
            onRemove={() => remove(index)}
            onValuesGet={getValues}
            onRegister={register}
            onValueSet={setValue}
          >
            <SubTodoList
              control={control}
              name={`${name}.${index}`}
              isGroup={field.isGroup}
              onRegister={register}
              onValuesGet={getValues}
              onValueSet={setValue}
            />
          </Todo>
        ))}
      </ol>
    </>
  )
}

function Todo(props: {
  name: `nestedList.${number}`
  control: Control<FormValues>
  onRemove: () => void
  onRegister: UseFormRegister<FormValues>
  onValuesGet: UseFormGetValues<FormValues>
  onValueSet: UseFormSetValue<FormValues>
  children?: ReactElement
}) {
  const {
    name,
    control,
    onRegister,
    onValueSet,
    onValuesGet,
    onRemove,
    children,
  } = props
  const list = useWatch({
    control,
    name: `${name}.list`,
  })

  return (
    <li>
      <input {...onRegister(`${name}.value`)} type="text" />
      <input
        type="checkbox"
        {...onRegister(`${name}.isDone`)}
        onChange={(e) => {
          const nextValue = !onValuesGet(`${name}.isDone`)
          onValueSet(`${name}.isDone`, nextValue)
          list.forEach((_, i) => {
            onValueSet(`${name}.list.${i}.isDone`, nextValue)
          })
        }}
      />
      <button onClick={onRemove}>Delete</button>
      {children}
      <hr />
    </li>
  )
}

function SubTodoList(props: {
  control: Control<FormValues>
  name: `nestedList.${number}`
  isGroup: boolean
  onRegister: UseFormRegister<FormValues>
  onValuesGet: UseFormGetValues<FormValues>
  onValueSet: UseFormSetValue<FormValues>
}) {
  const { control, name, isGroup, onRegister, onValuesGet, onValueSet } = props
  const { fields, append, remove } = useFieldArray({
    name: `${name}.list`,
    control,
  })

  return (
    <>
      {isGroup && (
        <button
          onClick={() => {
            onValueSet(`${name}.isDone`, false)
            append({ value: "todo", isDone: false })
          }}
        >
          Add Todo
        </button>
      )}
      <ol>
        {fields.map((field, index) => (
          <SubTodo
            key={field.id}
            name={`${name}.list.${index}`}
            onRemove={() => remove(index)}
            onRegister={onRegister}
            onValuesGet={onValuesGet}
            onValueSet={onValueSet}
          />
        ))}
      </ol>
    </>
  )
}

function SubTodo(props: {
  name: `nestedList.${number}.list.${number}`
  onRemove: () => void
  onRegister: UseFormRegister<FormValues>
  onValuesGet: UseFormGetValues<FormValues>
  onValueSet: UseFormSetValue<FormValues>
}) {
  const { name, onRemove, onRegister, onValuesGet, onValueSet } = props

  return (
    <li>
      <input {...onRegister(`${name}.value`)} type="text" />
      <input
        type="checkbox"
        {...onRegister(`${name}.isDone`)}
        onChange={() => {}}
      />
      <button onClick={onRemove}>Delete</button>
    </li>
  )
}

export default TodoList
