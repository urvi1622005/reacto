import { useState, useEffect } from 'react';
import './App.css';

function getLocalItems() {
  let list = localStorage.getItem("Lists");
  if (list) {
    return JSON.parse(localStorage.getItem("Lists"));
  } else {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(getLocalItems());
  const [inputValue, setInputValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("isDarkMode");
    return storedMode ? JSON.parse(storedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(tasks));
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
          {/* <img className="plus" src="plus.png" alt="" /> */}
          <h5 className="heading">TODO LIST</h5>
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
              <img className="plus" src="plus.png" alt="" />
            </div>
            <button onClick={addTask} id="button">ALL &emsp;&emsp;&ensp;|<img className="arrow" src="arrow.png" alt="" /></button>
            <button
              onClick={toggleDarkMode}
              className={`mode ${isDarkMode ? 'dark' : 'light'}`}
            />
          </div>
          <ul id="list-container">
            {tasks.map((task, index) => (
              <li key={index} className={task.checked ? "checked" : ""}>
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => toggleTask(index)}
                  className="task-checkbox"
                />
                {task.text}
                <div className="buttons">
                  <button onClick={(e) => { e.stopPropagation(); editTask(index); }} className="edit-btn">✎</button>
                  <button onClick={(e) => { e.stopPropagation(); deleteTask(index); }} className="delete-btn">✖</button>
                </div>
              </li>
            ))}
          </ul>
        </center>
      </div>
    </div>
  );
}

export default App;
