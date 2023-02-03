import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // eslint-disable-next-line
export const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-next-line
export const validName = /^[A-Za-z]+$/;
export const validPhoneno = /^[0-9]{6,10}$/;
export const validPaasword =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const ENDPOINTURL = "https://shoppybackend.cyclic.app/api/v1";
export const URL = "https://shoppybackend.cyclic.app/";

export const EventEmitter = {
  events: {},

  dispatch: function (event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  },

  subscribe: function (event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
};

export const listBody = (data) => {
  return {
    where: data.where,
    pagination: {
      sortBy: data?.sortBy ? data.sortBy : "createdAt",
      descending: true,
      rowsPerPage: data?.perPage ? data.perPage : 10000,
      page: data?.page ? data.page : 1,
    },
  };
};

export const suceessUser = (Message) => {
  toast.success(Message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const delBody = (data) => {
  return {
    data,
  };
};
export function formateNum(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
