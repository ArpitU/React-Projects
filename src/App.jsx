import './App.css';
import { useState, useEffect } from "react";

function App() {

  const [open, setOpen] = useState(false);

  const [devices, setDevices] = useState([
    { id: 'Device 1', temperature: 25, humidity: 60 },
    { id: 'Device 2', temperature: 35, humidity: 80 },
    { id: 'Device 3', temperature: 18, humidity: 40 },
  ]);

  // Refresh Device Data
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

  // Auto Refresh
  useEffect(() => {

    const interval = setInterval(() => {
      refresh();
    }, 5000);

    return () => clearInterval(interval);

  }, [devices]);

  return (

    <div className="app">

      {/* Sidebar Button */}
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

      {/* Sidebar */}
      <div className={open ? "sidebar active" : "sidebar"}>

        <h2>Dashboard</h2>

        <ul>
          <li>Home</li>
          <li>Devices</li>
          <li>Analytics</li>
          <li>Settings</li>
        </ul>

      </div>

      {/* Overlay */}
      {
        open && (
          <div
            className="overlay"
            onClick={() => setOpen(false)}
          ></div>
        )
      }

      {/* Header */}
      <div className="header">

        <h1>IoT Dashboard</h1>

        <button
          className="refresh-btn"
          onClick={refresh}
        >
          Refresh Data
        </button>

      </div>

      {/* Last Updated */}
      <p className='time'>
        Last Updated:
        {" "}
        {new Date().toLocaleTimeString()}
      </p>

      {/* Device Grid */}
      <div className="container">

        {devices.map((device, index) => (

          <div
            className='device-card'
            key={index}
          >

            {/* Left */}
            <div className='device-left'>

              <h2>{device.id}</h2>

            </div>

            {/* Right */}
            <div className='device-right'>

              {/* Temperature */}
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

              {/* Humidity */}
              <div className='humidity'>

                <p>
                  💧 {device.humidity}%
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}
      <footer className="footer">

        <div className="footer-container">

          {/* Left Logo */}
          <div className="footer-logo">

            <h1>CoreData</h1>

            <p>
              Enabling things to Communicate
            </p>

          </div>

          {/* Contact Section */}
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

          {/* Newsletter */}
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