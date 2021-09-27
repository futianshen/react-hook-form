import React, { useState } from "react"

type Todo = {
  id: string
  value: string
  isDone: boolean
  list?: Todo[]
}

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
    // setList((prevList) => [
    //   ...prevList,
    //   {
    //     id: "2",
    //     value: "第一個群組",
    //     list: [
    //       {
    //         id: "a",
    //         value: "group-todo-01",
    //         isDone: false,
    //       },
    //     ],
    //   },
    // ])
  }
  const handleAddTodoItem = () => {
    // setList((prevList) => [
    //   ...prevList,
    //   {
    //     id: "2",
    //     list: [
    //       {
    //         id: "a",
    //         value: "group-todo-01",
    //         isDone: false,
    //       },
    //     ],
    //   },
    // ])
  }
  const handleCheckTodoItem = (itemId: string, subItemId: string) => {}
  const handleEditTodoItem = (itemId: string, subItemid: string) => {}
  const handleDeleteTodoItem = (itemId: string, subItemId: string) => {}

  const a = typeof list

  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>
          {item ? (
            <TodoGroup groupName={item.value} list={item.list} />
          ) : typeof item.value === "undefined" ? (
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
          ) : null}
        </div>
      ))}

      <button onClick={handleAddTodoGroupItem}>新增 Todo Group</button>
      <button onClick={handleAddTodoItem}>新增 Todo</button>
    </div>
  )
}

function TodoGroup(props: { groupName: string; list: Todo[] }) {
  const { groupName, list } = props
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
    </>
  )
}

function Todo(props: Todo) {
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
