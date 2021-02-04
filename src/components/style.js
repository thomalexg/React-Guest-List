/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
const color = '#fff';
const app = css`
  background-color: #00076f;
  height: 100vh;
`;

const c1 = css`
  text-align: center;

  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: 30px;
  .header {
    border: 1px solid #fff;
    border-radius: 25px;
    background-color: ${color};
    width: 450px;
    margin: 0 auto;
  }
  input {
    line-height: 2rem;
    outline: none;
    border: none;
    background-color: transparent;
  }
  button {
    color: white;
    border-radius: 20px;
    background-color: purple;
    outline: none;
    border: none;
    height: 1.8rem;
    width: 80px;
  }
`;
const cg = css`
  padding-top: 150px;
  width: 70%;
  display: grid;
  margin: 0 auto;
  grid-template-columns: 2fr 2fr 2fr;
  gap: 2vh 2vw;
  .guest {
    min-height: 80px;
    background-color: grey;
    border-radius: 30px;
    text-align: center;
    vertical-align: middle;
  }
  p {
    line-height: 50px;
    font-size: 2rem;
    display: inline;
    padding: 10px 5px 0;
  }
  button {
    border: none;
    background-color: transparent;
    outline: none;
  }
`;

export { cg, c1, app };
