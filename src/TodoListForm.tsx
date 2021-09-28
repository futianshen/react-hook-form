import React from "react"
import {
  Control,
  useFieldArray,
  useForm,
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
  const { control, register, setValue } = useForm<FormValues>({
    defaultValues: {
      nestedList: [],
    },
  })

  return (
    <TodoList control={control} onRegister={register} onValueSet={setValue} />
  )
}

function TodoList(props: {
  control: Control<FormValues>
  onRegister: UseFormRegister<FormValues>
  onValueSet: UseFormSetValue<FormValues>
}) {
  const { control, onRegister, onValueSet } = props
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
          <li key={field.id}>
            <input {...onRegister(`nestedList.${index}.value`)} type="text" />
            <input
              type="checkbox"
              {...onRegister(`nestedList.${index}.isDone`)}
            />
            <button onClick={() => remove(index)}>Delete</button>
            <SubTodoList
              control={control}
              parentIndex={index}
              isGroup={field.isGroup}
              onRegister={onRegister}
              onValueSet={onValueSet}
            />
            <hr />
          </li>
        ))}
      </ol>
    </>
  )
}

function SubTodoList(props: {
  control: Control<FormValues>
  parentIndex: number
  isGroup: boolean
  onRegister: UseFormRegister<FormValues>
  onValueSet: UseFormSetValue<FormValues>
}) {
  const { control, parentIndex, isGroup, onRegister, onValueSet } = props
  const isGroupDone = useWatch({
    control,
    name: `nestedList.${parentIndex}`,
  }).isDone
  const { fields, append, remove } = useFieldArray({
    name: `nestedList.${parentIndex}.list`,
    control,
  })

  return (
    <>
      {isGroup && (
        <button onClick={() => append({ value: "todo", isDone: false })}>
          Add Todo
        </button>
      )}
      <ol>
        {fields.map((field, index) => (
          <li key={field.id}>
            <input
              {...onRegister(`nestedList.${parentIndex}.list.${index}.value`)}
              type="text"
            />
            <input
              type="checkbox"
              {...onRegister(`nestedList.${parentIndex}.list.${index}.isDone`)}
            />
            <button onClick={() => remove(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </>
  )
}

export default TodoListForm
