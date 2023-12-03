import React from "react";

const TopTotal = ({requests}) => {

  let Accepted = 0;
  let Refused = 0;
  let Pending = 0;
  if (requests) {
    requests.map((r) => {
      r.Status === "Accepted" ? (Accepted++) : r.Status === "Refused" ? (Refused++):Pending++ ;
    }
    );
  }


  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fal fa-clipboard-list"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Demandes Totales</h6>
              <span>{requests?.length}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fad fa-user-clock"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Demande en Attente</h6>
              <span>{Pending}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-user-check"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Demande Accepté:</h6>
             <span>{Accepted}</span>
            </div>
          </article>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-danger">
              <i className="text-danger fas fa-user-times"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Demande Refusé:</h6>
               <span>{Refused}</span>
            </div>
          </article>
        </div>
      </div>
      {/* {userInfo.user.isAdmin &&
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Produits Totaux:</h6>
              {products ? <span>{products.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>} */}
    </div>
  );
};

export default TopTotal;
