import { useState } from "react";
import "./Todo.css";
import Nav from "./componant/Nav";
function Todo() {
  const [tasks, setTask] = useState([
    {
      task: "having breakfast",
      des: "do it before 9 pm",
    },
  ]);

  const [newTask, setnewTask] = useState();
  const [newDes, setNewDes] = useState();

  function addTask() {
    if (newTask && newDes) {
      const newtask = {
        task: newTask.task,
        des: newTask.des,
        complete: false,
      };
      console.log(newtask);
      setTask([...tasks, newtask]);
      setnewTask({ task: "", des: "" });
    } else {
      alert("Please fill out both fields.");
    }
  }

  function handleOnchange(event) {
    setnewTask(event.target.value);
  }
  function handleOnchange2(event) {
    setNewDes(event.target.value);
  }

  return (
    <>
    <Nav></Nav>
      <div className="input-Div">
        <label className="input-task">
          Task--
          <input type="text" value={newTask} onChange={handleOnchange} />
        </label>
        <label className="input-task">
          Description--
          <input type="text" value={newDes} onChange={handleOnchange2} />
        </label>
        <button onClick={addTask}>Add</button>
      </div>
      {tasks.map((tasks, index) => (
        <div className="task-Div" key={index}>
          <p>{tasks.task}</p>
          <p>{tasks.des}</p>
        </div>
      ))}
    </>
  );
}
export default Todo;
