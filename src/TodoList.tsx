import React, { useState } from "react"

const initialList = [
  {
    id: "1",
    value: "",
    isDone: false,
    list: [{ id: "1-1", value: "1-1", isDone: false }],
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
]

type Todo = {
  id: string
  value: string
  isDone: boolean
  list: Pick<Todo, "id" | "value" | "isDone">[]
}
let id = 1

function TodoList() {
  const [list, setList] = useState<Todo[]>([])

  const handleGroupAdd = () => {
    const no = id++
    setList((prevList) => [
      ...prevList,
      {
        id: `${no}`,
        value: `第 ${no} 個群組`,
        isDone: false,
        list: [
          {
            id: `${no}-1`,
            value: `${no}-1`,
            isDone: false,
          },
        ],
      },
    ])
  }
  const handleAdd = () => {
    const no = id++
    setList((prevList) => [
      ...prevList,
      {
        id: `${no}`,
        value: ``,
        isDone: false,
        list: [
          {
            id: `${no}-1`,
            value: `${no}-1`,
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
              isDone={item.isDone}
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
              onCheck={() => {
                setList((prevList) => [
                  ...prevList.slice(0, i),
                  {
                    ...prevList[i],
                    isDone: !prevList[i].isDone,
                    list: prevList[i].list.map((todo) => ({
                      ...todo,
                      isDone: !prevList[i].isDone,
                    })),
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
              onTodoAdd={() => {
                const no = id++
                setList((prevList) => {
                  const newList = [
                    ...prevList[i].list,
                    {
                      id: `${prevList[i].id}-${no}`,
                      value: `${prevList[i].id}-${no}`,
                      isDone: false,
                    },
                  ]

                  const newGroup = {
                    ...prevList[i],
                    isDone: false,
                    list: newList,
                  }

                  return [
                    ...prevList.slice(0, i),
                    newGroup,
                    ...prevList.slice(i + 1),
                  ]
                })
              }}
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
                  const newTodoList = prevList[i].list.map((todo) => ({
                    ...todo,
                    isDone:
                      todo.id === targetTodoId ? !todo.isDone : todo.isDone,
                  }))

                  if (checkListDone(newTodoList)) {
                    return [
                      ...prevList.slice(0, i),
                      {
                        ...prevList[i],
                        isDone: true,
                        list: newTodoList,
                      },
                      ...prevList.slice(i + 1),
                    ]
                  }

                  return [
                    ...prevList.slice(0, i),
                    {
                      ...prevList[i],
                      isDone: false,
                      list: newTodoList,
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
            <div>
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
                        isDone: !prevList[i].isDone,
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
            </div>
          )}
          <hr />
        </div>
      ))}

      <button onClick={handleGroupAdd}>新增 Todo Group</button>
      <button onClick={handleAdd}>新增 Todo</button>
    </div>
  )
}

const checkListDone: (
  list: Pick<Todo, "id" | "value" | "isDone">[]
) => boolean = (list) => {
  return list.length === list.filter((todo) => todo.isDone).length
}

function TodoGroup(props: {
  groupName: string
  isDone: boolean
  list: Pick<Todo, "id" | "value" | "isDone">[]
  onChange?: (value: string) => void
  onCheck?: () => void
  onRemove?: () => void
  onTodoAdd?: () => void
  onTodoChange?: (todoId: string, value: string) => void
  onTodoCheck?: (todoId: string) => void
  onTodoRemove?: (todoId: string) => void
}) {
  const {
    groupName,
    isDone,
    list,
    onChange,
    onCheck,
    onRemove,
    onTodoChange,
    onTodoCheck,
    onTodoRemove,
    onTodoAdd,
  } = props

  return (
    <div>
      <h2>
        <input value={groupName} onChange={(e) => onChange?.(e.target.value)} />
        <input type="checkbox" checked={isDone} onChange={onCheck} />
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
    </div>
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
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <input type="checkbox" checked={isDone} onChange={onCheck} />
      <button onClick={onRemove}>delete</button>
    </div>
  )
}

export default TodoList

// 順便了解一下 key 用 index 會有什麼問題？

// 重新 review 一次優化
// 用 react-hook-form 做一次
// 加上 filter 同時還可以順利的新增 todo
