import PorfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../../RTK/Slices/StudentSlice";
import "./Profile.css";

const Profile = () => {
  let data = useSelector((state) => state.student);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudent());
  }, []);
  data = data.object;
  console.log(data);
  return (
    <div className="profile-card">
      <div className="container">
        <PorfileCard data={data} />
        <ProfileSettings data={data} />
      </div>
    </div>
  );
};
export default Profile;
