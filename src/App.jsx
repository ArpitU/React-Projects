import './App.css';
import { useState, useEffect } from "react";
import logo from "./assets/logo (2).jpeg";
import Navbar from './components/section 1/section1';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [parameter, setParameter] = useState("temperature");
  const [operator, setOperator] = useState(">");
  const [filterValue, setFilterValue] = useState("");
  const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx0g1k5J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X8Z7z6y9v8F2G9J3X";

const saveToGoogleSheet = async (deviceList) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        devices: deviceList,
      }),
    });

    console.log("Saved to Google Sheet");
  } catch (error) {
    console.error("Error saving:", error);
  }
};
  const [devices, setDevices] = useState([
    { id: 'Device 1', temperature: 25, humidity: 60 },
    { id: 'Device 2', temperature: 35, humidity: 80 },
    { id: 'Device 3', temperature: 18, humidity: 40 },
  ]);

  const [filterType, setFilterType] = useState("all");

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

function doPost(e) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IoT_Data");

  var data = JSON.parse(e.postData.contents);

  data.devices.forEach(function(device){

    sheet.appendRow([
      new Date(),
      device.id,
      device.temperature,
      device.humidity
    ]);

  });

  return ContentService.createTextOutput("Success");
}
const displayedDevices = devices.filter((device) => {

  if (filterValue === "") return true;

  const value = Number(filterValue);

  const deviceValue =
    parameter === "temperature"
      ? device.temperature
      : device.humidity;

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


  useEffect(() => {

    const interval = setInterval(() => {
      refresh();
    }, 15000);

    return () => clearInterval(interval);

  }, []);


  return (

    <div className="app">

      {
        !open && (

          <button
            className="menu-btn"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

        )
      }

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

      {
        open && (
          <div
            className="overlay"
            onClick={() => setOpen(false)}
          ></div>
        )
      }


        <div><h1>IoT Dashboard</h1>
       
        <button
          className="refresh-btn"
          onClick={refresh}
        >
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
        Last Updated:{" "}
        {new Date().toLocaleTimeString()}
      </p>

      <div className="container">

        {displayedDevices.map((device, index) => (

          <div
            className='device-card'
            key={index}
          >

            <div className='device-left'>

              <h2>{device.id}</h2>

            </div>

            <div className='device-right'>

              <div className='temperature'>

                <p
                  style={{
                    color:
                      device.temperature < 30
                        ? "#00ff88"
                        : "#ff4d4d"
                  }}
                >
                  🌡 {device.temperature}°C
                </p>

              </div>

              <div className='humidity'>

                <p>
                  💧 {device.humidity}%
                </p>

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

            <p>
              Get the latest news and updates
              straight to your inbox.
            </p>

            <div className="newsletter-box">

              <input
                type="email"
                placeholder="Enter your email address"
              />

              <button>
                Subscribe
              </button>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default App;