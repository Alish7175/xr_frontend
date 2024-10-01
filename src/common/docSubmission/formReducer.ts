// Initial state structure
export const initialState = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
  },
  residentialAddress: {
    street1: "",
    street2: "",
  },
  sameAsResidential: false,
  permanentAddress: {
    street1: "",
    street2: "",
  },
  documents: [{ fileName: "", fileType: "", file: null }],
};

// Reducer function
export const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.field]: action.value,
        },
      };
    case "TOGGLE_SAME_AS_RESIDENTIAL":
      return {
        ...state,
        sameAsResidential: !state.sameAsResidential,
        permanentAddress: state.sameAsResidential
          ? { street1: "", street2: "" }
          : { ...state.residentialAddress },
      };
    case "ADD_NEW_DOCUMENT":
      return {
        ...state,
        documents: [
          ...state.documents,
          { fileName: "", fileType: "", file: null },
        ],
      };
    case "REMOVE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.filter((_, i) => i !== action.index),
      };
    case "UPDATE_DOCUMENT":
      const updatedDocuments = state.documents.map((doc, index) =>
        index === action.index ? { ...doc, [action.field]: action.value } : doc
      );
      return { ...state, documents: updatedDocuments };
    case "RESET_FORM_FIELDS":
      return {
        ...initialState,
      };
    case "RESET_DOCUMENTS":
      return {
        ...state,
        documents: initialState.documents,
      };
    default:
      return state;
  }
};
