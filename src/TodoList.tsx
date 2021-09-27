import React, { useState } from "react"

type Todo = {
  // 這裡的 type 定義可以再優化嗎
  id: string
  value: string
  isDone: boolean
  list: Pick<Todo, "id" | "value" | "isDone">[]
}
let id = 10

const initialList = [
  {
    id: "1",
    value: "",
    isDone: false,
    list: [{ id: "a", value: "todo-01", isDone: false }],
  },
  {
    id: "2",
    value: "第一個群組",
    isDone: false,
    list: [
      {
        id: "a",
        value: "group-todo-01",
        isDone: false,
      },
      {
        id: "b",
        value: "group-todo-02",
        isDone: false,
      },
    ],
  },
  {
    id: "3",
    value: "第二個群組",
    isDone: false,
    list: [
      {
        id: "a",
        value: "group-todo-01",
        isDone: false,
      },
      {
        id: "b",
        value: "group-todo-02",
        isDone: false,
      },
    ],
  },
]
function TodoList() {
  const [list, setList] = useState<Todo[]>(initialList)

  const handleGroupAdd = () => {
    setList((prevList) => [
      ...prevList,
      {
        id: `${id}`,
        value: `第 ${id} 個群組`,
        isDone: false,
        list: [
          {
            id: `${id}-1`,
            value: "group-todo-01",
            isDone: false,
          },
        ],
      },
    ])
  }
  const handleAdd = () => {
    setList((prevList) => [
      ...prevList,
      {
        id: `${id}`,
        value: "",
        isDone: false,
        list: [
          {
            id: `${id}-1`,
            value: "group-todo-01",
            isDone: false,
          },
        ],
      },
    ])
  }

  return (
    <div>
      {list.map((item, i) => (
        <div key={item.id}>
          {item.value ? (
            <TodoGroup
              groupName={item.value}
              list={item.list}
              onChange={(value) => {
                setList((prevList) => [
                  ...prevList.slice(0, i),
                  {
                    ...prevList[i],
                    value,
                  },
                  ...prevList.slice(i + 1),
                ])
              }}
              onRemove={() =>
                setList((prevList) => [
                  ...prevList.slice(0, i),
                  ...prevList.slice(i + 1),
                ])
              }
              onTodoAdd={() =>
                setList((prevList) => {
                  const newGroup = {
                    ...prevList[i],
                    list: [
                      ...prevList[i].list,
                      {
                        id: `${prevList[i].id}-${prevList[i].list.length + 1}`,
                        value: `group-todo-${prevList[i].list.length + 1}`,
                        isDone: false,
                      },
                    ],
                  }

                  return [
                    ...prevList.slice(0, i),
                    newGroup,
                    ...prevList.slice(i + 1),
                  ]
                })
              }
              onTodoChange={(targetTodoId, newValue) =>
                setList((prevList) => {
                  return [
                    ...prevList.slice(0, i),
                    {
                      ...prevList[i],
                      list: prevList[i].list.map((todo) => ({
                        ...todo,
                        value: todo.id === targetTodoId ? newValue : todo.value,
                      })),
                    },
                    ...prevList.slice(i + 1),
                  ]
                })
              }
              onTodoCheck={(targetTodoId) =>
                setList((prevList) => {
                  return [
                    ...prevList.slice(0, i),
                    {
                      ...prevList[i],
                      list: prevList[i].list.map((todo) => ({
                        ...todo,
                        isDone:
                          todo.id === targetTodoId ? !todo.isDone : todo.isDone,
                      })),
                    },
                    ...prevList.slice(i + 1),
                  ]
                })
              }
              onTodoRemove={(targetTodoId) =>
                setList((prevList) => [
                  ...prevList.slice(0, i),
                  {
                    ...prevList[i],
                    list: prevList[i].list.filter(
                      (todo) => todo.id !== targetTodoId
                    ),
                  },
                  ...prevList.slice(i + 1),
                ])
              }
            />
          ) : (
            <ul>
              {item.list.map((todo) => (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  value={todo.value}
                  isDone={todo.isDone}
                  onChange={(value) => {
                    setList((prevList) => [
                      ...prevList.slice(0, i),
                      {
                        ...prevList[i],
                        list: prevList[i].list.map((currentTodo) => ({
                          ...currentTodo,
                          value:
                            currentTodo.id === todo.id
                              ? value
                              : currentTodo.value,
                        })),
                      },
                      ...prevList.slice(i + 1),
                    ])
                  }}
                  onCheck={() => {
                    setList((prevList) => [
                      ...prevList.slice(0, i),
                      {
                        ...prevList[i],
                        list: prevList[i].list.map((currentTodo) => ({
                          ...currentTodo,
                          isDone:
                            currentTodo.id === todo.id
                              ? !currentTodo.isDone
                              : currentTodo.isDone,
                        })),
                      },
                      ...prevList.slice(i + 1),
                    ])
                  }}
                  onRemove={() => {
                    setList((prevList) => [
                      ...prevList.slice(0, i),
                      {
                        ...prevList[i],
                        list: prevList[i].list.filter(
                          (currentTodo) => currentTodo.id !== todo.id
                        ),
                      },
                      ...prevList.slice(i + 1),
                    ])
                  }}
                />
              ))}
            </ul>
          )}
        </div>
      ))}

      <button onClick={handleGroupAdd}>新增 Todo Group</button>
      <button onClick={handleAdd}>新增 Todo</button>
    </div>
  )
}

function TodoGroup(props: {
  groupName: string
  list: Pick<Todo, "id" | "value" | "isDone">[]
  onChange?: (value: string) => void
  onRemove?: () => void
  onTodoAdd?: () => void
  onTodoChange?: (todoId: string, value: string) => void
  onTodoCheck?: (todoId: string) => void
  onTodoRemove?: (todoId: string) => void
}) {
  const {
    groupName,
    list,
    onChange,
    onRemove,
    onTodoChange,
    onTodoCheck,
    onTodoRemove,
    onTodoAdd,
  } = props

  return (
    <>
      <h2>
        <input value={groupName} onChange={(e) => onChange?.(e.target.value)} />
        <button onClick={onRemove}>刪除群組</button>
      </h2>
      <ul>
        {list.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            value={todo.value}
            isDone={todo.isDone}
            onChange={(value) => onTodoChange?.(todo.id, value)}
            onCheck={() => onTodoCheck?.(todo.id)}
            onRemove={() => onTodoRemove?.(todo.id)}
          />
        ))}
      </ul>
      <button onClick={onTodoAdd}>新增 Todo</button>
    </>
  )
}

function Todo(
  props: Pick<Todo, "id" | "value" | "isDone"> & {
    onChange?: (value: string) => void
    onCheck?: () => void
    onRemove?: () => void
  }
) {
  const { value, isDone, onChange, onCheck, onRemove } = props
  return (
    <li>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <input type="checkbox" checked={isDone} onChange={onCheck} />
      <button onClick={onRemove}>delete</button>
    </li>
  )
}

export default TodoList

// 順便了解一下 key 用 index 會有什麼問題？
