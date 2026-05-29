import './App.css';
import { useState, useEffect } from "react";
import logo  from "./assets/logo (2).jpeg";
function App() {

  const [open, setOpen] = useState(false);

  const [devices, setDevices] = useState([
    { id: 'Device 1', temperature: 25, humidity: 60 },
    { id: 'Device 2', temperature: 35, humidity: 80 },
    { id: 'Device 3', temperature: 18, humidity: 40 },
  ]);

 
  function refresh() {

    const newDevices = devices.map(device => ({
      ...device,

      temperature:
        Math.floor(Math.random() * 50),

      humidity:
        Math.floor(Math.random() * 100)
    }));

    setDevices(newDevices);
  }


  useEffect(() => {

    const interval = setInterval(() => {
      refresh();
    }, 5000);

    return () => clearInterval(interval);

  }, [devices]);

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
          <li>Settings</li>
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

    
      <div className="header">

        <h1>IoT Dashboard</h1>

        <button
          className="refresh-btn"
          onClick={refresh}
        >
          Refresh Data
        </button>

      </div>

      
      <p className='time'>
        Last Updated:
        {" "}
        {new Date().toLocaleTimeString()}
      </p>

      
      <div className="container">

        {devices.map((device, index) => (

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
                      device.temperature < 30? "#00ff88" : "#ff4d4d"
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