import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWhiteboard } from "../../RTK/Slices/WhiteboardSlice";
import "./WhiteBoard.css";

const WhiteBoard = () => {
  let data = useSelector((state) => state.whiteBoard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWhiteboard(2));
  }, []);
  data = data.whiteboard;
  console.log(data);
  return (
    <div className="profile-card">
      <div className="container"></div>
    </div>
  );
};
export default WhiteBoard;
