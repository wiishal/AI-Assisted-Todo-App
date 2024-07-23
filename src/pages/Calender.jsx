import { useState, useEffect } from "react";
import "../style/calender.css";
import axios from "axios";

function Calender() {
  const [date, setDate] = useState();
  const [formattedDate, setTaskformattedDate] = useState();

  const [Tasks, setTasks] = useState([]);
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so we add 1 and pad with '0' if necessary
    const day = String(today.getDate()).padStart(2, "0"); // Pads the day with '0' if necessary
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    fetchTask();
    // displayTask();
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
  function displayTask(e) {
    setDate(e.target.value)
    const today = new Date()
    const taskformattedDate = `${today.getDate()}-${today.getMonth() + 1}-${
      today.getFullYear() % 100
    }`;
    setTaskformattedDate(taskformattedDate);
    console.log(formattedDate)
    
  }

  return (
    <div className="main-Calender">
      <div className="title-div">
        <h1 className="title-calender">Calender </h1>
      </div>
      <input
        onChange={displayTask}
        className="date-input"
        type="date"
        value={date}
      />
    </div>
  );
}

export default Calender;
