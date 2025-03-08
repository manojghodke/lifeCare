import React, { useState } from "react";
import axios from "axios";
import "./DoctorBot.css";

const DoctorBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey =
    "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";

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "google/gemini-2.0-flash-lite-preview-02-05:free",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botResponse =
        response.data.choices?.[0]?.message?.content ||
        "I'm not sure. Please try again.";
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response. Try again.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="doctorbot">
      <h2>DoctorBot - AI Health Assistant</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender}>
            {msg.text}
          </p>
        ))}
        {loading && <p className="bot typing">DoctorBot is typing...</p>}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Describe your symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </div>
  );
};

export default DoctorBot;
