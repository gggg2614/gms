import { http } from "@/utils/http";
export const baseUrlApi = (url: string) => `/api/${url}`;

export const findAllstu = () => {
  return http.request("GET", "http://localhost:3000/student");
};

export const addStu = data => {
  return http.request("POST", "http://localhost:3000/student", { data });
};

export const delStu = id => {
  return http.request("DELETE", `http://localhost:3000/student/${id}`);
};

export const editStu = (id, data) => {
  return http.request("PATCH", `http://localhost:3000/student/${id}`, { data });
};

export const findStu = (phone?) => {
  if (phone) {
    return http.request("get", `http://localhost:3000/student/${phone}`);
  } else return http.request("get", `http://localhost:3000/student`);
};
