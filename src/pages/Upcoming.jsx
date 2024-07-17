import { useEffect, useState } from "react";
import axios from "axios";
import "../style/Upcoming.css";

function Upcoming() {
  const [Tasks, setTasks] = useState([]);
  const [TaskLength, setTaskLenght] = useState(0);
  const [groupedTasks, setGroupedTasks] = useState({
    today: [],
    tomorrow: [],
    other: [],
  });

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = () => {
    axios
      .get("http://localhost:3001/api/")
      .then((response) => {
        console.log(response.data.array);
        const grouped = groupTasksByDate(response.data.array);
        setTasks(response.data.Array);

        console.log("grouped", grouped);
        setGroupedTasks(grouped);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    return `${day}-${month}-${year}`;
  };
  const getTodayDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
  };

  const groupTasksByDate = (Tasks) => {
    console.log(Tasks.length, "from grp");
    setTaskLenght(Tasks.length);
    const today = getTodayDate();
    const tomorrow = getTomorrowDate();

    const groupedTasks = {
      today: [],
      tomorrow: [],
      other: [],
    };

    Tasks.forEach((task) => {
      if (task.date === today) {
        groupedTasks.today.push(task);
      } else if (task.date === tomorrow) {
        groupedTasks.tomorrow.push(task);
      } else {
        groupedTasks.other.push(task);
      }
    });

    return groupedTasks;
  };
  return (
    <div className="Upcoming-main">
      <div className="titleDiv">
        <h3 className="header">Upcoming Task</h3>
        <p className="taskCount">{TaskLength}</p>
      </div>

      <div className="UpcomingTask-Div">
        <div className="TodayTask-div">
          <div className="todayTaskTitle-div">
            <p className="todayTaskTitleName">today</p>
          </div>
          <div className="todayTaskItem-Div">
            {groupedTasks.today.map((task) => (
              <div className="todayTaskItem">
                {task.status == true ? (
                  <p style={{ textDecoration: "line-through" }}>
                    {task.taskDescription}
                  </p>
                ) : (
                  <p>{task.taskDescription}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="TodayTask-div">
          <div className="todayTaskTitle-div">
            <p className="todayTaskTitleName">tomorrow</p>
          </div>
          <div className="todayTaskItem-Div">
            {groupedTasks.tomorrow.map((task) => (
              <div className="todayTaskItem">
                {task.status == true ? (
                  <p style={{ textDecoration: "line-through" }}>
                    {task.taskDescription}
                  </p>
                ) : (
                  <p>{task.taskDescription}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="TodayTask-div">
          <div className="todayTaskTitle-div">
            <p className="todayTaskTitleName">Other</p>
          </div>
          <div className="todayTaskItem-Div">
            {groupedTasks.other.map((task) => (
              <div className="todayTaskItem">
                {task.status == true ? (
                  <p style={{ textDecoration: "line-through" }}>
                    {task.taskDescription}
                  </p>
                ) : (
                  <p>{task.taskDescription}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upcoming;
