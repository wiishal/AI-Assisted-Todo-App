import { useState } from "react";
import "../style/Today.css";

function Today({ props }) {
  const [Task, setTask] = useState([
    {
      taskid: "1",
      taskDescription: "finsished the project ",
    },
    {
      taskid: "2",
      taskDescription: "finsished the project2 ",
    },
  ]);
  
  
  const [isInputDiv, setisInputDiv] = useState(false);
  const [inputValue, setinputValue] = useState("");
  function handleClick() {
    setisInputDiv((prev) => !prev);
  }
  function inputHandler(e) {
    setinputValue(e.target.value);
  }
  function addtask() {
     if (inputValue === null || inputValue === undefined || inputValue === "") {
       return;
     }
    console.log(inputValue, "its task");
    let taskIdl = Task.length
      let newTask = {
        taskId: taskIdl,
        taskDescription: inputValue,
      };
  
    let prevTask = [...Task]
    prevTask.push(newTask);
    setTask(prevTask)
  }
  return (
    <div className="today-main">
      <div className="today-left">
        <div className="today-title">
          <h1>Today</h1>
          <h1>{props.today}</h1>{" "}
        </div>
        <div className="input-div">
          <div id="inpuDiv" className="today-addTask">
            <img src="/assets/plus.png" alt="" width={15} height={15} />
            <button onClick={handleClick}>Add task</button>
          </div>
        </div>
        <div>{Task.map((task, i)=>
         ( <h4>{task.taskDescription}</h4>)
        )} </div>
      </div>

      {isInputDiv == true ? (
        <div className="today-right">
          <h3 className="inputDiv-title">Add Task</h3>
          <input value={inputValue} onChange={inputHandler} type="text" />
          <div className="button-div">
            <button onClick={addtask} className="inputDiv-btn">
              Add
            </button>
            <button className="inputDiv-btn>AI assisted">AI Assistance </button>
          </div>
          <div className="listSelect-div">
            <p className="list-title">Lists</p>
            <input type="radio" />
          </div>
        </div>
      ) : null}

      {true}
    </div>
  );
}

export default Today;
