import { useEffect, useState } from "react";
import TodoCard from "./todocart";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [todoItem, setTodoItem] = useState({
    task: "",
    priority: "",
  });

  const [todoList, setTodoList] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");

  // Save list to localStorage on every change
  useEffect(() => {
    if (todoList.length === 0) return;
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // Load list from localStorage on first render
  useEffect(() => {
    const listFromLS = JSON.parse(localStorage.getItem("todoList") || "[]");
    setTodoList(listFromLS);
  }, []);

  const onDelete = (index)=>{
    const listAfterDeletion = todoList.filter((_, i) => i !=index);
     setTodoList(listAfterDeletion);
     toast.success('Task Deleted Successfully');
 };

  return (
    <div className="h-14 bg-linear-to-r from-cyan-500 to-blue-500 min-h-screen p-5">
      <div className="flex justify-around border-b-2 border-gray-300 pb-4">
        {["All", "High", "Medium", "Low"].map((tab, i) => (
          <span
            className={`w-24 md:w-20 text-lg md:text-xl text-center rounded-lg py-2 cursor-pointer transition duration-300
              ${tab === selectedTab ? "bg-white text-blue-600" : "bg-blue-600 text-white hover:bg-blue-500"}`}
            key={i}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      <Toaster />
      <div className="mt-5 h-[60vh] md:h-[50vh] overflow-y-auto ">
        {todoList.map((taskItem, index) => {
          const { task, priority } = taskItem;

          if (selectedTab !== "All" && priority.toLowerCase() !== selectedTab.toLowerCase()) {
            return null;
          }
          return (
            <TodoCard
              task={task}
              priority={priority}
              key={index}
              index={index}
              onDelete={onDelete}
            />
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white p-5 flex flex-col md:flex-row justify-center items-center gap-y-4 shadow-lg">
        <input
          type="text"
          onChange={(e) => {
            setTodoItem({
              ...todoItem,
              task: e.target.value,
            });
          }}
          value={todoItem.task}
          className="bg-gray-100 text-xl w-full md:w-[400px] px-2 rounded-md p-2 focus:outline-none shadow-md"
          placeholder="Enter Task"
        />
        <select
          className="bg-gray-100 text-xl p-2 rounded-md ml-0 md:ml-5 w-full md:w-[200px] shadow-md"
          onChange={(e) => {
            setTodoItem({
              ...todoItem,
              priority: e.target.value,
            });
          }}
          value={todoItem.priority}
        >
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          className="text-xl bg-blue-600 px-10 py-2 rounded-md ml-10 mt-8 md:mt-0 w-[150px] cursor-pointer text-white transition duration-300 hover:bg-blue-500"
          onClick={() => {
            if (!todoItem.task || !todoItem.priority) {
              toast.error("Please enter the task and select priority");
              return;
            }

            setSelectedTab("All");
            setTodoList([todoItem, ...todoList]);
            setTodoItem({
              task: "",
              priority: "",
            });
            toast.success("Task Added Successfully");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;

