import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BusForm from "../components/Form/BusForm";
import { useGlobalBusContext } from "../hooks/useGlobalBusContext";
import { useGlobalAuthContext } from "../hooks/useGlobalAuthContext";
import BusInfo from "../components/BusInfo";
import Modal from "../components/Modal";
import busimage from "../images/busPage.jpg";
import "../style/schoolspage.css";
const BusesPage = () => {
  const navigate = useNavigate();
  const { user } = useGlobalAuthContext();
  const { buses, isLoading, addNewBus } = useGlobalBusContext();
  const [isAddingBus, setIsAddingBus] = useState(false);
  const [editingBusId, setEditingBusId] = useState(null);

  const handleEditBus = (busId) => {
    setEditingBusId(busId);
  };
  const handleAddBus = async (bus) => {
    try {
      const newBuslId = await addNewBus(bus);

      console.log("Bus added successfully!");

      if (newBusId) {
        navigate(`/bus/${newBusId}`);
      } else {
        console.error("New bus ID is undefined");
      }

      setIsAddingBus(false);
    } catch (error) {
      console.error("Error adding bus:", error);
    }
  };
  const generateUniqueKey = () => {
    return Math.random().toString(36).substr(2, 9); // A simple example, replace it with a more robust solution if needed
  };
  return (
    <div>
      <div className="school-container">
        <div className="backgroundtitle">
          <h1>Welcome to the Buses Page</h1>
          <div className="pAndimg">
            <p>
              Welcome to the Buses Page of the School Bus Coordination Project.
              Here, you will find a comprehensive list of buses that play a
              vital role in ensuring safe and efficient student transportation.
              Each bus is dedicated to serving specific schools, providing a
              crucial link between educational institutions and families.
            </p>
            <img src={busimage} />
          </div>
        </div>
        <div className="">
          <h1>List of Participating Buses</h1>
          {user && user.role === "admin" && (
            <>
              <button
                className="button-88"
                role="button"
                onClick={() => setIsAddingBus(true)}
              >
                ADD BUS
              </button>
            </>
          )}
        </div>
        <Modal isOpen={isAddingBus} onClose={() => setIsAddingBus(false)}>
          <div className="school-form">
            <h2>Add New Bus</h2>
            <BusForm btnText="Add Bus" onSubmit={handleAddBus} />
          </div>
        </Modal>
        {/* {isAddingSchool && (
        <div className="school-form">
          <h2>Add New School</h2>
          <SchoolForm btnText="Add School" onSubmit={handleAddSchool} />
        </div>
      )} */}

        <div className="school-list">
          {buses.map((bus) => {
            return (
              <>
                <BusInfo
                  key={bus._id || generateUniqueKey()}
                  {...bus}
                  onEdit={handleEditBus}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
    // <div>
    //   <h2>bus page</h2>
    //   <section className="shoes-container">
    //     {buses.map((bus, idx) => {
    //       return <BusInfo key={bus.id || idx} {...bus} />;
    //     })}
    //   </section>
    // </div>
  );
};

export default BusesPage;
