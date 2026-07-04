import './App.css';
import { useState, useEffect } from "react";
import logo from "./assets/logo (2).jpeg";
import Navbar from './components/section 1/section1';

// ⚠️ REPLACE THIS with your actual Apps Script Web App URL.
// It must come from Deploy > Manage deployments > Web app, and end in /exec
// Example shape (yours will be different, one long unique string):
// https://script.google.com/macros/s/AKfycbzABCDEF1234567890abcdefgHIJKLMNOP/exec
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4G09Vpj7Hse9YhaahhXZFxBIh0e_zome3IKLCzsKegxcclzQ57DGl3zclMgGszs7OaA/exec";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [parameter, setParameter] = useState("temperature");
  const [operator, setOperator] = useState(">");
  const [filterValue, setFilterValue] = useState("");

  const [devices, setDevices] = useState([
    { id: 'Device 1', temperature: 25, humidity: 60 },
    { id: 'Device 2', temperature: 35, humidity: 80 },
    { id: 'Device 3', temperature: 18, humidity: 40 },
  ]);

  const [filterType, setFilterType] = useState("all");

  // Saves the device list to the Google Sheet via the Apps Script Web App.
  // Apps Script's doPost usually can't send CORS headers back to a browser fetch,
  // so we use mode: "no-cors" — this means we can't read the response,
  // but the POST still reaches the script and appends the row.
  const saveToGoogleSheet = async (deviceList) => {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR_REAL")) {
      console.error("GOOGLE_SCRIPT_URL is not set. Update it in App.js.");
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain", // avoids a CORS preflight OPTIONS request
        },
        body: JSON.stringify({ devices: deviceList }),
      });

      // With no-cors we can't inspect the response or know the real status,
      // but if fetch doesn't throw, the request was sent successfully.
      console.log("Sent data to Google Sheet (response is opaque due to no-cors).");
    } catch (error) {
      console.error("Error saving to Google Sheet:", error);
    }
  };

  function refresh() {
    const newDevices = devices.map(device => ({
      ...device,
      temperature: Math.floor(Math.random() * 50),
      humidity: Math.floor(Math.random() * 100)
    }));

    setDevices(newDevices);
    saveToGoogleSheet(newDevices);
  }

  useEffect(() => {
    saveToGoogleSheet(devices);
  }, []);

  const displayedDevices = devices.filter((device) => {
    if (filterValue === "") return true;

    const value = Number(filterValue);
    const deviceValue = parameter === "temperature" ? device.temperature : device.humidity;

    switch (operator) {
      case ">":
        return deviceValue > value;
      case "<":
        return deviceValue < value;
      case "=":
        return deviceValue === value;
      case ">=":
        return deviceValue >= value;
      case "<=":
        return deviceValue <= value;
      default:
        return true;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {!open && (
        <button className="menu-btn" onClick={() => setOpen(true)}>
          ☰
        </button>
      )}

      <div className={open ? "sidebar active" : "sidebar"}>
        <h2>Dashboard</h2>
        <ul>
          <li>Home</li>
          <li>Devices</li>
          <li>Analytics</li>
          <li><a href="maps.html">Maps</a></li>
          <li><a href="graph.html">Graph</a></li>
          <li><a href="login.html">Login</a></li>
        </ul>
      </div>

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}></div>
      )}

      <div>
        <h1>IoT Dashboard</h1>

        <button className="refresh-btn" onClick={refresh}>
          Refresh Data
        </button>

        <br />
        <br />

        <div className="advanced-filter">
          <select
            className="filter-btn"
            value={parameter}
            onChange={(e) => setParameter(e.target.value)}
          >
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
          </select>

          <select
            className="filter-btn"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value=">">Greater Than</option>
            <option value="<">Less Than</option>
            <option value="=">Equal To</option>
            <option value=">=">Greater Than or Equal</option>
            <option value="<=">Less Than or Equal</option>
          </select>

          <input
            className="filter-btn"
            type="number"
            placeholder="Enter value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
      </div>

      <p className='time'>
        Last Updated: {new Date().toLocaleTimeString()}
      </p>

      <div className="container">
        {displayedDevices.map((device, index) => (
          <div className='device-card' key={index}>
            <div className='device-left'>
              <h2>{device.id}</h2>
            </div>

            <div className='device-right'>
              <div className='temperature'>
                <p style={{ color: device.temperature < 30 ? "#00ff88" : "#ff4d4d" }}>
                  🌡 {device.temperature}°C
                </p>
              </div>

              <div className='humidity'>
                <p>💧 {device.humidity}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <h1>
              <img src={logo} alt="CoreData" />
            </h1>
          </div>

          <div className="footer-contact">
            <div className="contact-item">
              <span>📞</span>
              <p>+91 1203648913</p>
            </div>

            <div className="contact-item">
              <span>✉️</span>
              <p>info@coredata.co.in</p>
            </div>

            <div className="contact-item">
              <span>📍</span>
              <div>
                <h3>Corporate Office</h3>
                <p>
                  First Floor, C-56/32,
                  C Block, Phase 2,
                  Industrial Area,
                  Sector 62, Noida,
                  Uttar Pradesh 201309
                </p>
              </div>
            </div>
          </div>

          <div className="footer-newsletter">
            <h2>Stay updated!</h2>
            <p>Get the latest news and updates straight to your inbox.</p>

            <div className="newsletter-box">
              <input type="email" placeholder="Enter your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
