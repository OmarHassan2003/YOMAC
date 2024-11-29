import React, { useState } from "react";
import PorfileCard from "../components/ProfileCard";
import ProfileSettings from "../pages/ProfileSettings";

const Profile = () => {
  return (
    <div className="profile-card">
      <div className="container">
        <PorfileCard />
        <ProfileSettings />
      </div>
    </div>
  );
};
export default Profile;
