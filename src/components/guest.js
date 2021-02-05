export default function Guest(props) {
  return (
    <div
      className={`guest ${props.id}`}
      id={props.id}
      // style={`{ display: ${
      //   () => {
      //     if
      //   }
      // } }`}
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
        <p>{`${props.firstName} ${props.lastName}`}</p>
        <button
          onClick={() => {
            props.guestaway(props.id);
          }}
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}
