import { useParams } from "react-router-dom";
import "../../style/TagDetails.css"
import { useEffect, useState } from "react";
import { getTagTask } from "../../services/userStrService";

function TagDetails() {
  const { tag } = useParams();
  const [task, setTask] = useState([]);
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    setTask([])
    fetch();
  }, [tag]);

 async function fetch() {
   if(!tag) return 
   const data = await getTagTask(tag)
   console.log(data)
   if(!data){
    alert("failed to fetch tasks")
    setTask()
    setIsLoading(false);
    return
   }
   setTask(data.tasks);
    setIsLoading(false);
  }
  if (isLoading) return <div className="loading-div">loading...</div>
    return (
      <div className="list-main">
        <div className="list-title">
          <h1>{tag}</h1>
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
    <div key={task.id} className="tag-taskDiv">
      <div className="tag-taskTitleDiv">
        <img
          src={
            !task.complete ? "/assets/check-mark.png" : "/assets/dry-clean.png"
          }
          alt=""
          width={13}
          height={13}
        />
        <p className="tag-taskTitle">{task.title}</p>
      </div>
      <p className="tag-taskDes">{task.taskDescription}</p>
      <div className="tag-taskDateDiv">
        <img src="/assets/calendar.png" alt="calenderpng" width={15} />
        <p className="tag-taskDate">{task.date}</p>
      </div>
      {/* <img src="/assets/delete.png" width={15} /> */}
    </div>
  );
}

export default TagDetails;
