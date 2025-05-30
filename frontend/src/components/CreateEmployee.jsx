import React, { useRef, useState } from "react";
import Navigation from "./Navigation";
import apiClient from "../../service/apiClient";
import { allemployee } from "../context/context";
import useFetchData from "./hooks/useFetchData";
import { useContext } from "react";
import { authContext } from "../context/context.js";
function CreateEmployee() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null);
  const fetchData = useFetchData();
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const fileInputRef = useRef(null);

  async function handleCreateSubmit(e) {
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
      
      setLoading(true);
      const data = await apiClient.create(formData);

      
      if (data.success) {
        alert("Employee Created Successfully!");
        setName("");
        setEmail("");
        setMobileNo("");
        setGender("");
        setCourse("");
        setDesignation("");

        setImage(null);
        fileInputRef.current.value = "";

        fetchData();
      }
      if (!data.success) {
        alert(
          data?.message ||
            data?.error?.errorResponse?.errmsg ||
            "something is not valid"
        );
      }
    } catch (error) {
      console.log("errror", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header>Logo</header>
      <Navigation />
      <div className="pageStatus"> Create Employee</div>
      <div className="formContainerCreate">
        <form onSubmit={handleCreateSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="mobile" htmlFor="mobileNo">
            Mobile No
          </label>
          <input
            type="number"
            required
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <br />
          <label htmlFor="designation" className="designation">
            Designation
          </label>
          <select
            name="designation"
            required
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
          <label className="gender" htmlFor="gender">
            Gender
          </label>
          <label className="M" htmlFor="M">
            M
          </label>
          <input
            required
            name="gender"
            id="M"
            value="M"
            type="radio"
            checked={gender == "M"}
            onChange={(e) => setGender(e.target.value)}
          />

          <label className="F" htmlFor="F">
            F
          </label>
          <input
            required
            name="gender"
            value="F"
            id="F"
            checked={gender == "F"}
            type="radio"
            onChange={(e) => setGender(e.target.value)}
          />
          <br />

          <label htmlFor="course">Course </label>

          <label className="MCA" htmlFor="MCA">
            MCA
          </label>
          <input
            name="course"
            type="checkbox"
            id="MCA"
            value="MCA"
            checked={course == "MCA"}
            onChange={(e) => setCourse(e.target.value)}
          />
          <label className="BCA" htmlFor="BCA">
            BCA
          </label>
          <input
            name="course"
            type="checkbox"
            id="BCA"
            value="BCA"
            checked={course == "BCA"}
            onChange={(e) => setCourse(e.target.value)}
          />
          <label htmlFor="BSC" className="BSC">
            BSC
          </label>
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
            id="image"
            required
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <button id="createBtn" disabled={loading} type="submit">
            {loading ? "Creating..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateEmployee;
