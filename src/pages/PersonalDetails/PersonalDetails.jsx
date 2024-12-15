import StudentDetails from "../../components/StudentDetails/StudentDetails";
import InstructorDetails from "../../components/InstructorDetails/InstructorDetails";

const PersonalDetails = ({ data }) => {
  return (
    <div>
      {data?.studentname ? (
        <StudentDetails data={data} />
      ) : (
        <InstructorDetails data={data} />
      )}
    </div>
  );
};

export default PersonalDetails;
