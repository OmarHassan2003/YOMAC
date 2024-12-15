import { useState } from "react";
import PersonalDetails from "../PersonalDetails/PersonalDetails";
import PaymentSettings from "../PaymentSettings/PaymentSettings";
import "./ProfileSettings.css";

const ProfileSettings = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = ["Personal Details", "Transactions"];
  const changeActive = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="profile-section">
      <div className="profile-settings">
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
        {activeIndex === 0 ? (
          <PersonalDetails data={data} />
        ) : (
          <PaymentSettings data={data} />
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
