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
  const [attendingFilter, setAttendingFilter] = useState(false);
  const [notAttendingFilter, setNotAttendingFilter] = useState(false);

  async function update(boolean, id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: boolean }),
    });
    const updatedGuest = await response.json();
    setClicked(true);
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
      // console.log(allGuests);
      setGuest(allGuests);
      setClicked(false);
      // allGuests.forEach((elem) => {
      //   if (elem.attending) {
      //     return document.querySelector(`att${elem.id}`).checked;
      //   }
      // });
    };
    if (clicked) {
      download();
    }
  }, [clicked]);

  const filterAttending = (boolean) => {
    guest.forEach((guest) => {
      if (boolean && !guest.attending) {
      }
    });
  };

  return (
    <div className="App" css={app} style={{ backgroundColor: 'black' }}>
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
              setFirstName(firstName ? firstName : ' ');
              setLastName(lastName ? lastName : ' ');
              await upload(firstName, lastName);
              setClicked(true);
              document.querySelector('.FN').value = '';
              document.querySelector('.LN').value = '';
              setFirstName('');
              setLastName('');
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
        <span style={{ color: 'white', padding: '10px 0 10px 10px' }}>
          Attending only
        </span>
        <input
          className="ao"
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              setAttendingFilter(true);
            } else {
              setAttendingFilter(false);
            }
          }}
        />
        <br />
        <span style={{ color: 'white', padding: '10px 0 10px 10px' }}>
          Not Attending only
        </span>
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              setNotAttendingFilter(true);
            } else {
              setNotAttendingFilter(false);
            }
          }}
        />
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
            attendingFilter={attendingFilter}
            notAttendingFilter={notAttendingFilter}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
