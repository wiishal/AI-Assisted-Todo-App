import { useState,useEffect } from "react";
import { getAllTasks } from "../../services/taskService";
export default function RenderTask({
render,
  setAddTask,
  seteditTaskDiv,
  addTask,
}) {
    const [Task, setTask] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchTasks();
  }, [render]);
  
    const fetchTasks = async () => {
      console.log("fetch task trigger");
      const alltasks = await getAllTasks();
      console.log(alltasks.tasks);
  
      if(alltasks.tasks){
        setTask(alltasks.tasks);
        setIsLoading(false);
        return
      }
      setTask([])
      setIsLoading(false);
    };
  function checkTask(id) {
    axios
      .post("http://localhost:3000/api/checkTask", {
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        fetchTasks();
      });
  }

  function handleEditTask(Id) {
    console.log("task selected", Id);

    seteditTaskDiv(Id);
    if (addTask) {
      setAddTask(false);
    }
  }

  if(isLoading) return <div className="loading-div">Loading...</div>
  return (
    <>
      {Task.map((task, i) => (
        <div
          key={task.id}
          className="render-main"
          onClick={() => handleEditTask(task.id)}
        >
          <div className="render-taskDetails">
            {task.complete === false ? (
              <img
                src="/assets/check-box-empty.png"
                width={15}
                height={15}
                alt="checkboxpng"
              />
            ) : (
              <img
                src="/assets/check-box-with-check-sign.png"
                width={15}
                height={15}
                alt="checkboxpng"
              />
            )}

            <p>{task.title}</p>
          </div>

          <div className="render-taskdescription">
            <p>{task.taskDescription}</p>
          </div>
          <div className="render-taskstatus">
            <img src="/assets/calendar.png" width={15} alt="calenderpng" />
            <p>{task.date}</p>
          </div>
        </div>
      ))}
    </>
  );
}