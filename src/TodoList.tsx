import React, { useState } from "react"

type TodoGroup = {
  id: string
  value?: String
  list: Todo[]
}

type Todo = {
  id: string
  value: string
  isDone: boolean
}

function TodoList() {
  const [list, setList] = useState<TodoGroup[]>([
    {
      id: "1",
      list: [{ id: "a", value: "todo-01", isDone: false }],
    },
    {
      id: "2",
      value: "第一個群組",
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
      list: [
        {
          id: "a",
          value: "group-todo-03",
          isDone: false,
        },
        {
          id: "b",
          value: "group-todo-04",
          isDone: false,
        },
      ],
    },
  ])

  const handleAddTodoGroupItem = () => {
    setList((prevList) => [
      ...prevList,
      {
        id: "2",
        value: "第一個群組",
        list: [
          {
            id: "a",
            value: "group-todo-01",
            isDone: false,
          },
        ],
      },
    ])
  }
  const handleAddTodoItem = () => {
    setList((prevList) => [
      ...prevList,
      {
        id: "2",
        list: [
          {
            id: "a",
            value: "group-todo-01",
            isDone: false,
          },
        ],
      },
    ])
  }
  const handleCheckTodoItem = (itemId: string, subItemId: string) => {
    setList((prevList) => {
      const newPrevList = [...prevList]
      const currentIndex = newPrevList.findIndex((item) => (item.id = itemId))
      const currentSubIndex = newPrevList[currentIndex].list.findIndex(
        (subItem) => {
          console.log((subItem.id = subItemId))
          return (subItem.id = subItemId)
        }
      )

      newPrevList[currentIndex].list[currentSubIndex].isDone =
        !newPrevList[currentIndex].list[currentSubIndex].isDone

      return newPrevList
    })
  }
  const handleEditTodoItem = (itemId: string, subItemid: string) => {}
  const handleDeleteTodoItem = (itemId: string, subItemId: string) => {
    setList((prevList) => {
      const currentIndex = prevList.findIndex((item) => item.id === itemId)
      const newItem =
        prevList[currentIndex].list.filter(
          (subItem) => subItem.id !== subItemId
        ).length === 0
          ? []
          : [
              {
                ...prevList[currentIndex],
                list: prevList[currentIndex].list.filter(
                  (subItem) => subItem.id !== subItemId
                ),
              },
            ]

      return [
        ...prevList.slice(0, currentIndex),
        ...newItem,
        ...prevList.slice(currentIndex + 1),
      ]
    })
  }

  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>
          {item.value ? (
            <>
              <h2>{item.value}</h2>
              <ul>
                {item.list.map((todo) => (
                  <li key={todo.id}>
                    <input type="text" value={todo.value} />
                    <input
                      type="checkbox"
                      checked={todo.isDone}
                      onChange={() => handleCheckTodoItem(item.id, todo.id)}
                    />
                    <button
                      onClick={() => handleDeleteTodoItem(item.id, todo.id)}
                    >
                      delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            item.list.map((todo) => (
              <li key={todo.id}>
                <input type="text" value={todo.value} />
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => handleCheckTodoItem(item.id, todo.id)}
                />
                <button onClick={() => handleDeleteTodoItem(item.id, todo.id)}>
                  delete
                </button>
              </li>
            ))
          )}
        </div>
      ))}

      <button onClick={handleAddTodoGroupItem}>新增 Todo Group</button>
      <button onClick={handleAddTodoItem}>新增 Todo</button>
    </div>
  )
}

export default TodoList
