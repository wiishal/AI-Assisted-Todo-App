import { useState,useEffect } from "react";
import { getAllTasks, toggleStatus,deleteTask } from "../../services/taskService";
export default function RenderTask({
  render,
  setAddTask,
  seteditTaskDiv,
  addTask,
  setRender,
}) {
  const [Task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [render]);

  const fetchTasks = async () => {
    const alltasks = await getAllTasks();

    if (alltasks.tasks) {
      setTask(alltasks.tasks);
      setIsLoading(false);
      return;
    }
    setTask([]);
    setIsLoading(false);
  };

  async function deletetask(id) {
    if (!id) return false;
    const res = await deleteTask(id);
    if (!res) {
      alert("failed to delete task");
      return;
    }
    alert("task deleted!!");
    setRender(prev => !prev)
  }
  function handleEditTask(Id) {

    seteditTaskDiv(Id);
    if (addTask) {
      setAddTask(false);
    }
  }

  if (isLoading) return <div className="loading-div">Loading...</div>;
  return (
    <>
    <h4 className="render-taskCount"> Count : {Task.length}</h4>
      {Task.map((task, i) => (
        <div key={task.id} className="render-main">
          <div className="render-taskDetails">
            <BoxImage i={i} setTask={setTask} task={task} />
            <p>{task.title}</p>
          </div>

          <div className="render-taskdescription">
            <p>{task.taskDescription}</p>
          </div>
          <div className="render-taskstatus">
            <img src="/assets/calendar.png" width={15} alt="calenderpng" />
            <p>{task.date}</p>
          </div>
          <div className="render-Btn">
            <button onClick={() => deletetask(task.id)} className="render-btn">
              delete
            </button>
            <button
              onClick={() => handleEditTask(task.id)}
              className="render-btn"
            >
              edit
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

function BoxImage({ task, setTask, i }) {
  async function checkTask(id, i) {
    if (!id) return;
    const res = await toggleStatus(id);
    if (res) {
      setTask((prev) => {
        const newTasks = [...prev];
        newTasks[i] = { ...newTasks[i], complete: !newTasks[i].complete };
        return newTasks;
      });
      alert("task checked");
      return;
    }
    alert("failed to check");
  }
  return (
    <img
      style={{ cursor: "pointer" }}
      onClick={() => checkTask(task.id, i)}
      src={
        task.complete
          ? "/assets/check-box-with-check-sign.png"
          : "/assets/check-box-empty.png"
      }
      width={15}
      height={15}
      alt="checkboxpng"
    />
  );
}