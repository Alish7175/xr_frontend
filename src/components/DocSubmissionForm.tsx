import React, { useReducer, useState } from "react";
import { formSchema } from "../common/docSubmission/formValidation";
import { formReducer, initialState } from "../common/docSubmission/formReducer";

const DocumentSubmissionForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<any>(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    const validationResult = formSchema.safeParse(state);

    // Log the validation result to see if validation is passing or failing
    console.log("Validation Result:", validationResult);

    if (!validationResult.success) {
      // Log any validation errors
      console.log("Validation Errors:", validationResult.error.format());
      setErrors(validationResult.error.format());
    } else {
      setErrors(null);
      console.log("Form Submitted:", state); // Log the form state if validation passes
      dispatch({
        type: "RESET_FORM_FIELDS",
      });
      dispatch({
        type: "RESET_DOCUMENTS",
      });
    }
  };

  const renderField = (section, fieldKey, fieldConfig, disabled = false) => (
    <div key={fieldKey} className="mb-4">
      <label
        className="block text-sm font-medium mb-2 text-gray-600"
        htmlFor={fieldKey}
      >
        {fieldConfig.label}
        {fieldConfig.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={fieldConfig.type}
        id={fieldKey}
        value={state[section][fieldKey]}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            section,
            field: fieldKey,
            value: e.target.value,
          })
        }
        className="w-full p-2 border border-gray-300 rounded-md"
        required={fieldConfig.required}
        disabled={disabled}
      />
      {errors?.[section]?.[fieldKey] && (
        <span className="text-red-500 text-sm">
          {errors[section][fieldKey]._errors[0]}
        </span>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Document Submission Form
        </h2>

        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {renderField("personalInfo", "firstName", {
            label: "First Name",
            type: "text",
            required: true,
          })}
          {renderField("personalInfo", "lastName", {
            label: "Last Name",
            type: "text",
            required: true,
          })}
          {renderField("personalInfo", "email", {
            label: "Email",
            type: "email",
            required: true,
          })}
          {renderField("personalInfo", "dob", {
            label: "Date of Birth",
            type: "date",
            required: true,
          })}
        </div>

        {/* Residential Address */}
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Residential Address
        </h3>
        <div className="grid grid-cols-2 gap-6 mb-4">
          {renderField("residentialAddress", "street1", {
            label: "Street 1",
            type: "text",
            required: true,
          })}
          {renderField("residentialAddress", "street2", {
            label: "Street 2",
            type: "text",
            required: false,
          })}
        </div>

        {/* Same as Residential checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="sameAsResidential"
            className="mr-2"
            checked={state.sameAsResidential}
            onChange={() => dispatch({ type: "TOGGLE_SAME_AS_RESIDENTIAL" })}
          />
          <label
            htmlFor="sameAsResidential"
            className="text-sm font-medium text-gray-600"
          >
            Same as Residential Address
          </label>
        </div>

        {/* Permanent Address */}
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Permanent Address
        </h3>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {renderField(
            "permanentAddress",
            "street1",
            { label: "Street 1", type: "text", required: true },
            state.sameAsResidential // Disable field if "Same as Residential" is checked
          )}
          {renderField(
            "permanentAddress",
            "street2",
            { label: "Street 2", type: "text", required: false },
            state.sameAsResidential // Disable field if "Same as Residential" is checked
          )}
        </div>

        {/* Document Upload Section */}
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Upload Documents
        </h3>
        {state?.documents?.map((doc, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-4 items-center">
            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-600"
                htmlFor={`doc-${index}-fileName`}
              >
                File Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`doc-${index}-fileName`}
                className="w-full p-2 border border-gray-300 rounded-md"
                value={doc.fileName}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_DOCUMENT",
                    index,
                    field: "fileName",
                    value: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-600"
                htmlFor={`doc-${index}-fileType`}
              >
                Type of File<span className="text-red-500">*</span>
              </label>
              <select
                id={`doc-${index}-fileType`}
                className="w-full p-2 border border-gray-300 rounded-md"
                value={doc.fileType}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_DOCUMENT",
                    index,
                    field: "fileType",
                    value: e.target.value,
                  })
                }
                required
              >
                <option value="">Select</option>
                <option value="image">Image</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">
                Upload Document<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) =>
                  e.target.files &&
                  dispatch({
                    type: "UPDATE_DOCUMENT",
                    index,
                    field: "file",
                    value: e.target.files[0],
                  })
                }
                required
              />
            </div>
            <div className="flex items-center">
              {index === state.documents.length - 1 ? (
                <button
                  type="button"
                  className="text-white bg-blue-500 hover:bg-blue-600 rounded-full p-2"
                  onClick={() => dispatch({ type: "ADD_NEW_DOCUMENT" })}
                >
                  ➕
                </button>
              ) : (
                <button
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-600 rounded-full p-2"
                  onClick={() => dispatch({ type: "REMOVE_DOCUMENT", index })}
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentSubmissionForm;
