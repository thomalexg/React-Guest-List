// import Name from './Name';

export default function Guest(props) {
  return (
    <div
      className={`guest ${props.id}`}
      id={props.id}
      style={{
        display:
          !props.attending && props.attendingFilter
            ? 'none'
            : '' || (props.attending && props.notAttendingFilter)
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
              // props.setClicked(true);
            } else {
              props.update(false, props.id);
              // props.setClicked(true);
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
            // else {
            //   e.target.readOnly = false;
            // }
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
        {/* <Name
          firstName={props.firstName}
          lastName={props.lastName}
          editable={props.editable}
          setEditable={props.setEditable}
        /> */}
        {/* <p>{`${props.firstName} ${props.lastName}`}</p> */}
        <button
          className="icon"
          onClick={() => {
            props.guestaway(props.id);
          }}
        >
          <i class="fas fa-trash-alt" />
        </button>
      </div>
    </div>
  );
}
