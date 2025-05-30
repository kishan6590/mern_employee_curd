import React, { useState } from "react";
import Navigation from "./Navigation";
import apiClient from "../../service/apiClient";
import { useParams } from "react-router";

function EditEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams();
  async function handleEditSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("f_Name", name);
    formData.append("f_Email", email);
    formData.append("f_Mobile", mobileNo);
    formData.append("f_Designation", designation);
    formData.append("f_gender", gender);
    formData.append("f_Course", course);
    formData.append("f_Image", image);
    try {
      const data = await apiClient.edit(formData, id);
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header>Logo</header>
      <Navigation />
      <div className="pageStatus"> Edit Employee</div>
      <div className="formContainerCreate">
        <form onSubmit={handleEditSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="mobileNo">Mobile No</label>
          <input
            type="number"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <br />
          <label htmlFor="designation">Designation</label>
          <select
            name="designation"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="MANAGER">MANAGER</option>
            <option value="SALES">SALES</option>
          </select>
          <br />
          <label htmlFor="gender">Gender</label>
          <label htmlFor="M">M</label>
          <input
            name="gender"
            id="M"
            value="M"
            type="radio"
            checked={gender == "M"}
            onChange={(e) => setGender(e.target.value)}
          />

          <label htmlFor="F">F</label>
          <input
            name="gender"
            value="F"
            id="F"
            checked={gender == "F"}
            type="radio"
            onChange={(e) => setGender(e.target.value)}
          />
          <br />

          <label htmlFor="course">Course </label>

          <label htmlFor="MCA">MCA</label>
          <input
            name="course"
            type="checkbox"
            id="MCA"
            value="MCA"
            checked={course == "MCA"}
            onChange={(e) => setCourse(e.target.value)}
          />
          <label htmlFor="BCA">BCA</label>
          <input
            name="course"
            type="checkbox"
            id="BCA"
            value="BCA"
            checked={course == "BCA"}
            onChange={(e) => setCourse(e.target.value)}
          />
          <label htmlFor="BSC">BSC</label>
          <input
            name="course"
            value="BSC"
            id="BSC"
            type="checkbox"
            checked={course == "BSC"}
            onChange={(e) => setCourse(e.target.value)}
          />
          <br />
          <label htmlFor="image">Img Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default EditEmployee;
