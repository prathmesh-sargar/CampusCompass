import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatFeed from "./ChatFeed";
import MessageInput from "./MessageInput";

function CommunityChat() {
  const [activeGroup, setActiveGroup] = useState("Web Development");
  const [messages, setMessages] = useState({}); // messages per group

  // Load messages from localStorage
  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || {};
    setMessages(storedMessages);
  }, []);

  // Add message to active group
  const addMessage = (newMessage) => {
    const updatedMessages = {
      ...messages,
      [activeGroup]: [...(messages[activeGroup] || []), newMessage],
    };

    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
  };

  return (
    <div>
      {/* Top spacing for navbar */}
      

      {/* Main Layout */}
      <div className="pt-[80px] flex h-screen bg-slate-900 text-secondary  relative">
        {/* Sidebar */}
        <Sidebar setActiveGroup={setActiveGroup} />
         {/* 🚧 Development Notice */}
      {/* <div className="w-[700px] flex justify-center items-center rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-yellow-300 flex  gap-3">
        <span className="text-lg">🚧</span>
        <div className="text-lg">
          <p className="font-semibold text-yellow-400 mb-1 text-4xl">
            Community Chat is under active development
          </p>
          <p className="text-yellow-400/80">
            Messages are stored locally for now. Real-time chat, authentication,
            and moderation features are coming soon.
          </p>
        </div>
      </div> */}

        {/* Chat Area */}
        <div className="flex flex-col flex-1 relative">
          
          {/* Chat Feed */}
          <ChatFeed
            chatHistory={messages[activeGroup] || []}
            activeGroup={activeGroup}
          />

          {/* Preview Mode Badge */}
          <div className="absolute bottom-20 right-6 text-xs text-gray-400 bg-gray-900/80 px-3 py-1 rounded-full border border-gray-700 pointer-events-none">
            Preview Mode
          </div>

          {/* Message Input */}
          <MessageInput addMessage={addMessage} />
        </div>
      </div>
    </div>
  );
}

export default CommunityChat;
