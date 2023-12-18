import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import SchoolForm from "../components/Form/SchoolForm";
import { useGlobalAuthContext } from "../hooks/useGlobalAuthContext";
import { useGlobalBusContext } from "../hooks/useGlobalBusContext";
import { useGlobalSchoolContext } from "../hooks/useGlobalSchoolContext";

import "../style/schoolspage.css";

const SchoolInfo = ({ _id, name, location, contact, busServices }) => {
  const { loading } = useGlobalAuthContext();
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const { user } = useGlobalAuthContext();
  const { fetchSchool, currentSchool, isLoading, removeSchool } =
    useGlobalSchoolContext();
  const { buses, isLoading: busLoading } = useGlobalBusContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showBusDetails, setShowBusDetails] = useState(
    Array(busServices.length).fill(false)
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

    removeSchool(_id);

    navigate("/schools");
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
          <span>School Name: </span> {name}
        </label>
        <label className="label-style">
          <span>Location:</span> {location}
        </label>
        <label className="label-style">
          <span>Contact:</span> {contact}
        </label>
        <div>
          <label className="label-style">
            <span>Bus Services:</span>
          </label>
          <ul className="ul-style">
            {busServices.map((busId, index) => {
              const bus = buses.find((bus) => bus._id === busId);
              return (
                <li key={index}>
                  {bus ? (
                    <>
                      <label className="label-style">
                        <span>Driver Name: </span> {bus.drivername}
                      </label>

                      <button
                        onClick={() => handleToggleDetails(index)}
                        className={`see-details ${
                          showBusDetails[index] ? "show-less" : ""
                        }`}
                      >
                        {showBusDetails[index] ? "Hide Details" : "See Details"}
                      </button>
                      {showBusDetails[index] && (
                        <div>
                          <label className="label-style">
                            <span>Contact:</span> {bus.contact}
                          </label>

                          <label className="label-style">
                            <span>Loading/Unloading Stations:</span>
                            {bus.loadingUnloadingStation?.length > 0 ? (
                              <ul className="ul-style">
                                {bus.loadingUnloadingStation.map(
                                  (station, stationIndex) => (
                                    <li key={stationIndex}>{station}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <p>No loading/unloading stations available.</p>
                            )}
                          </label>
                        </div>
                      )}
                    </>
                  ) : (
                    <p>Bus details not found</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="button-container">
          {user && user.role === "admin" && (
            <>
              {" "}
              <button
                className="button-88 edite button-style"
                role="button"
                onClick={handleEditClick}
              >
                Edit School
              </button>
              <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <div className="school-form">
                  <h2>Edit School</h2>
                  <SchoolForm
                    btnText="Save Changes"
                    schoolId={_id}
                    onClose={() => setIsEditing(false)}
                  />
                </div>
              </Modal>
              <button
                className="button-88 delete button-style"
                role="button"
                onClick={handleDeleteClick}
              >
                Delete School
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

export default SchoolInfo;
