import { useParams } from "react-router-dom";
import "../style/listDetail.css";
import axios from "axios";
import { useEffect, useState } from "react";

function ListDetails() {
  const { item } = useParams();
  const [task, setTask] = useState([]);

  useEffect(() => {
    fetch();
  }, [item]);

  function fetch() {
    axios
      .get(`http://localhost:3000/api/${item}`)
      .then((response) => {
        console.log(response.data);
        setTask(response.data.array || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log(task[0]);
  return (
    <div className="list-main">
      <div className="list-title">
        <h1>{item}</h1>
        <h1>{task.length}</h1>
      </div>
      <div className="list-taskMainDiv">
        {task.map((task) => (
          <Task task={task} />
        ))}
      </div>
    </div>
  );
}

function Task({ task }) {
  return (
    <div className="list-taskDiv">
      <p>{task.taskDescription}</p>
      <p>{task.date}</p>
      <p>subtask: {task.subtask.length}</p>
    </div>
  );
}

export default ListDetails;
