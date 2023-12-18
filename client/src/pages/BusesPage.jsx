import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SchoolForm from "../components/Form/SchoolForm";
import { useGlobalBusContext } from "../hooks/useGlobalBusContext";
import { useGlobalAuthContext } from "../hooks/useGlobalAuthContext";
import BusInfo from "../components/BusInfo";
import Modal from "../components/Modal";
import schoolimage from "../images/students-waiting-school-bus_1308-132700.avif";
import "../style/schoolspage.css";
const BusesPage = () => {
  const { buses, isLoading } = useGlobalBusContext();
  return (
    <div>
      <h2>bus page</h2>
      <section className="shoes-container">
        {buses.map((bus, idx) => {
          return <BusInfo key={bus.id || idx} {...bus} />;
        })}
      </section>
    </div>
  );
};

export default BusesPage;
