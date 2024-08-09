import { useState } from "react"
import axios from 'axios'
import AddSubTask from "./AddSubTask";
function EditTask({
  Task,
  editTaskDiv,
  fetchTasks,
  editInputValue,
  seteditInputValue
}) {
  function editInputHandler(e) {
    seteditInputValue(e.target.value);
  }

  function addEdittask(id) {
    console.log(id, " id from edit");
    try {
      axios
        .post("http://localhost:3001/api/update", {
          id: id,
          editValue: editInputValue,
        })
        .then((res) => {
          console.log(res);

          fetchTasks();
        });
    } catch (error) {
      console.log("somethings issue acured while editing task")
    }
    
  }

  return (
    <div className="today-edit">
      {/* {Task[editTaskDiv].taskId} */}
      <h3 className="inputDiv-title">Task</h3>
      <textarea
        style={{ width: "15rem", height: "5rem" }}
        value={editInputValue}
        onChange={editInputHandler}
        type="text"
      />
      <div>
        <button
          className="styled-button"
          onClick={() => addEdittask(editTaskDiv)}
        >
          Save
        </button>
      </div>
      <div className="listSelect-div">
        <p className="listSelect-title">Lists :</p>
        <div>
          <p
            style={{
              fontSize: "0.8rem",
              padding: "0.5rem",
              marginLeft: "1em",
              textTransform: "capitalize",
              fontWeight: "600",
            }}
          >
            {Task[editTaskDiv].list ? Task[editTaskDiv].list : "none"}
          </p>
        </div>
      </div>
      <AddSubTask
        Task={Task}
        editTaskDiv={editTaskDiv}
        fetchTasks={fetchTasks}
      />
    </div>
  );
}

export default EditTask