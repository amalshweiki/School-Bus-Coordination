import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import BusForm from "../components/Form/BusForm";
import { useGlobalAuthContext } from "../hooks/useGlobalAuthContext";
import { useGlobalBusContext } from "../hooks/useGlobalBusContext";
import { useGlobalSchoolContext } from "../hooks/useGlobalSchoolContext";

import "../style/schoolspage.css";

const BusInfo = ({
  _id,
  drivername,
  contact,
  pickupTimes,
  dropoffTimes,
  loadingUnloadingStation,
  schoolsava,
}) => {
  const { loading } = useGlobalAuthContext();
  const navigate = useNavigate();
  const { busId } = useParams();
  const { user } = useGlobalAuthContext();
  const { fetchBus, currentBus, isLoading, removeBus } = useGlobalBusContext();
  const { schools, isLoading: busLoading } = useGlobalSchoolContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showSchoolDetails, setShowSchoolDetails] = useState(
    Array(schools.length).fill(false)
  );
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  if (loading || busLoading) {
    return <div>Loading...</div>;
  }
  const handleToggleDetails = (index) => {
    setShowBusDetails((prev) => {
      const newShowDetails = [...prev];
      newShowDetails[index] = !newShowDetails[index];
      return newShowDetails;
    });
  };
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);

    removeBus(_id);

    navigate("/buses");
  };

  const handleCancelDelete = () => {
    // Hide the delete confirmation modal
    setShowDeleteModal(false);
  };

  // const handleDelete = (id) => {
  //   removeSchool(id);
  //   console.log(_id);
  //   navigate("/");
  // };
  return (
    <div className="form-container">
      <div className="school-details">
        <label className="label-style">
          <span>Driver Name: </span> {drivername}
        </label>
        <label className="label-style">
          <span>Contact:</span> {contact}
        </label>
        <label className="label-style">
          <span>Pickup Times:</span>
          <ul>
            {pickupTimes.map((picktime, index) => (
              <li key={index}>{picktime}</li>
            ))}
          </ul>
        </label>
        <label className="label-style">
          <span>Drop off Times:</span>
          <ul>
            {dropoffTimes.map((drop, index) => (
              <li key={index}>{drop}</li>
            ))}
          </ul>
        </label>
        <label className="label-style">
          <span>Loading/Uploading Stations:</span>
          <ul>
            {loadingUnloadingStation.map((loading, index) => (
              <li key={index}>{loading}</li>
            ))}
          </ul>
        </label>

        <div className="button-container">
          {user && user.role === "admin" && (
            <>
              {" "}
              <button
                className="button-88 edite button-style"
                role="button"
                onClick={handleEditClick}
              >
                Edit Bus
              </button>
              <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <div className="school-form">
                  <h2>Edit Bus</h2>
                  <BusForm
                    btnText="Save Changes"
                    busId={_id}
                    onClose={() => setIsEditing(false)}
                  />
                </div>
              </Modal>
              <button
                className="button-88 delete button-style"
                role="button"
                onClick={handleDeleteClick}
              >
                Delete Bus
              </button>
              <Modal isOpen={showDeleteModal} onClose={handleCancelDelete}>
                <div className="delete-confirmation">
                  <p>Are you sure you want to delete this school?</p>
                  <div className="modal-buttons">
                    <button
                      className="button-88 edite button-style"
                      onClick={handleConfirmDelete}
                    >
                      Yes
                    </button>
                    <button
                      className="button-88 delete button-style"
                      onClick={handleCancelDelete}
                    >
                      No
                    </button>
                  </div>
                </div>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default BusInfo;
