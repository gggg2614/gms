import { http } from "@/utils/http";
export const baseUrlApi = (url: string) => `/api/${url}`;

export const findAllcom = () => {
  return http.request("GET", "http://localhost:3000/company");
};

export const addCom = data => {
  return http.request("POST", "http://localhost:3000/company", { data });
};

export const delCom = id => {
  return http.request("DELETE", `http://localhost:3000/company/${id}`);
};

export const editCom = (id, data) => {
  return http.request("PATCH", `http://localhost:3000/company/${id}`, { data });
};

export const findCom = (comname?) => {
  if (comname) {
    return http.request("get", `http://localhost:3000/company/${comname}`);
  } else return http.request("get", `http://localhost:3000/company`);
};

export const importCom = (file) => {
  return http.request("POST", `http://localhost:3000/company/import`, file);
};
