import SelectTags from "../SelectTags";
import { useDate } from "../../hooks/useDate";
import { useState,useEffect } from "react";
import { addTask } from "../../services/taskService";
import List from "../List";
export default function AddTask({ setRender }) {
  const today = useDate();
  const [date, setDate] = useState();
  const [tagStack, setTagStack] = useState([]);
  const [listSelect, setListSelect] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    taskDescription: "",
    date: "",
    list: [],
    tags: [],
  });

  useEffect(() => {
    const today = new Date();
    const taskformattedDate = `${today.getDate()}-${today.getMonth() + 1}-${
      today.getFullYear() % 100
    }`;
    // setTaskformattedDate(taskformattedDate);
  }, []);

  function inputHandler(e, field) {
    setTaskDetails((prev) => ({ ...prev, [field]: e.target.value }));
  }
  function checkInputs(data) {
    const isempty = Object.values(data).some((detail) => detail === "");
    console.log(isempty)
    return isempty;
  }
  async function addtask() {
    const data = { title: taskDetails.title, date: taskDetails.date };
    const isInputEmpty = checkInputs(data);
    if (isInputEmpty) {
      console.log(taskDetails)
      alert("Check title and Date");
      return;
    }
    const res = await addTask({
      ...data,
      taskDescription: taskDetails.taskDescription,
      tags: tagStack,
      list: listSelect,
    });
    if (res) {
      alert("task added successfully");
      setRender(prev => !prev);
      return;
    }
  }

  return (
    <div className="addtask-main">
      <h4>Add</h4>
      <div className="addtask-title">
        <label htmlFor="">Title</label>
        <input
          onChange={(e) => inputHandler(e, "title")}
          value={taskDetails.title}
          className="addtask-titleInput"
        ></input>
      </div>
      <div className="addtask-des">
        <label htmlFor="">Description</label>
        <textarea
          onChange={(e) => inputHandler(e, "taskDescription")}
          value={taskDetails.taskDescription}
          className="addtask-desInput"
        ></textarea>
      </div>
      <div className="addtask-date">
        <label htmlFor="">Date</label>
        <input
          onChange={(e) => inputHandler(e, "date")}
          value={taskDetails.date}
          className="addtask-dateInput"
          type="date"
        ></input>
      </div>
      <List listSelect={listSelect} setListSelect={setListSelect} />
      <SelectTags tagStack={tagStack} setTagStack={setTagStack} />
      <button onClick={addtask}> addtask</button>
    </div>
  );
}