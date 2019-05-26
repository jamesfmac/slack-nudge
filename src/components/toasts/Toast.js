
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import "./toasts.css"

export const showError = text => {
    toast.error(text, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'styledToastError'
    });
  };

  export const showSuccess = text => {
    toast.success(text, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'styledToastSucces'
    });
  };

  export const showInfo = text => {
    toast.info(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'styledToastInfo'
    });
  };