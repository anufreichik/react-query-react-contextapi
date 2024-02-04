import { useState } from "react";
import "./Tabs.css";
const Tabs = () => {
  const data = [
    { tabTitle: "English", tabContent: "Hellow" },
    { tabTitle: "Spanish", tabContent: "Hola" },
    { tabTitle: "French", tabContent: "Bonjour" },
  ];
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      Tabs Component
      <div className="tabs-container">
        {data.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`tab ${selectedTab === index ? "active" : "notactive"}`}
          >
            {item.tabTitle}
          </button>
        ))}
      </div>
      <div className="content">
        <p>{data[selectedTab].tabContent}</p>
      </div>
    </div>
  );
};

export default Tabs;
