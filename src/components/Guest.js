import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Guest(props) {
  const [overdue, setOverdue] = useState('no');
  if (props.endDateG !== '') {
    if (props.endDateG <= new Date().getTime()) {
      if (!props.attending) {
        if (overdue !== 'yes') {
          setOverdue('yes');
        }
      }
    } else {
      if (overdue === 'yes') {
        setOverdue('no');
      }
    }
  }

  return (
    <div
      className={`guest ${props.id} ${overdue} ${props.overdueAll}`}
      id={props.id}
      style={{
        display:
          !props.attending && props.attendingFilter
            ? 'none'
            : props.attending && props.notAttendingFilter
            ? 'none'
            : props.eventName !== '' && props.event !== props.eventName
            ? 'none'
            : '',
      }}
    >
      <div className="guest-con">
        <input
          checked={props.attending}
          type="checkbox"
          className={`att${props.id}`}
          onChange={(e) => {
            if (e.target.checked) {
              props.update(true, props.id);
            } else {
              props.update(false, props.id);
            }
          }}
        />
        <input
          class="text"
          input="text"
          value={props.guest[props.index].firstName}
          onChange={(e) => {
            const newGuest = [...props.guest];
            newGuest[props.index].firstName = e.target.value;
            props.setGuest(newGuest);
          }}
          readOnly={true}
          onDoubleClick={(e) => {
            if (e.target.readOnly) {
              props.setFirstName('');
              return (e.target.readOnly = false);
            }
          }}
          onBlur={(e) => {
            e.target.readOnly = true;
            props.updateGuestName(props.firstName, props.lastName, props.id);
          }}
        />
        <input
          class="text"
          input="text"
          value={props.guest[props.index].lastName}
          readOnly={true}
          onChange={(e) => {
            const newGuest = [...props.guest];
            newGuest[props.index].lastName = e.target.value;
            props.setGuest(newGuest);
          }}
          onDoubleClick={(e) => {
            console.log(props.guest);
            if (e.target.readOnly) {
              return (e.target.readOnly = false);
            }
          }}
          onBlur={(e) => {
            e.target.readOnly = true;
            props.updateGuestName(props.firstName, props.lastName, props.id);
          }}
        />

        <button
          className="icon"
          onClick={() => {
            props.guestaway(props.id);
          }}
        >
          <i class="fas fa-trash-alt" />
        </button>
        <DatePicker
          selected={props.endDateG}
          onChange={(date) => {
            date.getTime();
            props.updateGuestDeadline(date.getTime(), props.id);
          }}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
}
