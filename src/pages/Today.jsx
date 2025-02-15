import { useEffect, useState } from "react";
import axios from "axios";
import "../style/Today.css";
import "../style/RenderTaskComp.css"
import "../style/EditTaskComp.css"
import "../style/AddTaskComp.css";
import EditTask from "../componant/tasks/EditTask";
import { getAllTasks } from "../services/taskService";
import RenderTask from "../componant/tasks/RenderTask";
import AddTask from "../componant/AddTask";

function Today({ currUser, navCount }) {
  console.log("today re-renders")
  const [Task, setTask] = useState([]);
  const [render,setRender] = useState(false)
  const [addTask, setAddTask] = useState(false);
  const [editTaskDiv, seteditTaskDiv] = useState(null);
  const [editInputValue, seteditInputValue] = useState("");

  function handleClick() {
    console.log("from btn click");
    if (editTaskDiv !== null) {
      seteditTaskDiv(null);
    }
    setAddTask((prev) => !prev);
  }

  function handleDelete(id) {
    // if(id === "") return
    console.log("handledleete trigger");
    axios.delete(`http://localhost:3000/api/deleteTask/${id}`).then((res) => {
      console.log(res.data, " deleted arry");
      fetchTasks();
    });
  }

  return (
    <div className="today-main">
      <div className="today-left">
        <div className="today-title">
          <h1>Today</h1>
          <h1>{Task.length}</h1>{" "}
        </div>
        <div className="input-div">
          <div id="inpuDiv" className="today-addTask">
            <img src="/assets/plus.png" alt="" width={15} height={15} />
            <button className="styled-button" onClick={handleClick}>
              Add task
            </button>
          </div>
        </div>

        <div style={{ overflowY: "scroll", width: "70%" }}>
          {/* {Task} */}
          <RenderTask
            render={render}
            addTask={addTask}
            setAddTask={setAddTask}
            seteditTaskDiv={seteditTaskDiv}
          />
        </div>
      </div>

      {addTask === true ? <AddTask setRender={setRender} /> : null}

      {editTaskDiv !== null ? (
        <EditTask editTaskDiv={editTaskDiv} setRender={setRender} />
      ) : null}
    </div>
  );
}

export default Today;
