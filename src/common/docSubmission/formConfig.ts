// Configuration Object
export const formConfig = {
  personalInfo: {
    sectionTitle: "Personal Information",
    fields: {
      firstName: { label: "First Name", type: "text", required: true },
      lastName: { label: "Last Name", type: "text", required: true },
      email: { label: "Email", type: "email", required: true },
      dob: {
        label: "Date of Birth",
        type: "date",
        required: true,
        validate: (value) => {
          const age = new Date().getFullYear() - new Date(value).getFullYear();
          return age >= 18 ? null : "You must be at least 18 years old";
        },
      },
    },
  },
  residentialAddress: {
    sectionTitle: "Residential Address",
    fields: {
      street1: { label: "Street 1", type: "text", required: true },
      street2: { label: "Street 2", type: "text", required: true },
    },
  },
  permanentAddress: {
    sectionTitle: "Permanent Address",
    fields: {
      street1: { label: "Street 1", type: "text", required: true },
      street2: { label: "Street 2", type: "text", required: true },
    },
  },
  documents: {
    sectionTitle: "Upload Documents",
    fileFields: [
      { label: "File Name", type: "text", required: true },
      {
        label: "Type of File",
        type: "select",
        options: ["image", "pdf"],
        required: true,
      },
      { label: "Upload Document", type: "file", required: true },
    ],
  },
};
