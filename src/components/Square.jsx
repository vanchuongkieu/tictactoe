import { memo } from "react";
import styled from "styled-components";

import xPlayer from "../images/x-player.png";
import oPlayer from "../images/o-player.png";

const SquareDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b2b2b;
  user-select: none;
  color: #ffffff;
  cursor: pointer;
`;

const XPlayer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${xPlayer});
  background-size: 63.5%;
  border-style: none;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: center;
`;
const OPlayer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${oPlayer});
  background-size: 63.5%;
  border-style: none;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: center;
`;

const Square = ({ x, o, onPlay }) => {
  return <SquareDiv onClick={onPlay}>{x ? <XPlayer /> : o ? <OPlayer /> : ""}</SquareDiv>;
};

export default memo(Square);
