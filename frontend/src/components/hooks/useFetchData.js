import React from "react";

import { allemployee, filteredEmployees } from "../../context/context";
import { useContext } from "react";
import apiClient from "../../../service/apiClient";
function useFetchData() {
  const { allEmployee, setAllemployee } = useContext(allemployee);
  const { filteredEmployee, setFilteredEmployee } =
    useContext(filteredEmployees);

  const fetchData = async function () {
    try {
      const data = await apiClient.getAll();
      setAllemployee(data.employees);
      
      setFilteredEmployee(data.employees);
    } catch (error) {
      console.log(error);
    }
  };
  return fetchData;
}

export default useFetchData;
