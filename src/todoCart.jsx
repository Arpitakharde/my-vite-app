const TASK_PRIORITY_CLASSES = {
    high: "border-t-4 border-green-500",
    medium: "border-t-4 border-yellow-500",
    low: "border-t-4 border-red-500",
  };
  
  const BADGE_PRIORITY_CLASSES = {
    high: "text-white bg-green-500",
    medium: "text-white bg-yellow-500",
    low: "text-white bg-red-500",
  };
  
  function TodoCard({ task, priority, index ,onDelete}) {
    return (
        <div className={`bg-white p-5 m-5 rounded-md shadow-lg border-1 border-gray-200 relative
          ${TASK_PRIORITY_CLASSES[priority]}`}>
  
  
            <span className={`block  w-[100px] border-1 text-center rounded-full ${BADGE_PRIORITY_CLASSES[priority]}`}>
                {priority}
            </span>
            <h1>{task}</h1>
  
            <button onClick={()=>{
                onDelete(index);
            }}
            className="bg-red-500 text-white text-xs px-5 py-1 px-5 rounded-full absolute top-2 right-2
            cursor-pointer"
            >Delete</button>   
        </div>
    );
  }
  export default TodoCard;