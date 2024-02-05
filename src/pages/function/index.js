import Swal from "sweetalert2";

export const API_BASE_URL = "http://52.221.196.221:4321";

export const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const showAlert = (icon, title, html) => {
  Swal.fire({
    icon,
    title,
    html,
  });
};
