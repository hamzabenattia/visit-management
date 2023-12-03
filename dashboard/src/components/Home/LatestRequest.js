import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const LatestRequest = (props) => {
  const { loading, error, requests } = props;


  const newFilter = requests?.filter((value) => {
    return value.Status==="Pending"
  });

console.log(newFilter)




  return (
    <div className="card-body">
      <h4 className="card-title">Nouvelles Demande:</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {newFilter.slice(0,5).map((request) => (
                <tr key={request._id}>
                  <td>
                   <b>{request.user?.firstname} {" "}{request.user.lastname}</b>
                  </td>
                  <td>{request.user.email}</td>
                  <td>{request.visitdate}</td>
                  <td>
              {request.Status ==="Accepted" ? (
                <span className="badge btn-success">Accepté</span>
              ) : request.Status ==="Refused" ? (
                <span className="badge btn-danger">Refusé </span>
              ):  <span className="badge btn-warning">Attente </span>
            }
            </td>
                  <td>{request.object}</td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/demande/${request._id}`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestRequest;
