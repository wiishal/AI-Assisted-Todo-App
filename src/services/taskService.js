const url = import.meta.env.VITE_API_URL;
import axios from "axios";

export async function getAllTasks() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const res = await axios.get(`${url}/api/v1/task/allTasks`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while getting tasks", error);
    return false;
  }
}

export async function getTask(id) {
  const token = localStorage.getItem("token");
  console.log("from gettask : ", id);
  if (!token) {
    return false;
  }
  try {
    const res = await axios.get(`${url}/api/v1/task/getTask/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while getting task", error);
    return false;
  }
}

export async function addTask(task) {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }
  try {
    const res = await axios.post(
      `${url}/api/v1/task/addTask`,
      { task },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while adding task", error);
    return false;
  }
}
export async function updateTask(updatedTask) {
  const token = localStorage.getItem("token");
  console.log("from addTask : ", updatedTask);
  if (!token) {
    return false;
  }
  try {
    const res = await axios.put(
      `${url}/api/v1/task/updateTask`,
      { updatedTask },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 200) {
      return false;
    }
    return res;
  } catch (error) {
    console.log("error while updating task", error);
    return false;
  }
}
export async function toggleStatus(id) {
  const token = localStorage.getItem("token");
  console.log("from check : ", id);
  if (!token) {
    return false;
  }
  try {
    const res = await axios.put(
      `${url}/api/v1/task/toggleStatus`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 200) {
      return false;
    }
    return res;
  } catch (error) {
    console.log("error while updating task", error);
    return false;
  }
}

export async function deleteTask(id) {
  const token = localStorage.getItem("token");
  console.log("from gettask : ", id);
  if (!token) {
    return false;
  }
  try {
    const res = await axios.delete(`${url}/api/v1/task/deleteTask/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while deleting task", error);
    return false;
  }
}
