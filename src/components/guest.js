export default function Guest(props) {
  return (
    <Guest>
      <div className="guest">
        <div className="guest-con">
          <input type="checkbox"></input>
          <p>{props.firstName + props.lastName}</p>
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
    </Guest>
  );
}
