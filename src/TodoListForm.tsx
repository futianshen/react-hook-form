import React, { ReactElement, useEffect } from "react"
import {
  Control,
  useFieldArray,
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
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

function TodoListForm() {
  const { control, register, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      nestedList: [],
    },
  })

  return (
    <TodoList
      control={control}
      onRegister={register}
      onValuesGet={getValues}
      onValueSet={setValue}
    />
  )
}

function TodoList(props: {
  control: Control<FormValues>
  onRegister: UseFormRegister<FormValues>
  onValuesGet: UseFormGetValues<FormValues>
  onValueSet: UseFormSetValue<FormValues>
}) {
  const { control, onRegister, onValueSet, onValuesGet } = props
  const { fields, append, remove } = useFieldArray({
    name: "nestedList",
    control,
  })

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
            parentIndex={index}
            isGroup={field.isGroup}
            control={control}
            onRemove={() => remove(index)}
            onValuesGet={onValuesGet}
            onRegister={onRegister}
            onValueSet={onValueSet}
          >
            <SubTodoList
              control={control}
              parentIndex={index}
              isGroup={field.isGroup}
              onRegister={onRegister}
              onValuesGet={onValuesGet}
              onValueSet={onValueSet}
            />
          </Todo>
        ))}
      </ol>
    </>
  )
}

function Todo(props: {
  parentIndex: number
  isGroup: boolean
  control: Control<FormValues>
  onRemove: () => void
  onRegister: UseFormRegister<FormValues>
  onValuesGet: UseFormGetValues<FormValues>
  onValueSet: UseFormSetValue<FormValues>
  children?: ReactElement
}) {
  const {
    parentIndex,
    control,
    onRegister,
    onValueSet,
    onValuesGet,
    onRemove,
    children,
  } = props
  const list = useWatch({
    control,
    name: `nestedList.${parentIndex}.list`,
  })

  return (
    <li>
      <input {...onRegister(`nestedList.${parentIndex}.value`)} type="text" />
      <input
        type="checkbox"
        {...onRegister(`nestedList.${parentIndex}.isDone`)}
        onChange={(e) => {
          const nextValue = !onValuesGet(`nestedList.${parentIndex}.isDone`)
          onValueSet(`nestedList.${parentIndex}.isDone`, nextValue)
          list.forEach((_, i) => {
            onValueSet(`nestedList.${parentIndex}.list.${i}.isDone`, nextValue)
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
  parentIndex: number
  isGroup: boolean
  onRegister: UseFormRegister<FormValues>
  onValuesGet: UseFormGetValues<FormValues>
  onValueSet: UseFormSetValue<FormValues>
}) {
  const { control, parentIndex, isGroup, onRegister, onValuesGet, onValueSet } =
    props
  const { fields, append, remove } = useFieldArray({
    name: `nestedList.${parentIndex}.list`,
    control,
  })

  return (
    <>
      {isGroup && (
        <button
          onClick={() => {
            onValueSet(`nestedList.${parentIndex}.isDone`, false)
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
            parentIndex={parentIndex}
            index={index}
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
  parentIndex: number
  index: number
  onRemove: () => void
  onRegister: UseFormRegister<FormValues>
  onValuesGet: UseFormGetValues<FormValues>
  onValueSet: UseFormSetValue<FormValues>
}) {
  const { parentIndex, index, onRemove, onRegister, onValuesGet, onValueSet } =
    props

  return (
    <li>
      <input
        {...onRegister(`nestedList.${parentIndex}.list.${index}.value`)}
        type="text"
      />
      <input
        type="checkbox"
        {...onRegister(`nestedList.${parentIndex}.list.${index}.isDone`)}
        onChange={() => {}}
      />
      <button onClick={onRemove}>Delete</button>
    </li>
  )
}

export default TodoListForm
