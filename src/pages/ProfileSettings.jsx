import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import PaymentSettings from "./PaymentSettings";

const ProfileSettings = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = ["Personal Details", "Payment"];
  const changeActive = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="profile-section">
      <div class="profile-settings">
        <h2>Profile Setting</h2>
        <div className="tabs">
          {tabs.map((tab, index) => {
            return (
              <a
                key={index}
                href="#"
                className={activeIndex === index ? "active" : "inactive"}
                onClick={() => changeActive(index)}
              >
                {tab}
              </a>
            );
          })}
        </div>
        {activeIndex === 0 ? <PersonalDetails /> : <PaymentSettings />}
      </div>
    </div>
  );
};

export default ProfileSettings;
