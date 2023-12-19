import useSchoolForm from "../../hooks/useSchoolForm";

import Input from "./Input";

const SchoolForm = ({ schoolId, btnText, onClose, onSubmit }) => {
  const { school, loading, errors, handleChange, handleSubmit } =
    useSchoolForm(schoolId);

  const fields = [
    {
      id: 1,
      name: "Name",
      inputName: "name",
      value: school.name,
      type: "text",

      error: errors.name,
    },
    {
      id: 2,
      name: "location",
      inputName: "location",
      value: school.location,
      type: "text",

      error: errors.location,
    },
    {
      id: 3,
      name: "Contact",
      inputName: "contact",
      value: school.contact,
      type: "text",
      error: errors.contact,
    },
    {
      id: 4,
      name: "BusServices",
      inputName: "busServices",
      value: school.busServices,
      type: Array,
      error: errors.busServices,
    },
  ];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Input key={field.id} {...field} handleChange={handleChange} />
      ))}
      <button className="button-88 edite button-style" type="submit">
        {btnText}
      </button>
      <button className="button-88 delete button-style" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default SchoolForm;
