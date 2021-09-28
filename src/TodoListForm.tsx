import React from "react"
import {
  Control,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form"

type Todo = {
  value: string
  isDone: boolean
  list: Pick<Todo, "value" | "isDone">[]
}

type TodoListProps = { list: Todo[] }

function TodoListForm() {
  const { register, handleSubmit, control } = useForm<TodoListProps>({
    defaultValues: {
      list: [
        {
          value: "todo",
          isDone: false,
        },
        {
          value: "todo-group",
          isDone: false,
          list: [
            {
              value: "group-todo-01",
              isDone: false,
            },
            {
              value: "group-todo-02",
              isDone: true,
            },
          ],
        },
      ],
    },
  })

  return <TodoList register={register} control={control} />
}

function TodoList(props: {
  register: UseFormRegister<TodoListProps>
  control: Control<TodoListProps>
  parentId?: number
}) {
  const { register, control, parentId } = props
  const { fields, append, remove } = useFieldArray({
    control,
    name: `list`,
  })

  return (
    <>
      <ol>
        {fields.map((field, index) => {
          console.log(parentId, index, field, typeof field.list)
          return (
            <li key={field.id}>
              <input
                {...register(
                  parentId
                    ? `list.${parentId}.list.${index}.value`
                    : `list.${index}.value`
                )}
                type="text"
              />
              <input
                type="checkbox"
                {...register(
                  parentId
                    ? `list.${parentId}.list.${index}.isDone`
                    : `list.${index}.isDone`
                )}
              />
              <button onClick={() => remove(index)}>Delete</button>

              {parentId === undefined && typeof field.list === "object" && (
                <SubTodoList
                  register={register}
                  control={control}
                  parentId={index}
                />
              )}
            </li>
          )
        })}
      </ol>

      <button onClick={() => append({ value: "todo", isDone: true })}>
        Add
      </button>
      {parentId === undefined && (
        <button
          onClick={() =>
            append({
              value: "todoGroup",
              isDone: false,
              list: [{ value: "todo", isDone: false }],
            })
          }
        >
          Add Group
        </button>
      )}
    </>
  )
}

function SubTodoList(props: {
  register: UseFormRegister<TodoListProps>
  control: Control<TodoListProps>
  parentId: number
}) {
  const { register, control, parentId } = props
  const { fields, append, remove } = useFieldArray({
    control,
    name: `list.${parentId}.list`,
  })

  return (
    <>
      <ol>
        {fields.map((field, index) => {
          console.log(parentId, index, field)
          return (
            <li key={field.id}>
              <input
                {...register(`list.${parentId}.list.${index}.value`)}
                type="text"
              />
              <input
                type="checkbox"
                {...register(`list.${parentId}.list.${index}.isDone`)}
              />
              <button onClick={() => remove(index)}>Delete</button>
            </li>
          )
        })}
      </ol>

      <button onClick={() => append({ value: "todo", isDone: true })}>
        Add
      </button>
    </>
  )
}

export default TodoListForm
