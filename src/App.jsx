import './App.css';
import { useState } from "react";

function App() {

  const [open, setOpen] = useState(false);

  const [devices, setDevices] = useState([
    { id: 'Device 1', temperature: 25, humidity: 60 },
    { id: 'Device 2', temperature: 35, humidity: 80 },
  ]);

  function updateData(index) {
    const newDevices = [...devices];

    newDevices[index].temperature = Math.floor(Math.random() * 50);
    newDevices[index].humidity = Math.floor(Math.random() * 100);

    setDevices(newDevices);
  }

  console.log(devices);

  function refresh() {
    const newDevices = devices.map(device => ({
      ...device,
      temperature: Math.floor(Math.random() * 50),
      humidity: Math.floor(Math.random() * 100)
    }));

    setDevices(newDevices);
  }

  return (

    <div>

      {/* Sidebar Button */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

     
      <div className={open ? "sidebar active" : "sidebar"}>
        <h2>Dashboard Menu</h2>

        <ul>
        <li>Devices</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="h1">
        <h1>IoT Dashboard</h1>

        <button onClick={refresh} style={{ marginBottom: "20px" }}>
          Refresh Data
        </button>

        <p className='time'>
          Last Updated: {new Date().toLocaleTimeString()}
        </p>

        {devices.map((device, index) => (
          <div className='device-card' key={index}>

            <div className='h3'>{device.id}</div>

            <p
              style={{
                color: device.temperature < 30 ? "green" : "red"
              }}
            >
              Temperature: {device.temperature}°C
            </p>

            <p>Humidity: {device.humidity}%</p>

          </div>
        ))}
      </div>

    </div>
  );
}

export default App;