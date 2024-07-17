import React, { useEffect, useState } from "react";
import banner from "../../assets/banner.png";
import whatsapp from "../../assets/whatsapp.png";
import call from "../../assets/call.png";
import "./Home.scss";
import { URL } from "../../constants";
import Loader from "../Loader";

import { toast } from "react-toastify";

const Section = ({ children, title }) => {
  return (
    <div className="section-container">
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{children}</p>
    </div>
  );
};

const Home = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {

      const dateObject = new Date();
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");

      let formattedDate = `${year}-${month}-${day}`;

      const response = await fetch(`${URL}/get_data?date=${formattedDate}`, {
        method: "GET",
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData[0]?.items || []);
      toast.dismiss();
      toast.success(
        jsonData.length === 0
          ? "Today's Data Not Found"
          : "Successfully Loaded Data!"
      );
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Server Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="scroll-view">
      <img className="icon" src={banner} alt="Banner" />
      <div className="wrapper">
        <div className="img-container">
          <a href="https://wa.me/9284044001">
            <img className="social-icon" src={whatsapp} alt="WhatsApp" />
          </a>
          <a href="tel:9284044001">
            <img className="social-icon" src={call} alt="Call" />
          </a>
        </div>
      </div>
      <div className="flex-grow">
        {loading && <Loader />}
        {data.map((x) => (
          <Section title={x.title.toUpperCase()} key={x._id}>
            Rs. {x.cost}
          </Section>
        ))}
        {!loading && data.length === 0 && <Section title="No Data" />}
      </div>
    </div>
  );
};

export default Home;
