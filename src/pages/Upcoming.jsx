import { useEffect, useState } from "react";
import axios from "axios";
import "../style/Upcoming.css";

function Upcoming({ navCount }) {
  const [Tasks, setTasks] = useState([]);
  const [TaskLength, setTaskLenght] = useState(0);
  const [groupedTasks, setGroupedTasks] = useState({
    today: [],
    tomorrow: [],
    other: [],
  });
  const [isdiplayTask, setIsDisplayTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = () => {
    axios
      .get("http://localhost:3001/api/")
      .then((response) => {
        console.log(response.data.array);
        const grouped = groupTasksByDate(response.data.array);
        setTasks(response.data.array);

        console.log("grouped", grouped);
        setGroupedTasks(grouped);
        // console.log(groupedTasks.tomorrow.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function displayTask(id) {
    for (let i = 0; i < Tasks.length; i++) {
      if (Tasks[i].taskId === id) {
        setIsDisplayTask(i);
        return;
      }
    }
  }
  const formatDate = (date) => {
    const day = String(date.getDate());
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
    console.log(tomorrow.getDate() + 1, "from tomorrow", tomorrow);
    return formatDate(tomorrow);
  };

  const groupTasksByDate = (Tasks) => {
    // console.log(Tasks.length, "from grp");
    setTaskLenght(Tasks.length);
    const today = getTodayDate();
    const tomorrow = getTomorrowDate();
    console.log(tomorrow, "for each");
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
    navCount((prev) => ({
      ...prev,
      upcoming: groupedTasks.tomorrow.length,
    }));
    console.log(groupedTasks.tomorrow.length);
    return groupedTasks;
  };
  return (
    <div className="Upcoming-main">
      <div className="Upcoming-main-title">
        <h1>Upcoming </h1>
        <h1>{groupedTasks.tomorrow.length}</h1>
      </div>
      <div className="Upcoming-top">
        <p className="Upcoming-titles">Today</p>
        <div className="Upcoming-task-div">
          {groupedTasks.today.map((task) => (
            // <h4>{task.taskDescription}</h4>
            <TaskTemplate task={task} />
          ))}
        </div>
      </div>
      <div className="Upcoming-bottom">
        <div className="Upcoming-bottom-left">
          <p className="Upcoming-titles">Tommorrow</p>
          <div className="Upcoming-task-div">
            {groupedTasks.tomorrow.map((task) => (
              // <h4>{task.taskDescription}</h4>
              <TaskTemplate task={task} />
            ))}
          </div>
        </div>
        <div className="Upcoming-bottom-right">
          <p className="Upcoming-titles">Week</p>
          <div className="Upcoming-task-div">
            {groupedTasks.other.map((task) => (
              // <h4>{task.taskDescription}</h4>
              <TaskTemplate task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskTemplate({ task }) {
  return (
    <div className="Upcoming-task" key={task.taskId}>
      {task.status === false ? (
        <img src="/assets/dry-clean.png" alt="" width={13} height={13} />
      ) : (
        <img src="/assets/check-mark.png" alt="" width={13} height={13} />
      )}

      <div className="Upcoming-task-subdiv">
        {task.status === false ? (
          <p className="Upcoming-task-title">{task.taskDescription}</p>
        ) : (
          <p
            className="Upcoming-task-title"
            style={{ color: "rgb(217, 217, 217)" }} 
          >
            {task.taskDescription}
          </p>
        )}

        <img src="/assets/right-arrow.png" alt="" width={13} height={13} />
      </div>
    </div>
  );
}

export default Upcoming;
