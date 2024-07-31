import { useEffect, useState } from "react";
import axios from "axios";
import "../style/Today.css";
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

function Today({ currUser, navCount }) {
  const [Task, setTask] = useState([]);

  const [isInputDiv, setisInputDiv] = useState(false);
  const [editTaskDiv, seteditTaskDiv] = useState(null);
  const [inputValue, setinputValue] = useState("");
  const [date, setDate] = useState();
  const [taskformattedDate, setTaskformattedDate] = useState();
  const [editInputValue, seteditInputValue] = useState("");
  const [aiResult, setAiResult] = useState([]);
  const [subtaskInput, setSubTaskInput] = useState();

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so we add 1 and pad with '0' if necessary
    const day = String(today.getDate()).padStart(2, "0"); // Pads the day with '0' if necessary
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);

    const taskformattedDate = `${today.getDate()}-${today.getMonth() + 1}-${
      today.getFullYear() % 100
    }`;
    setTaskformattedDate(taskformattedDate);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    console.log("fetch task trigger")
    axios
      .get("http://localhost:3001/api/")
      .then((response) => {
        console.log(response.data);
        setTask(response.data.array);
        
        navCount((prevCount) => ({
          ...prevCount, // spread the existing state
          today: response.data.array.length // update the 'today' property
        }));

      })
      .catch((error) => {
        console.log(error);
      });
  };
  function handleClick() {
    if (editTaskDiv !== null) {
      seteditTaskDiv(null);
    }
    setisInputDiv((prev) => !prev);
  }

  function inputHandler(e) {
    setinputValue(e.target.value);
  }

  function editInputHandler(e) {
    seteditInputValue(e.target.value);
  }
  function subTaskInputHandler(e) {
    setSubTaskInput(e.target.value);
  }

  function handleDate(e) {
    const today = new Date(e.target.value);
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${
      today.getFullYear() % 100
    }`;
    console.log(formattedDate);
    setTaskformattedDate(formattedDate);
    setDate(e.target.value);
  }

  function addAiResult(result) {
    setinputValue(result);
  }

  //add task
  function addtask() {
    if (
      inputValue === null ||
      inputValue === undefined ||
      inputValue === "" ||
      date === ""
    ) {
      return;
    }
    console.log(inputValue, "its task");
    let taskIdl = Math.random();
    let newTask = {
      taskId: taskIdl,
      taskDescription: inputValue,
      date: taskformattedDate,
      subtask: [],
      status: false,
    };

    console.log(newTask);
    axios
      .post("http://localhost:3001/api/addtask", {
        task: newTask,
      })
      .then((res) => {
        console.log(res);
        setAiResult([]);
        setinputValue("");
        fetchTasks();
      });
  }

  //edit task
  function addEdittask(id) {
    console.log(id, " id from edit");
    axios
      .post("http://localhost:3001/api/update", {
        id: id,
        editValue: editInputValue,
      })
      .then((res) => {
        console.log(res);

        fetchTasks();
      });
  }

  function handleEditTask(Id) {
    console.log("task selected", Id);
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].taskId == Id) {
        seteditInputValue(Task[i].taskDescription);
        seteditTaskDiv(i);
      }
    }
    if (isInputDiv) {
      setisInputDiv(false);
    }
  }

  // add subtask
  function addSubTask(id) {
    if (subtaskInput == "") return;
    console.log(id);

    const newSubtask = {
      text: subtaskInput,
      status: false,
    };
    axios
      .post("http://localhost:3001/api/addSubTask", {
        id: id,
        subtask: newSubtask,
      })
      .then((res) => {
        console.log(res.data);
        fetchTasks();
      });

    setSubTaskInput("");
  }

  //check task
  function checkTask(id) {
    axios
      .post("http://localhost:3001/api/checkTask", {
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        fetchTasks();
      });
  }

  //check sub task
  function checkSubTask(id, i) {
    axios
      .post("http://localhost:3001/api/checkSubTask", {
        id: id,
        index: i,
      })
      .then((res) => {
        console.log(res.data);
        fetchTasks();
      });
  }

  const parseTextToArray = (text) => {
    return text.split("\n").map((item) => item.replace(/^\d+\.\s*"|"$/g, ""));
  };
  //ai call
  async function generatePrompt() {
    const apiUrl = import.meta.env.VITE_API_KEY;
    const genAI = new GoogleGenerativeAI(apiUrl);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `create multiple todos task for this text -->${inputValue}. don't include time , status just return serially like 1."xyz" note:dont add any extra thing just return 1."xyz"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let task = parseTextToArray(text);
    setAiResult(task);
    console.log(aiResult);
  }
  function handleDelete(id){
    // if(id === "") return
    console.log("handledleete trigger")
    axios
      .delete(`http://localhost:3001/api/delete-todo/${id}`)
      .then((res) => {
        console.log(res.data, " deleted arry");
        fetchTasks();
      });
  }

  return (
    <div className="today-main">
      <div className="today-left">
        <div className="today-title">
          <h1>Today</h1>
          <h1>{Task.length}</h1>{" "}
        </div>
        <div className="input-div">
          <div id="inpuDiv" className="today-addTask">
            <img src="/assets/plus.png" alt="" width={15} height={15} />
            <button className="styled-button" onClick={handleClick}>
              Add task
            </button>
          </div>
        </div>
        <div style={{ overflowY: "scroll", width: "70%" }}>
          {Task.map((task, i) => (
            <div
              key={task.taskId}
              style={{
                borderBottom: "2px solid rgb(230,230,230)",
                color: "black",
                padding: "0.5rem",
                margin: "3px",

                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "1em",
                  }}
                >
                  <div
                    onClick={() => checkTask(task.taskId)}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
                    {task.status === false ? (
                      <img
                        src="/assets/check-box-empty.png"
                        alt=""
                        width={14}
                        height={15}
                      />
                    ) : (
                      <img
                        src="/assets/check-box-with-check-sign.png"
                        alt=""
                        width={14}
                        height={14}
                      />
                    )}
                  </div>
                  <p
                    style={{ alignContent: "center", cursor: "pointer" }}
                    onClick={() => {
                      handleEditTask(task.taskId);
                    }}
                  >
                    {task.taskDescription}{" "}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "fit-content",
                  }}
                >
                  <img
                    src="/assets/schedule.png"
                    alt=""
                    width={15}
                    height={15}
                  />
                  <p style={{ fontSize: "0.6rem" }}> {task.date}</p>
                  <p
                    onClick={() => {
                      handleEditTask(task.taskId);
                    }}
                    style={{
                      fontSize: "0.8rem",
                      padding: "0.5rem",
                      marginLeft: "1em",
                      cursor: "pointer",
                    }}
                  >
                    {task.subtask.length} Subtask
                  </p>
                  <img onClick={()=>{
                    handleDelete(task.taskId)
                  }} style={{cursor:"pointer", marginLeft:"1rem"}}
                    src="/assets/delete.png"
                    alt=""
                    width={15}
                    height={15}
                  />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/assets/fast-forward-double-right-arrows-symbol.png"
                  alt=""
                  width={10}
                  height={10}
                />
              </div>
            </div>
          ))}{" "}
        </div>
      </div>

      {isInputDiv === true ? (
        <div className="today-right">
          <h3 className="inputDiv-title">Add Task</h3>
          <textarea
            style={{ width: "15rem", height: "5rem" }}
            value={inputValue}
            onChange={inputHandler}
            type="text"
          />
          <div className="button-div">
            <button onClick={addtask} className="styled-button">
              Add
            </button>
            <button onClick={generatePrompt} className="styled-button">
              AI Assistance{" "}
            </button>
            <button className="styled-button" onClick={() => setAiResult([])}>
              Clear
            </button>
          </div>
          <div className="result-Ai">
            {aiResult.map((text, i) => (
              <p
                style={{
                  marigin: "2px",
                  color: "rgb(177, 177, 177)",
                  fontSize: "0.81em",
                  cursor: "pointer",
                }}
                onClick={() => addAiResult(text)}
                key={i}
              >
                {text}{" "}
              </p>
            ))}
          </div>

          <div>
            <input type="date" onChange={handleDate} value={date} />
          </div>
          <div className="listSelect-div">
            <p className="list-title">Lists</p>
            <div>
              <p
                style={{
                  fontSize: "0.8rem",
                  padding: "0.5rem",
                  marginLeft: "1em",
                }}
              >
                O Personal
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {editTaskDiv !== null ? (
        <div className="today-edit">
          {Task[editTaskDiv].taskId}
          <h3 className="inputDiv-title">Task</h3>
          <textarea
            style={{ width: "15rem", height: "5rem" }}
            value={editInputValue}
            onChange={editInputHandler}
            type="text"
          />
          <div className="button-div">
            <button
              className="styled-button"
              onClick={() => addEdittask(editTaskDiv)}
            >
              edit
            </button>
            <button className="styled-button">AI Assistance </button>
            <button
              className="styled-button"
              onClick={() => seteditTaskDiv(null)}
            >
              Cancle
            </button>
          </div>

          <div className="listSelect-div">
            <p className="list-title">Lists</p>
            <div>
              <p
                style={{
                  fontSize: "0.8rem",
                  padding: "0.5rem",
                  marginLeft: "1em",
                }}
              >
                Personal
              </p>
            </div>
          </div>
          <div className="addsubTask">
            <p>Sub Task</p>
            <input
              type="text"
              value={subtaskInput}
              onChange={subTaskInputHandler}
              name=""
              id=""
            />
            <button
              className="styled-button"
              onClick={() => addSubTask(Task[editTaskDiv].taskId)}
            >
              Add
            </button>
            {Task[editTaskDiv].subtask.map((task, i) => (
              <div
                onClick={() => checkSubTask(Task[editTaskDiv].taskId, i)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: "fit-content",
                  gap: "5px",
                }}
              >
                {task.status === false ? (
                  <img
                    src="/assets/check-box-empty.png"
                    alt=""
                    width={14}
                    height={14}
                  />
                ) : (
                  <img
                    src="/assets/check-box-with-check-sign.png"
                    alt=""
                    width={14}
                    height={14}
                  />
                )}

                <p
                  style={{
                    marigin: "2px",
                    color: "rgb(100, 100, 100)",
                    fontSize: "0.8em",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                  key={i}
                >
                  {task.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Today;
