/** @jsxImportSource @emotion/react */
// import './App.css';
import { useState } from 'react';
import { app, c1, cg } from './style';

const createGuest = (firstName, lastName) => {
  const parent = document.querySelector('.guestCon');
  let markup = `<div class="guest">
  <div class="guest-con">
    <input type="checkbox"></input>
    <p>${firstName} ${lastName}</p>
    <i class="fas fa-trash-alt"></i>
  </div>
</div>`;
  return (parent.innerHTML += markup);
};
function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className="App" css={app}>
      <div className="container-header" css={c1}>
        <div className="header">
          <input
            className="FN"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <input
            className="LN"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <button
            onClick={() => {
              createGuest(firstName, lastName);
              document.querySelector('.FN').value = '';
              document.querySelector('.LN').value = '';
            }}
          >
            Add Guest
          </button>
        </div>
      </div>
      <div className="guestCon" css={cg}>
        {/* <div className="guest">
          <div className="guest-con">
            <input type="checkbox"></input>
            <p>{firstName + ' ' + lastName}</p>
            <i class="fas fa-trash-alt"></i>
          </div>
        </div> */}
        {/* <Guest firstName={firstName} lastName={lastName}></Guest> */}
      </div>
    </div>
  );
}

export default App;
