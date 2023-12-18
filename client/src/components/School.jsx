import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useGlobalAuthContext } from "../hooks/useGlobalAuthContext";
import { useGlobalBusContext } from "../hooks/useGlobalBusContext";
import { useGlobalSchoolContext } from "../hooks/useGlobalSchoolContext";

const School = () => {
  const { schoolId } = useParams();

  const navigate = useNavigate();

  const { user } = useGlobalAuthContext();

  const { fetchSchool, currentSchool, isLoading, removeSchool } =
    useGlobalSchoolContext();

  useEffect(() => {
    fetchSchool(schoolId);
  }, [fetchSchool, schoolId]);

  const handleDelete = () => {
    removeSchool(schoolId);
    navigate("/");
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main className="single-column-container">
      <div className="shoe-container">
        <h3 className="shoe-name">{currentSchool.name}</h3>
        <h2 className="shoe-brand">{currentSchool.location}</h2>
        {/* <img className="shoe-img" src={currentSchool.contact} alt="shoe-img" /> */}
        {/* <h2 className="shoe-price">{currentSchool.bus}</h2> */}
        {/* {user && user.role === "admin" && (
          <>
            <Link to={`/shoe/${currentSchool.id}/edit`} className="btn">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn">
              Delete
            </button>
          </>
        )} */}
      </div>
    </main>
  );
};

export default School;
