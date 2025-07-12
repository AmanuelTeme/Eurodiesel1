import axios from "../utils/axiosConfig";
const api_url = import.meta.env.VITE_API_URL;

async function AddVehicle(formData, Token) {
  console.log("AddVehicle called with token:", Token);
  if (!Token) {
    alert("You are not logged in. Please log in again.");
    throw new Error("No token provided");
  }
  const headers = { "x-access-token": Token };
  try {
    const response = await axios.post("/api/vehicle", formData, { headers });
    console.log("AddVehicle response:", response);
    return response;
  } catch (error) {
    console.error("AddVehicle error:", error);
    throw error;
  }
}

async function getVehicleInfoPerCustomer(ID, token) {
  try {
    const headers = {
      "x-access-token": token,
    };
    const data = await axios.get(`/api/vehicles/${ID}`, { headers });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getVehicleInfo(ID, token) {
  try {
    const headers = {
      "x-access-token": token,
    };
    const { data } = await axios.get(`/api/vehicle/${ID}`, { headers });
    // const [data]=response
    console.log(data);
    let response = data?.data[0];

    return response;
  } catch (error) {
    console.log(error.response);
    return error?.response;
  }
}

// A function to employee update request
async function updateVehicle(formData, Token) {
  const headers = {
    "x-access-token": Token,
  };

  const data = await axios.put("/api/vehicle", formData, { headers });

  // console.log(data);

  return data;
}

async function hasServiceOrder(ID, token) {
  try {
    const headers = {
      "x-access-token": token,
    };
    const { data } = await axios.get(`/api/vehicle_order/${ID}`, { headers });

    console.log(data);
    let response = data?.result?.length;

    return response;
  } catch (error) {
    console.log(error);
  }
}

const vehicleService = {
  AddVehicle,
  getVehicleInfoPerCustomer,
  getVehicleInfo,
  updateVehicle,
  hasServiceOrder,
};

export default vehicleService;
