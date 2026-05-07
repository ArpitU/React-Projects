import './App.css';
import { useState } from "react";

function App() {

  const [devices, setDevices] = useState([
    { id: 'Device 1', temperature: 25, humidity: 60 },
    { id: 'Device 2', temperature: 35, humidity: 80 },
  ]);

  function updateDeviceData(index) {
    const newDevices = [...devices];

    newDevices[index].temperature = Math.floor(Math.random() * 40);
    newDevices[index].humidity = Math.floor(Math.random() * 100);

    setDevices(newDevices);
  }

  function refresh() {
    const newDevices = devices.map(device => ({
      ...device,
      temperature: Math.floor(Math.random() * 40),
      humidity: Math.floor(Math.random() * 100)
    }));

    setDevices(newDevices);
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>IoT Dashboard</h1>

      <button onClick={refresh} style={{ marginBottom: "20px" }}>
        Refresh Data
      </button>

      {devices.map((device, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{device.id}</h3>

         
          <p
            style={{
              color: device.temperature < 30 ? "green" : "red"  // terniary operator to set color based on temperature 
            }}
          >
            Temperature: {device.temperature}°C
          </p>

          <p>Humidity: {device.humidity}%</p>


        </div>
      ))}
    </div>  
  );
}

export default App;