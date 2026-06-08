import './App.css';
import { useState, useEffect } from "react";
import logo from "./assets/logo (2).jpeg";
import Navbar from './components/section 1/section1';

function App() {

  const [open, setOpen] = useState(false);

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
  }
  function filtersearch(){
    input=document.getElementById("searchbar").value.toLowerCase();
    devicecards=document.getElementsByClassName("device-card");
    for(var i=0;i<devicecards.length;i++){
      let deviceName=devicecards[i].getElementsByClassName("device-left")[0].innerText.toLowerCase();
      if(deviceName.includes(input)){
        devicecards[i].style.display="flex";
      }
      else{
        devicecards[i].style.display="none";
      }
    }
  }
  const [searchTerm, setSearchTerm] = useState("");
  <input
  type="text"
  placeholder="Search devices..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
  const displayedDevices = devices.filter((device) => {

    if (filterType === "temperature") {
      return device.temperature > 30;
    }

    if (filterType === "humidity") {
      return device.humidity > 70;
    }

    return true;
  });

  useEffect(() => {

    const interval = setInterval(() => {
      refresh();
    }, 5000);

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

        <select
          className="filter-btn"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Devices</option>
          <option value="temperature">
            High Temperature (&gt; 30°C)
          </option>
          <option value="humidity">
            High Humidity (&gt; 70%)
          </option>
        </select>

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