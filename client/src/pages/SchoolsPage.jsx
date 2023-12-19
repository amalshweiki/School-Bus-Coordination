import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SchoolForm from "../components/Form/SchoolForm";
import { useGlobalSchoolContext } from "../hooks/useGlobalSchoolContext";
import { useGlobalAuthContext } from "../hooks/useGlobalAuthContext";
import SchoolInfo from "../components/SchoolInfo";
import Modal from "../components/Modal";
import schoolimage from "../images/students-waiting-school-bus_1308-132700.avif";
import "../style/schoolspage.css";
const SchoolsPage = () => {
  const navigate = useNavigate();
  const { user } = useGlobalAuthContext();
  const { schools, isLoading, addNewSchool } = useGlobalSchoolContext();
  const [isAddingSchool, setIsAddingSchool] = useState(false);
  const [editingSchoolId, setEditingSchoolId] = useState(null);

  const handleEditSchool = (schoolId) => {
    setEditingSchoolId(schoolId);
  };
  const handleAddSchool = async (school) => {
    try {
      const newSchoolId = await addNewSchool(school);

      console.log("School added successfully!");

      if (newSchoolId) {
        navigate(`/school/${newSchoolId}`);
      } else {
        console.error("New school ID is undefined");
      }

      setIsAddingSchool(false);
    } catch (error) {
      console.error("Error adding school:", error);
    }
  };
  const generateUniqueKey = () => {
    return Math.random().toString(36).substr(2, 9); // A simple example, replace it with a more robust solution if needed
  };
  return (
    <div>
      <div className="school-container">
        <div className="backgroundtitle">
          <h1>Welcome to the Schools Page</h1>
          <div className="pAndimg">
            <p>
              Discover the educational institutions partnering with the School
              Bus Coordination Project. Our initiative aims to enhance student
              transportation by fostering collaboration between schools and
              available buses. Below is a list of participating schools, each
              committed to ensuring a safe and efficient journey for their
              students.
            </p>
            <img src={schoolimage} />
          </div>
        </div>
        <div className="">
          <h1>List of Participating Schools</h1>
          {user && user.role === "admin" && (
            <>
              <button
                className="button-88"
                role="button"
                onClick={() => setIsAddingSchool(true)}
              >
                ADD SCHOOL
              </button>
            </>
          )}
        </div>
        <Modal isOpen={isAddingSchool} onClose={() => setIsAddingSchool(false)}>
          <div className="school-form">
            <h2>Add New School</h2>
            <SchoolForm btnText="Add School" onSubmit={handleAddSchool} />
          </div>
        </Modal>
        {/* {isAddingSchool && (
          <div className="school-form">
            <h2>Add New School</h2>
            <SchoolForm btnText="Add School" onSubmit={handleAddSchool} />
          </div>
        )} */}

        <div className="school-list">
          {schools.map((school, idx) => {
            return (
              <>
                <SchoolInfo
                  key={school.id || generateUniqueKey()}
                  {...school}
                  onEdit={handleEditSchool}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SchoolsPage;
