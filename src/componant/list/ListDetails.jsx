import { useParams } from "react-router-dom";
import "../../style/TagDetails.css";
import { getListTask } from "../../services/userStrService";
import { useEffect, useState } from "react";
import { deleteTask } from "../../services/taskService";

function ListDetails() {
  const { item } = useParams();
  const [task, setTask] = useState([]);
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true);
    setTask([]);
    fetch();
  }, [item]);

 async function fetch() {
   if (!item) return; 
   const data = await getListTask(item);
   if(!data){
    alert("failed to fetch tasks")
    setIsLoading(false);
    return
   }
   setTask(data.tasks);
    setIsLoading(false);
  }

   async function deletetask(id) {
     if (!id) return false;
     const res = await deleteTask(id);
     if (!res) {
       alert("failed to delete task");
       return;
     }
     fetch()
     alert("task deleted!!");
   }
  if (isLoading) return <div className="loading-div">loading...</div>
  return (
    <div className="list-main">
      <div className="list-title">
        <h1>{item}</h1>
        <h1>{task.length}</h1>
      </div>
      <div className="list-taskMainDiv">
        {task.map((task) => (
          <Task deletetask={deletetask} task={task} />
        ))}
      </div>
    </div>
  );
}

function Task({ task, deletetask }) {
  return (
    <div key={task.id} className="tag-taskDiv">
      <div className="tag-taskTitleDiv">
        <img
          src={
            task.complete
              ? "https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965625/check-mark_c6inez.png"
              : "https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965625/dry-clean_plr1bl.png"
          }
          alt=""
          width={13}
          height={13}
        />
        <p className="tag-taskTitle">{task.title}</p>
      </div>
      <p className="tag-taskDes">{task.taskDescription}</p>
      <div className="tag-taskDateDiv">
        <img
          src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965624/calendar_s9wgbg.png"
          alt="calenderpng"
          width={15}
        />
        <p className="tag-taskDate">{task.date}</p>
      </div>
      <div className="tag-Btn">
        <button onClick={() => deletetask(task.id)} className="tag-btn">
          delete
        </button>
      </div>
      {/* <img src="/assets/delete.png" width={15} /> */}
    </div>
  );
}

export default ListDetails;
