import { useState, useEffect } from "react";
import "../style/calender.css";
import axios from "axios";

function Calender() {
  const [date, setDate] = useState();
  const [formattedDate, setTaskformattedDate] = useState();
  const [filterTasks, setFilterTask] = useState([]);
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTask();
    // const formatedDate = getformateDate();
    setTaskformattedDate(getformateDate());
    console.log(filterTasks)
    filterTask();
  }, []);
  const fetchTask = () => {
    axios
      .get("http://localhost:3001/api/")
      .then((response) => {
        console.log(response.data.array);
        setTasks(response.data.array);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function filterTask(formateDate) {
    
    let task = [...Tasks].filter((task)=> task.date == formateDate);
    
  }
  function getformateDate(date) {
    const today = date ? new Date(date) : new Date();
    console.log(today, " from formated date function ");
    // const today = new Date(date);
    const taskformattedDate = `${today.getDate()}-${today.getMonth() + 1}-${
      today.getFullYear() % 100
    }`;
    console.log(taskformattedDate, " formated date from formated function ");
    return taskformattedDate;
  }

  function handleDateChange(e) {
    setDate(e.target.value);
    const formateDate = getformateDate(e.target.value);
    console.log(formateDate, " formated date");
    setTaskformattedDate(formateDate);
    filterTask(formateDate);
  }

  return (
    <div className="main-Calender">
      <div className="title-div">
        <h1 className="title-calender">Calender </h1>
      </div>
      <input
        onChange={handleDateChange}
        className="date-input"
        type="date"
        value={date}
      />
      <div>
        {filterTasks.length === 0 ? (
          <div key="renderDiv">
            {Tasks.map((task, i) => (
              <RenderTask key={i} task={task}  />
            ))}
          </div>
        ) : (
          <div>
            {filterTasks.map((task, i) => (
              <RenderTask key={i} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function RenderTask({task }){

  return (
    <div >
      <p>{task.taskDescription}</p>
      <p>{task.date}</p>
    </div>
  );
}
export default Calender;
