import { useState, useEffect } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { LuCheckCircle2 } from "react-icons/lu";
import { LuCircle } from "react-icons/lu";

function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleValue = () => {
    if (value === "") {
      alert("Task field is required");
      return;
    }

    setTasks([...tasks, { text: value, isChecked: false }]);

    setValue("");
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      if (value === "") {
        alert("Task field is required");
        return;
      }

      setTasks([...tasks, { text: value, isChecked: false }]);

      setValue("");
    }
  };

  const handleCheck = (index) => {
    const completedTask = tasks.map((task, i) =>
      i === index ? { ...task, isChecked: !task.isChecked } : task
    );

    setTasks(completedTask);
  };

  const handleDelete = (index) => {
    const remainingTask = tasks.filter((_, i) => i !== index);
    setTasks(remainingTask);
  };

  return (
    <div className="h-[80vh] w-[500px] bg-[#e4e4e4] rounded overflow-auto">
      <div className="flex flex-col items-center p-4 font-playfair">
        <h1 className="text-[#3a6b7e] text-4xl font-bold">Task List</h1>

        <div className="relative flex items-center w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => handleKeyEnter(e)}
            placeholder="write task.."
            className="px-2 w-full h-10 my-6 rounded outline-none text-[#3a6b7e] text-2xl placeholder-[#a3c5c0] placeholder:text-2xl "
          />
          <div className="absolute right-0 p-2 text-inherit ">
            <BsPlusCircleFill
              size={20}
              className="text-[#3a6b7e] cursor-pointer"
              onClick={handleValue}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          {tasks.length > 0
            ? tasks.map((task, index) => (
                <>
                  <div
                    key={index}
                    className={`relative flex items-center px-2 h-10 bg-[#fff] rounded text-[#29897e] text-2xl mt-2 ${
                      task.isChecked ? "opacity-60" : ""
                    }`}
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div
                      className="cursor-pointer flex items-center w-full"
                      onClick={() => handleCheck(index)}
                    >
                      {task.isChecked ? <LuCheckCircle2 /> : <LuCircle />}{" "}
                      <span
                        className={`ml-2 ${
                          task.isChecked ? " line-through" : ""
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>

                    {isHovered === index && (
                      <div className="absolute right-0 p-2 text-inherit">
                        <MdDelete
                          className="text-[#29897e] cursor-pointer"
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    )}
                  </div>
                </>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
