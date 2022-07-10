import { useState } from "react";
import Board from "./components/Board";

import "./App.css";
import styled from "styled-components";

const ContainerDiv = styled.div`
  background-color: #2b2b2b;
  border-radius: 10px;
  padding: 50px;
  width: 410px;
  height: 530px;
  position: relative;
  overflow: hidden;
`;

const GameDiv = styled.div`
  width: 310px;
  height: 310px;
  transform: translateX(100%);
  transition: all 250ms ease-in-out;

  &.show {
    transform: translateX(0);
  }
`;

const GameModeDiv = styled.div`
  text-align: center;
  margin-bottom: 15px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #2b2b2b;
  z-index: 5;
  transition: all 250ms ease-in-out;

  &.hidden {
    left: -100%;
    overflow: hidden;
  }
`;

export const Button = styled.button`
  border-radius: 10px;
  padding: 10px 15px;
  background-color: #ffffff;
  border: none;

  & + & {
    margin-left: 5px;
  }

  &.full {
    display: block;
    width: 100%;
  }

  &:hover {
    background-color: #d1d9e2;
    color: #000000;
    cursor: pointer;
    box-shadow: none;
  }

  &:active {
    background-color: rgb(239, 239, 239);
  }
`;

const App = () => {
  const [mode, setMode] = useState("");

  return (
    <>
      <ContainerDiv>
        <GameModeDiv className={mode ? "hidden" : ""}>
          <Button onClick={() => setMode("ONE")}>Chơi với máy</Button>
          <Button onClick={() => setMode("TWO")}>Chơi hai người</Button>
        </GameModeDiv>
        <GameDiv className={mode ? "show" : ""}>
          <Board mode={mode} setMode={setMode} />
        </GameDiv>
      </ContainerDiv>
    </>
  );
};

export default App;
