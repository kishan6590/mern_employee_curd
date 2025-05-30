import { data } from "react-router";

class ApiClient {
  constructor() {
    (this.baseURL = `${import.meta.env.VITE_API_URL}/api/v1/`),
      (this.defaultHeader = {
        "Content-Type": "application/json",
        Accept: "application/json",
      });
  }

  async customFetch(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = { ...this.defaultHeader, ...options.headers };

      if (options.body instanceof FormData) {
        delete headers["Content-Type"];
      }

      const config = {
        ...options,
        headers,
        credentials: "include",
      };

      const response = await fetch(url, config);
      const data = await response.json();
      console.log(`data->:`, data);
      return data;
    } catch (error) {
      console.log("API Error:", error);
    }
  }

  //auth method

  async login(userName, password) {
    return this.customFetch("users/login", {
      method: "POST",
      body: JSON.stringify({
        f_userName: userName,
        f_Pwd: password,
      }),
    });
  }

  async logout() {
    return this.customFetch("users/logout", {
      method: "GET",
    });
  }

  // employee CURD method
  async getAll() {
    return this.customFetch("employee/all", {
      method: "GET",
    });
  }

  async delete(id) {
    return this.customFetch(`employee/delete/${id}`, {
      method: "DELETE",
    });
  }

  async create(formData) {
    return this.customFetch("employee/create", {
      method: "POST",
      body: formData,
    });
  }
  async edit(formData,id){
     return this.customFetch(`employee/update/${id}`, {
      method: "PATCH",
      body: formData,
    });
  }
}

const apiClient = new ApiClient();
export default apiClient;
