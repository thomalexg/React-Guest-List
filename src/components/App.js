/** @jsxImportSource @emotion/react */

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
  const [event, setEvent] = useState('');

  function filterEvents() {
    const arr = [];
    guest.forEach((elem) => {
      if (!arr.includes(elem.eventName)) {
        arr.push(elem.eventName);
      }
    });
    return arr;
  }

  async function update(boolean, id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: boolean }),
    });

    setClicked(true);
  }
  async function updateGuestDeadline(deadline, id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deadline: deadline }),
    });

    setClicked(true);
  }
  async function updateGuestName(first, last, id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: first, lastName: last }),
    });

    setClicked(true);
  }
  async function upload() {
    await fetch('http://localhost:5000', {
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
  }
  async function guestaway(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: 'DELETE',
    });

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
        />
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

      <form action="/action_page.php">
        <label HTMLFor="events">Choose an event:</label>
        <select
          id="events"
          name="events"
          onChange={(e) => setEvent(e.target.value)}
        >
          <option />
          {filterEvents().map((elem, id) => (
            <option key={id} value={elem}>
              {elem}
            </option>
          ))}
        </select>
      </form>
      <input value={event} key="key" />
      <div className="guestCon" css={cg}>
        {guest.map((elem, index) => (
          <Guest
            endDateG={elem.deadline || ''}
            attending={elem.attending}
            firstName={elem.firstName}
            setFirstName={setFirstName}
            lastName={elem.lastName}
            setLastName={setLastName}
            eventName={elem.eventName}
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
            event={event}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
