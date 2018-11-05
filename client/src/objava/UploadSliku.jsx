import axios from "axios";
export default async file => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "emsbshr7");
  delete axios.defaults.headers.common["Authorization"];
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dq9cwwrml/image/upload",
      formData
      //   {
      //     onUploadProgress: progressEvent => {
      //       this.setState({
      //         progress: Math.round(
      //           (progressEvent.loaded / progressEvent.total) * 100
      //         )
      //       });
      //     }
      //   }
    );
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    console.log(response);
    return response.data.url;
  } catch (error) {
    console.log(error.response.data.error);
    if (Object.keys(error.response.data.error).length > 0) {
      this.setState({ error: true });
    }
  }
};
