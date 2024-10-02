import { axiosClient } from "../apis/api";

export const formSubmissionApi = async (formData: FormData): Promise<any> => {
  return axiosClient
    .post("/api/v1/submit-form", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Axios sets this automatically, but explicit is fine
      },
    })
    .then((res) => res.data);
  // .catch((error) => error);
};
