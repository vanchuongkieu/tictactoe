import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../App";
import Square from "./Square";

const BoardDiv = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 102px);
  gap: 2px;
  position: relative;
  z-index: 2;
  background-color: #fff;
`;

const FooterDiv = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const MessageDiv = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  background-color: #ffffff;
  color: #2b2b2b;
  border-radius: 10px;
`;

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;

  & line {
    animation: identifier 250ms;
  }

  @keyframes identifier {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const winMatrix = {
  maxtrix: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  strike: [
    { x1: 0, x2: "100%", y1: 50, y2: 50 },
    { x1: 0, x2: "100%", y1: 155, y2: 155 },
    { x1: 0, x2: "100%", y1: 260, y2: 260 },
    { x1: 50, x2: 50, y1: 0, y2: "100%" },
    { x1: 155, x2: 155, y1: 0, y2: "100%" },
    { x1: 260, x2: 260, y1: 0, y2: "100%" },
    { x1: 0, x2: "100%", y1: 0, y2: "100%" },
    { x1: "100%", x2: 0, y1: 0, y2: "100%" },
  ],
};

const Board = ({ mode, setMode }) => {
  const [winner, setWinner] = useState("");
  const [isXNext, setXNext] = useState(true);
  const [isDrawn, setDrawn] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [svgLine, setSvgLine] = useState({ x1: 0, x2: 0, y1: 0, y2: 0 });

  const gameReset = () => {
    setMode("");
    setWinner("");
    setXNext(true);
    setDrawn(false);
    setSquares(Array(9).fill(null));
    setSvgLine({ x1: 0, x2: 0, y1: 0, y2: 0 });
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const findWinner = (squares) => {
    for (let i = 0; i < winMatrix.maxtrix.length; i++) {
      const [a, b, c] = winMatrix.maxtrix[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setSvgLine(winMatrix.strike[i]);
        return squares[a];
      }
    }
    return squares.filter((square) => square === null).length === 0;
  };

  const filterMatrix = (a, b, c) => {
    return winMatrix.maxtrix.filter((matrixs) => {
      const squareValues = matrixs.map((index) => squares[index]);
      return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort());
    });
  };

  const getAiTurn = () => {
    const emptyIndexes = squares.map((square, index) => (square === null ? index : null)).filter((square) => square);

    const aiWiningLines = filterMatrix("o", "o", null);
    if (aiWiningLines.length > 0) {
      return aiWiningLines[0].filter((index) => squares[index] === null)[0];
    }

    const aiBlockHumans = filterMatrix("x", "x", null);
    if (aiBlockHumans.length > 0) {
      return aiBlockHumans[0].filter((index) => squares[index] === null)[0];
    }

    const aiContinues = filterMatrix("o", null, null);
    if (aiContinues.length > 0) {
      return aiContinues[0].filter((index) => squares[index] === null)[0];
    }

    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomIndex];
  };

  const squaresPlayer = (index) => {
    let __squares = [...squares];
    __squares[index] = isXNext ? "x" : "o";
    setSquares(__squares);
  };

  const aiMove = () => {
    const aiMoveIndex = getAiTurn();
    squaresPlayer(aiMoveIndex);
    setXNext(true);
  };

  useEffect(() => {
    const winnerPlayer = findWinner(squares);
    const drawn = squares.filter((square) => square).length;
    if (winnerPlayer) {
      setWinner(winnerPlayer);
    }
    if (drawn >= squares.length) {
      setWinner("");
      setDrawn(true);
    }
    if (mode == "ONE" && !isXNext && !winnerPlayer) {
      sleep(500).then(() => aiMove());
    }
  }, [squares, isXNext, winner, mode]);

  const onPlay = useCallback(
    (index) => {
      if (squares[index]) return;
      if (!winner && !isDrawn) {
        squaresPlayer(index);
        setXNext(!isXNext);
      }
    },
    [squares, isXNext, winner]
  );

  return (
    <>
      <MessageDiv>
        <span>{winner ? winner.toUpperCase() + " chiến thắng" : isDrawn ? "Hòa" : mode ? (isXNext ? "X đánh" : "O đánh") : ""}</span>
      </MessageDiv>
      <BoardDiv>
        {squares.map((square, index) => (
          <Square key={index} x={square == "x"} o={square == "o"} onPlay={() => onPlay(index)} />
        ))}
        {winner && (
          <Svg height="100%" width="100%">
            <line {...svgLine} style={{ stroke: "rgb(255 255 255)", strokeWidth: 8 }} />
          </Svg>
        )}
      </BoardDiv>
      <FooterDiv>
        {mode && (
          <Button className="full" onClick={gameReset}>
            Chơi lại
          </Button>
        )}
      </FooterDiv>
    </>
  );
};

export default memo(Board);
