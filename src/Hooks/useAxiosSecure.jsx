import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://al-amin-shop-bd-server.onrender.com",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
