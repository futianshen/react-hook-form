import React, { ReactElement } from "react"
import {
  Control,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
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
  const form = useForm<FormValues>({
    defaultValues: {
      nestedList: [],
    },
  })
  const { control, getValues, register, setValue } = form
  const name = "nestedList"
  const { fields, append, remove } = useFieldArray({ name, control })

  return (
    <>
      <button
        onClick={() => {
          append({ value: "todo", isDone: false, isGroup: false })
        }}
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
      <FormProvider {...form}>
        <ol>
          {fields.map((field, index) => (
            <Todo
              key={field.id}
              name={`${name}.${index}`}
              control={control}
              onRemove={() => remove(index)}
              onChange={() => {}}
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
      </FormProvider>
    </>
  )
}

function Todo(props: {
  name: `nestedList.${number}`
  control: Control<FormValues>
  onRemove: () => void
  onChange: (value: string) => void
  onRegister: UseFormRegister<FormValues>
  onValuesGet: UseFormGetValues<FormValues>
  onValueSet: UseFormSetValue<FormValues>
  children?: ReactElement
}) {
  const { name, onRegister, onRemove, onValuesGet, onValueSet, children } =
    props

  return (
    <li>
      <input {...onRegister(`${name}.value`)} type="text" />
      <input
        type="checkbox"
        {...onRegister(`${name}.isDone`)}
        onChange={(e) => {
          const { onChange } = onRegister(`${name}.isDone`)
          onChange(e)
          const currentTodo = onValuesGet(name)
          currentTodo.list.forEach((_, i) => {
            onValueSet(`${name}.list.${i}.isDone`, currentTodo.isDone)
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
            parentName={name}
            name={`${name}.list.${index}`}
            onRemove={() => remove(index)}
            onRegister={onRegister}
            onValueSet={onValueSet}
          />
        ))}
      </ol>
    </>
  )
}

function SubTodo(props: {
  parentName: `nestedList.${number}`
  name: `nestedList.${number}.list.${number}`
  onRemove: () => void
  onRegister: UseFormRegister<FormValues>
  onValueSet: UseFormSetValue<FormValues>
}) {
  const { getValues, setValue } = useFormContext<FormValues>()
  const { parentName, name, onRemove, onRegister, onValueSet } = props

  return (
    <li>
      <input {...onRegister(`${name}.value`)} type="text" />
      <input
        type="checkbox"
        {...onRegister(`${name}.isDone`)}
        onChange={(e) => {
          const { onChange } = onRegister(`${name}.isDone`)
          onChange(e)
          const siblings = getValues(`${parentName}.list`)
          if (siblings.every((todo) => todo.isDone)) {
            return setValue(`${parentName}.isDone`, true)
          }
          onValueSet(`${parentName}.isDone`, false)
        }}
      />
      <button onClick={onRemove}>Delete</button>
    </li>
  )
}

export default TodoList
