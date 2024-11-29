import React, { useState } from "react";
import PorfileCard from "./ProfileCard";
import ProfileSettings from "./ProfileSettings";

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
