import React, { useState } from "react";

const PersonalDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    const user = {
      name: `${firstName} ${lastName}`,
      email,
      username,
      password,
    };
    user.name = `${firstName} ${lastName}`;
    user.email = email;
    user.username = username;
    user.password = password;
    console.log(user);
  };
  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={handleSave}>
      <div className="form-group" style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="First Name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button className="save" type="submit">
          Save profile
        </button>
        <button className="cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PersonalDetails;
