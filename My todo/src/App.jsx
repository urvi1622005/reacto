import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    const storedMode = localStorage.getItem("isDarkMode");
    if (storedMode) {
      setIsDarkMode(JSON.parse(storedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const addTask = () => {
    if (inputValue.trim() === "") {
      alert("You must write something!");
    } else {
      setTasks([...tasks, { text: inputValue, checked: false }]);
      setInputValue("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, checked: !task.checked } : task
    );
    setTasks(newTasks);
  };

  const editTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
      const newTasks = tasks.map((task, idx) =>
        idx === index ? { ...task, text: newText.trim() } : task
      );
      setTasks(newTasks);
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(newTasks);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`outer ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="border">
        <center>
          <h5 className="heading">To-Do List</h5>
          <div className="to">Today I have to do</div>
          <div className="group">
            <div className="input-container">
              <i className="fas fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search note..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="title"
              />
            </div>
            <button onClick={addTask} id="button">Submit</button>
          </div>
          <button onClick={toggleDarkMode} className="mode">
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <ul id="list-container">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={task.checked ? "checked" : ""}
                onClick={() => toggleTask(index)}
              >
                {task.text}
                <button onClick={(e) => { e.stopPropagation(); editTask(index); }}>✎</button>
                <button onClick={(e) => { e.stopPropagation(); deleteTask(index); }}>✖</button>
              </li>
            ))}
          </ul>
        </center>
      </div>
    </div>
  );
}

export default App;
