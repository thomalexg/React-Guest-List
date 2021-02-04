/** @jsxImportSource @emotion/react */
// import './App.css';
import { useEffect, useState } from 'react';
import Guest from './Guest';
import { app, c1, cg } from './style';

function App() {
  let counter = 1;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guest, setGuest] = useState([]);
  const [clicked, setClicked] = useState(true);

  async function update(boolean, id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: boolean }),
    });
    const updatedGuest = await response.json();
  }
  async function upload(firstName, lastName) {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
  }
  async function guestaway(id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    setClicked(true);
  }
  useEffect(() => {
    const download = async () => {
      const response = await fetch('http://localhost:5000');
      const allGuests = await response.json();
      console.log(allGuests);
      setGuest(allGuests);
      setClicked(false);
    };
    if (clicked) {
      download();
    }
  }, [clicked]);

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
            onClick={async () => {
              await upload(firstName, lastName);
              setClicked(true);
            }}
          >
            Add Guest
          </button>
        </div>

        <button
          onClick={() => {
            guest.forEach((elem, index) => {
              guestaway(elem.id);
            });
            setGuest([]);
          }}
        >
          Delete All
        </button>
      </div>
      <div className="guestCon" css={cg}>
        {guest.map((elem, index) => (
          <Guest
            attending={elem.attending}
            firstName={elem.firstName}
            lastName={elem.lastName}
            key={elem.id}
            id={elem.id}
            guestaway={guestaway}
            setClicked={setClicked}
            setGuest={setGuest}
            update={update}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
