import React from "react";
import FirstCard from "../Cards/CountCard";
import TierCard from "../Cards/ActivityCard";

const SuperAdminDashboard = () => {
  const names = ['Emma','Alexa','Vika'];
  const count = ['2','2','2'];
  return (
    <>
      <h3 style={{marginBottom:'5vw'}}>Hello Super Admin</h3>
      <div style={{display:'flex',flexDirection:'row',justifyContent:"space-evenly",alignItems: 'start',flexWrap:'wrap'}}>
        <FirstCard />
        <TierCard title="Most Activity" names={names} count={count}/>
        <TierCard title="Least Activity" names={names} count={count}/>
      </div>
    </>
  );
};

export default SuperAdminDashboard;
