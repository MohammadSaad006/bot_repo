import { useRecoilValue } from "recoil";
import _ from "lodash";

import {
  markColorIndexes,
  markStarIndexes,
  colorMap,
} from "../config/constants";
import { allBlockState } from "../recoil/atoms";
import Coin from "./coin";
import StarBg from "../assets/starOutline3.png";

/**
 * Component that holds the single step of the entire border steps grid.
 * @param {Object} props
 * @returns JSX
 */
function StepsBox({ parent, adjacentDirection, index }) {
  const blockState = useRecoilValue(allBlockState);
  const parentKey = parent[0] + index;

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #000', // Solid border
    borderRadius: '9px', // Slightly rounded corners for a modern look
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundImage: markStarIndexes[adjacentDirection].markIndex.includes(
      index
    )
      ? `url(${StarBg})`
      : "",
    backgroundColor: markColorIndexes[adjacentDirection].markIndex.includes(
      index
    )
      ? parent
      : "transparent",
  };

  return (
    <div className="stepBox" style={style}>
      {blockState[parentKey] &&
        blockState[parentKey].map((elem, i) => {
          return <Coin key={i} parent={colorMap[elem[0]]} index={elem} />;
        })}
    </div>
  );
}

export default StepsBox;
