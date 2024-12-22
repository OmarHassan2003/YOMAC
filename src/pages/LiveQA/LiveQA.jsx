import { useEffect, useState, useRef } from "react";
import "./LiveQA.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import back from "../../assets/back.png";

export default function LiveQA() {
  const data = useSelector((state) => state.Authorization);
  const token = data.token;
  const { courseID } = useParams();
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);

  const [currMessage, setCurrMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const wsRef = useRef(ws);

  const handleBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Create a WebSocket instance
    const ws = new WebSocket(
      `wss://yomac.azurewebsites.net/ws/chat/connect_to_liveqa_room/${courseID}?token=${token}`
    ); // Replace with your WebSocket server URL

    // Set up WebSocket event listeners
    ws.onopen = () => {
      console.log("WebSocket connection opened");
      setWs(ws);
      wsRef.current = ws;
      // setIsConnected(true); // Mark the connection as successful
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);

      const parsedMessage = {
        senderName: receivedMessage.sender.username,
        senderImage: receivedMessage.sender.profilepic,
        role: receivedMessage.message.startsWith("student")
          ? "student"
          : "instructor",
        message: receivedMessage.message.split(" ").slice(1).join(" "),
      };

      // Add the message to the state
      setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      // setIsConnected(false); // Mark the connection as closed
    };

    // Cleanup on component unmount
    // setSocket(ws);
    return () => {
      if (wsRef.current) {
        console.log("Clean");
        wsRef.current.close();
      }
    };
  }, [token, courseID]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleRegister = function (e) {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (ws && currMessage.trim()) {
      const messageData = {
        message: `${data.role} ${currMessage}`,
      };

      ws.send(JSON.stringify(messageData));
      setCurrMessage("");
    }
  };

  return (
    <div className="liveqa-container">
      <button className="back-button" onClick={handleBackButton}>
        <img src={back} />
      </button>
      <ul className="messages-list" ref={messagesEndRef}>
        {messages.map((mes, index) => (
          <li
            key={index}
            className={`message ${
              mes.senderName === data.username
                ? "message-sent"
                : "message-received"
            }`}
          >
            <div className="message-header">
              <img src={mes.senderImage} alt={mes.senderName} />
              <strong
                className={`message-sender-name ${
                  mes.role === "instructor"
                    ? "insctructor-name"
                    : "student-name"
                }`}
              >
                {mes.senderName}
              </strong>
            </div>

            <p>{mes.message}</p>
          </li>
        ))}
      </ul>

      <form className="input-message-bar" onSubmit={handleRegister}>
        <input
          className="message-input"
          type="text"
          value={currMessage}
          onChange={(e) => setCurrMessage(e.target.value)}
          placeholder="Enter your message"
        />
      </form>
    </div>
  );
}
