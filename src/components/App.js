/** @jsxImportSource @emotion/react */
// import './App.css';
import { useState } from 'react';
import Guest from './Guest';
import { app, c1, cg } from './style';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guest, setGuest] = useState([]);

  return (
    <div className="App" css={app}>
      <div className="container-header" css={c1}>
        <div className="header">
          <input
            className="FN"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="LN"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <button
            onClick={() => {
              setGuest(
                guest.concat({ firstName: firstName, lastName: lastName }),
              );
              const response = await fetch('http://localhost:5000', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName: firstName, lastName: lastName }),
              });
              const createdGuest = await response.json()
            }}
          >
            Add Guest
          </button>
        </div>

        <button>Download guest list</button>
      </div>
      <div className="guestCon" css={cg}>
        {guest.map((elem, index) => (
          <Guest
            firstName={elem.firstName}
            lastName={elem.lastName}
            key={index}
            id={index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
