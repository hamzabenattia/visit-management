import React, { useEffect } from "react";
import TopTotal from "./TopTotal";
import LatestRequest from "./LatestRequest";
import { useDispatch, useSelector } from "react-redux";
import { listRequests } from "../../Redux/Actions/RequestActions";

const Main = () => {
  const requestList = useSelector((state) => state.requestList);
  const { loading, error, requests } = requestList;
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(listRequests());
  
   
  }, [dispatch]);


  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Tableau de bord</h2>
        </div>
        {/* Top Total */}
        <TopTotal requests={requests} products={{}} />


        {/* LATEST request */}
        <div className="card mb-4 shadow-sm">
      <LatestRequest requests={requests} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
