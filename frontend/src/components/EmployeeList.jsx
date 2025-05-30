import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Navigation from "./Navigation";
import apiClient from "../../service/apiClient";
import useFetchData from "./hooks/useFetchData";
import {
  allemployee,
  authContext,
  filteredEmployees,
} from "../context/context";
import { useContext } from "react";

function EmployeeList() {
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const { filteredEmployee, setFilteredEmployee } =
    useContext(filteredEmployees);
  const { allEmployee, setAllemployee } = useContext(allemployee);
  const [searchTerm, setSearchTerm] = useState("");

  

  const fetchData = useFetchData();
  useEffect(() => {

    fetchData();
  }, []);
  const date = function (createdAt) {
    const date = createdAt.split("T")[0];
    return date;
  };

  const handleDelete = async function (id) {
    try {
      const data = await apiClient.delete(id);
      if (data.success) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //searching
  const handleSearch = async (e) => {
    const searchKey = e.target.value.toLowerCase();
    setSearchTerm(searchKey);
    
    const filtered = allEmployee?.filter((emp) => {
      return (
        emp.f_Name.toLowerCase().includes(searchKey) ||
        emp.f_Email.toLowerCase().includes(searchKey) ||
        emp.f_Designation.toLowerCase().includes(searchKey)
      );
    });
    setFilteredEmployee(filtered);
  };

  return (
    <>
      <header>Logo</header>
      <Navigation />
      <div className="employeeInfo">
        <h3>Total Count: {filteredEmployee?.length??0}</h3>
        <Link id="createEmployee" to="/createemployee">
          Create Employee
        </Link>
      </div>
      <div className="searchBar">
        <label htmlFor="search">Search</label>{" "}
        <input
          onChange={handleSearch}
          value={searchTerm}
          type="text"
          id="search"
        />
      </div>
      <div className="pageStatus">Employee List</div>
      {/* <h2 className="welcomeLine">employeelist Admin Panel</h2> */}
      <div className="employeeContainer">
        <table>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Degination</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployee?.map((employee) => {
              return (
                <tr key={employee._id}>
                  <td>{employee.f_Id}</td>
                  <td>
                    <img src={employee.f_Image} alt="employeeImage" />
                  </td>
                  <td>{employee.f_Name}</td>
                  <td>{employee.f_Email}</td>
                  <td>{employee.f_Mobile}</td>
                  <td>{employee.f_Designation}</td>
                  <td>{employee.f_gender}</td>
                  <td>{employee.f_Course}</td>
                  <td>{date(employee.createdAt)}</td>
                  <td>
                    <Link
                      to={isLoggedIn ? `/editemployee/${employee._id}` : `/`}
                      id="edit"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      id="delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
           
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployeeList;
