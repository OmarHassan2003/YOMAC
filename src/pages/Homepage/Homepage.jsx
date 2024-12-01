import "./HomePage.css";
import girlImage from "../../assets/homepage-girl.png";

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="first-page">
        <div className="text-content">
          <h1>
            <span className="highlighted">Studying</span> Online is now much
            easier
          </h1>
          <h2>
            TOTC is an interesting platform that will teach you in a more
            interactive way
          </h2>
        </div>
        <div className="image-container">
          <img src={girlImage} alt="Girl holding books" />
        </div>
      </div>
    </div>
  );
}
