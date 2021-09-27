import React, { useState } from "react"

type Todo = {
  // 這裡的 type 定義可以再優化嗎
  id: string
  value: string
  isDone: boolean
  list: Pick<Todo, "id" | "value" | "isDone">[]
}
let id = 10
function TodoList() {
  const [list, setList] = useState<Todo[]>([
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
  ])

  const handleAddTodoGroupItem = () => {
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
  const handleAddTodoItem = () => {
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
  const handleCheckTodoItem = (itemId: string, subItemId: string) => {}
  const handleEditTodoItem = (itemId: string, subItemid: string) => {}
  const handleDeleteTodoItem = (itemId: string, subItemId: string) => {}
  const handleDeleteSubTodoItem = (itemId: string, subItemId: string) => {}

  return (
    <div>
      {list.map((item, i) => (
        <div key={item.id}>
          {item.value ? (
            <TodoGroup
              groupName={item.value}
              list={item.list}
              onAddTodoItem={() =>
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
              onEditTodoItem={() => setList((prevList) => prevList)}
            />
          ) : (
            <ul>
              {item.list.map((todo) => (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  value={todo.value}
                  isDone={todo.isDone}
                />
              ))}
            </ul>
          )}
        </div>
      ))}

      <button onClick={handleAddTodoGroupItem}>新增 Todo Group</button>
      <button onClick={handleAddTodoItem}>新增 Todo</button>
    </div>
  )
}

function TodoGroup(props: {
  groupName: string
  list: Pick<Todo, "id" | "value" | "isDone">[]
  onAddTodoItem?: () => void
  onEditTodoItem?: () => void
}) {
  const { groupName, list, onAddTodoItem } = props

  return (
    <>
      <h2>{groupName}</h2>
      <ul>
        {list.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            value={todo.value}
            isDone={todo.isDone}
          />
        ))}
      </ul>
      <button onClick={onAddTodoItem}>新增 Todo</button>
    </>
  )
}

function Todo(props: Pick<Todo, "id" | "value" | "isDone">) {
  const { value, isDone } = props
  return (
    <li>
      <input type="text" value={value} />
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => handleCheckTodoItem(item.id, todo.id)}
      />
      <button onClick={() => handleDeleteTodoItem(item.id, todo.id)}>
        delete
      </button>
    </li>
  )
}

export default TodoList

// 順便了解一下 key 用 index 會有什麼問題？