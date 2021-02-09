/** @jsxImportSource @emotion/react */
// import './App.css';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Guest from './Guest';
import { app, c1, cg } from './style';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guest, setGuest] = useState([]);
  const [clicked, setClicked] = useState(true);
  const [attendingFilter, setAttendingFilter] = useState(false);
  const [notAttendingFilter, setNotAttendingFilter] = useState(false);
  const [attendingChecked, setAttendingChecked] = useState(false);
  const [notAttendingChecked, setNotAttendingChecked] = useState(false);
  const [editable, setEditable] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [eventName, setEventName] = useState('Event Name');
  const [eventLocation, setEventLocation] = useState('Event Location');

  function updateEvent(name, location) {
    guest.forEach(async (elem) => {
      const response = await fetch(`http://localhost:5000/${elem.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventName: name, eventLocation: location }),
      });
      // const updatedGuest = await response.json();
      console.log('Event added');
      setClicked(true);
    });
  }
  async function update(boolean, id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: boolean }),
    });
    // const updatedGuest = await response.json();
    setClicked(true);
  }
  async function updateGuestDeadline(deadline, id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deadline: deadline }),
    });
    // const updatedGuest = await response.json();
    setClicked(true);
  }
  async function updateGuestName(first, last, id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: first, lastName: last }),
    });
    // const updatedGuest = await response.json();
    setClicked(true);
  }
  async function upload() {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        eventName: eventName,
        eventLocation: eventLocation,
      }),
    });
    // const createdGuest = await response.json();
  }
  async function guestaway(id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: 'DELETE',
    });
    // const deletedGuest = await response.json();
    setClicked(true);
  }
  useEffect(() => {
    const download = async () => {
      const response = await fetch('http://localhost:5000');
      const allGuests = await response.json();
      setGuest(allGuests);
      setClicked(false);
    };
    if (clicked) {
      download();
    }
  }, [clicked]);

  return (
    <div className="App" css={app} style={{ backgroundColor: 'black' }}>
      <div className="event" style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />{' '}
        <button>Add Event</button>
      </div>
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
              await upload();
              await updateEvent(eventName, eventLocation);
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
            guest.forEach((elem) => {
              guestaway(elem.id);
            });
            // setGuest([]);
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
          checked={attendingChecked}
          onChange={(e) => {
            attendingChecked
              ? setAttendingChecked(false)
              : setAttendingChecked(true);
            if (e.target.checked) {
              setAttendingFilter(true);
              setNotAttendingChecked(false);
              setNotAttendingFilter(false);
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
          checked={notAttendingChecked}
          onChange={(e) => {
            notAttendingChecked
              ? setNotAttendingChecked(false)
              : setNotAttendingChecked(true);
            if (e.target.checked) {
              setNotAttendingFilter(true);
              setAttendingChecked(false);
              setAttendingFilter(false);
            } else {
              setNotAttendingFilter(false);
            }
          }}
        />
      </div>

      <div className="guestCon" css={cg}>
        {guest.map((elem, index) => (
          <Guest
            endDateG={elem.deadline || ''}
            attending={elem.attending}
            firstName={elem.firstName}
            setFirstName={setFirstName}
            lastName={elem.lastName}
            setLastName={setLastName}
            index={index}
            key={elem.id}
            id={elem.id}
            guestaway={guestaway}
            setClicked={setClicked}
            setGuest={setGuest}
            update={update}
            attendingFilter={attendingFilter}
            notAttendingFilter={notAttendingFilter}
            editable={editable}
            setEditable={setEditable}
            updateGuestName={updateGuestName}
            guest={guest}
            endDate={endDate}
            setEndDate={setEndDate}
            updateGuestDeadline={updateGuestDeadline}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
