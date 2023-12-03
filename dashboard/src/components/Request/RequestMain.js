import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Request from "./Request";
import { Link } from "react-router-dom";
import moment from "moment";
import { listRequests } from "../../Redux/Actions/RequestActions";

const RequestMain = () => {
  const requestList = useSelector((state) => state.requestList);
  const { loading, error, requests } = requestList;
  const dispatch = useDispatch();



  //Pagination 
  const [pageNumber, setPageNumber] = useState(0);
  const [RequestPerPage, setRequestPerPage] = useState(10);

  const pagesVisited = pageNumber * RequestPerPage;


    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    useEffect(() => {
      dispatch(listRequests())

    }, [ dispatch]);
  
//


const [filteredData, setFilteredData] = useState([]);
const [wordEntered, setWordEntered] = useState("");
const userLogin = useSelector((state) => state.userLogin);
const {userInfo } = userLogin;




const handleFilter = (event) => {
  const searchWord = event.target.value;
  setWordEntered(searchWord);
  const newFilter = requests.filter((value) => {
    console.log(value)
    return  value.user.firstname.toLowerCase().includes(searchWord.toLowerCase()) ||
            value.user.lastname.toLowerCase().includes(searchWord.toLowerCase()) || 
            moment(value.createdAt).format('DD/MM/YYYYY').toLowerCase().includes(searchWord.toLowerCase()) || 
            value.Status.toLowerCase().includes(searchWord.toLowerCase())

          });

  console.log(filteredData)


  if (searchWord === "") {
    setFilteredData([]);
  } else {
    setFilteredData(newFilter);
  }
};


  return (
    <section className="content-main">
      <div className="content-header">
 
    <h2 className="content-title">Liste des demande</h2>
    {userInfo.user?.isAdmin || userInfo.isAdmin  ? <></>:
    <Link to="/demande/add" style={{background: "#237c8d", borderColor:"#237c8d"}} className="btn btn-info text-white">
  Ajouter une demande
            </Link>}
  </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
              onChange={handleFilter}
                type="text"
                placeholder="Recherche..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            <select onChange={(e) => setRequestPerPage(e.target.value)} className="form-select">
                <option value={10}>Afficher 10</option>
                <option value={20}>Afficher 20</option>
                <option value={30}>Afficher 30</option>
                <option value={requests?.length}>Afficher tout</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            <select onChange={handleFilter} className="form-select">
                <option value={""}>Tout</option>
                <option value={"Pending"}>En Attent</option>
                <option value={"Refused"}>Refusée</option>
                <option value={"Accepted"}>Acceptée</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date de la demande</th>
                  <th scope="col">Demandeur</th>
                  <th scope="col">Objet</th>
                  <th scope="col">Date de visite</th>
                  <th scope="col">Horaire de visite</th>
                  <th>Statut</th>
                  <th scope="col" className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {wordEntered ==="" ? (<> {requests.slice(pagesVisited, pagesVisited + RequestPerPage).map((r) => (
              <Request request={r} />
              ))}</>): (<> {filteredData.slice(pagesVisited, pagesVisited + RequestPerPage).map((r) => (
                <Request request={r} />
                ))}</>)}
              </tbody>
    </table>
            
            )}
          </div>
        </div>
        <nav className="float-end mt-4" aria-label="Page navigation">
          <div className="float-end mt-4" aria-label="Page navigation">
<ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant"}
        pageCount={Math.ceil(requests?.length / RequestPerPage)}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /> 
    </div>
          </nav>
      </div>
    </section>
  );
};

export default RequestMain;
