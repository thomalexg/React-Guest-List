export default function Guest(props) {
  return (
    <div className={`guest ${props.id}`} id={props.id}>
      <div className="guest-con">
        <input type="checkbox"></input>
        <p>{props.firstName + ' ' + props.lastName}</p>
        <i class="fas fa-trash-alt"></i>
      </div>
    </div>
  );
}
