import React from "react";
import Navigation from "./Navigation";

export default function Dashboard() {
  return (
    <>
      <header>Logo</header>
      <Navigation />
      <div className="pageStatus">Dashboard</div>
      <h2 className="welcomeLine">Welcome Admin Panel</h2>
    </>
  );
}
