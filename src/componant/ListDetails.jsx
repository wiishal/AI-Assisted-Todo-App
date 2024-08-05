import { useParams } from "react-router-dom";
import "../style/listDetail.css";
import axios from "axios";
import { useEffect, useState } from "react";

function ListDetails() {
  const { item } = useParams();
  const [task,setTask] = useState([])

  useEffect(() => {
    fetch();
  },[item]);

  function fetch() {
    axios
      .get(`http://localhost:3001/api/${item}`)
      .then((response) => {
        console.log(response.data);
        setTask(response.data.array || [])
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log(task[0])
  return (
    <div>
      <h2>Details for {item}</h2>

      <p>This is the detail view for the {item} list.</p>
      {task.map((task) => (
        <p>{task.taskDescription}</p>
      ))}
    </div>
  );
}

export default ListDetails;
