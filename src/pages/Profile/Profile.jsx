import ProfileSettings from "../ProfileSettings/ProfileSettings";
import StudentCard from "../../components/StudentCard/StudentCard";
import InstructorCard from "../../components/InstructorCard/InstructorCard";
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
      <div className="container12">
        {data?.studentname ? (
          <StudentCard data={data} />
        ) : (
          <InstructorCard data={data} />
        )}
        <ProfileSettings data={data} />
      </div>
    </div>
  );
};
export default Profile;
