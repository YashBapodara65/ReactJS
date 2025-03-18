import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Dashboard() {
  // console.log(auth.currentUser);

  const [uid, setUid] = useState(null);
  const [record, setRecord] = useState("");
  const navigate = useNavigate();

  const [formTask, setFormTask] = useState({
    task: "",
    priority: "",
  });

  const [taskData, setTaskData] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    let subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, []);

  // console.log(uid);

  useEffect(() => {
    if (uid) {
      fetchUser();
      fetchData();
    }
  }, [uid]);

  const fetchUser = async () => {
    await getDoc(doc(db, "Users", uid)).then((res) => {
      let data = res.data();
      setRecord(data);
    });
  };

  const fetchData = async () => {
    await getDocs(collection(db, "Tasks")).then((res) => {
      // get all data
      // let allData = res.docs.map((e,i)=>(
      //   {docId : e.id,...e.data()}
      // ))

      // get user vise data
      let allData = res.docs
        .map((e, i) => ({ docId: e.id, ...e.data() }))
        .filter((task) => task.userId == uid);
      setTaskData(allData);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(editIndex == null)
    {
      await addDoc(collection(db, "Tasks"), {
        userId: uid,
        task: formTask.task,
        priority: formTask.priority,
      }).then((data) => {
        setTaskData([
          ...taskData,
          { userId: uid, task: formTask.task, priority: formTask.priority },
        ]);
      });
    }
    else
    {
      await updateDoc(doc(db,"Tasks",editIndex),{task: formTask.task, priority : formTask.priority}).then(()=>{
        
        // way 1
        // fetchData();

        // way 2
        let updateData = taskData.map((e,i) => 
          e.docId == editIndex 
          ? {...e, task: formTask.task, priority: formTask.priority }
          : e
        )

        setTaskData(updateData);
        setEditIndex(null);

      })
    }

    // console.log(taskData);
    setFormTask({
      task: "",
      priority: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormTask({ ...formTask, [name]: value });
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUid(null);
    setRecord("");
    navigate("/signin");
  };

  const handleEdit = (taskId) => {
    let singleData = taskData.find((e,i)=>e.docId == taskId);
    setFormTask({
      task : singleData.task,
      priority : singleData.priority
    })
    setEditIndex(taskId);
  }

  const handleDelete = async (taskId) => {
    if (!taskId) return; // Prevent deletion if taskId is missing
  
    try {
      await deleteDoc(doc(db, "Tasks", taskId)); // Delete from Firestore
  
      // Ensure taskData is an array before filtering
      if (Array.isArray(taskData)) {
        let filterData = taskData.filter((e) => e.docId !== taskId);
        setTaskData(filterData);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  return (
    <>
      <section className="bg-black flex-wrap justify-between items-center px-10 py-2">
        <h1 className="text-white font-semibold text-2xl">Logo</h1>
        <ul className="flex items-center gap-10">
          <li className="text-white text-lg">
            Welcome, {record ? record.name : "Guest"}
          </li>
          <li
            className="text-white cursor-pointer text-lg"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </section>
      <section className="bg-gray-700 py-5">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20" action="">
          <input
            type="text"
            value={formTask.task}
            name="task"
            onChange={handleChange}
            className="bg-white py-2 w-70 px-2"
            placeholder="Enter your task"
          />
          <select
            name="priority"
            className="bg-white py-2 w-70 px-2"
            value={formTask.priority}
            onChange={handleChange}
            id=""
          >
            <option value="" hidden>
              Select a priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button className="bg-green-600 cursor-pointer text-white px-10 py-2 font-semibold" type="submit">{editIndex == null ? "Add Task" : "Update Task"}</button>
        </form>
      </section>
      <section className="py-10 overflow-x-auto">
        <table className="w-full">
          {
            taskData.length > 0 && (
              <thead>
            <tr>
              <th className="text-center border-2 border-white p-3 text-lg bg-blue-600 text-white">
                Sr.No
              </th>
              <th className="text-center border-2 border-white p-3 text-lg bg-blue-600 text-white">
                Task
              </th>
              <th className="text-center border-2 border-white p-3 text-lg bg-blue-600 text-white">
                Priority
              </th>
              <th className="text-center border-2 border-white p-3 text-lg bg-blue-600 text-white">
                Status
              </th>
              <th
                className="text-center border-2 border-white p-3 text-lg bg-blue-600 text-white"
                colSpan={2}
              >
                Operation
              </th>
            </tr>
          </thead>
            )
          }
          {taskData.length > 0 && (
            <tbody>
              {taskData.map((e, i) => (
                <tr key={e.docId || i}>
                  <td className="border-2 bg-gray-600 text-white border-white text-center text-lg p-2">
                    {i + 1}
                  </td>
                  <td className="border-2 bg-gray-600 text-white border-white text-center text-lg p-2">
                    {e.task}
                  </td>
                  <td className="border-2 bg-gray-600 text-white border-white text-center text-lg p-2">
                    {e.priority}
                  </td>
                  <td className="border-2 bg-gray-600 text-white border-white text-center text-lg p-2">
                    <span className="bg-lime-600 px-2 py-1 rounded-md text-xs font-semibold">Active</span>
                  </td>
                  <td className="border-2 bg-gray-600 text-white border-white text-center text-lg p-2">
                    <ModeEditIcon className="cursor-pointer" onClick={()=>handleEdit(e.docId)} />
                  </td>
                  <td className="border-2 bg-gray-600 text-white border-white text-center text-lg p-2">
                    <DeleteForeverIcon className="cursor-pointer" onClick={() => handleDelete(e.docId)} />
                  </td>
                </tr>
              ))}
              {
                console.log(taskData)
              }
            </tbody>
          )}
        </table>
      </section>
    </>
  );
}

export default Dashboard;
