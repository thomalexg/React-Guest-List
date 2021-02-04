export default function Guest(props) {
  return (
    <div className={`guest ${props.id}`} id={props.id}>
      <div className="guest-con">
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              props.update(true, props.id);
            } else {
              props.update(false, props.id);
            }
          }}
        ></input>
        <p>{props.firstName + ' ' + props.lastName}</p>
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
