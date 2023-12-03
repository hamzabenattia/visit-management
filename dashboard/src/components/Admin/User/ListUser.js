import React, { useEffect, useState } from 'react'
import "./User.scss"
import Loading from '../../LoadingError/Loading'
import moment from 'moment'
import ReactPaginate from "react-paginate";
import { createUser, listUser } from '../../../Redux/Actions/AdminAction'
import { useDispatch, useSelector } from "react-redux";
import { Button,Col, Drawer, Form, Input, Row, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import Message from '../../LoadingError/Error'
import User from "./User";



const ListUser = () => {

    const [open, setOpen] = useState(false);
   
    const userList = useSelector((state) => state.userList);
    const { loading,error, users } = userList;
  
    const { Option } = Select;

    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };


    //Filter

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    
const handleFilter = (event) => {
  const searchWord = event.target.value;
  setWordEntered(searchWord);
  console.log(users)
  const newFilter = users.filter((value) => {
    console.log(value)
    return  value.firstname.toLowerCase().includes(searchWord.toLowerCase()) ||
            value.lastname.toLowerCase().includes(searchWord.toLowerCase()) ||
            moment(value.createdAt).format('DD/MM/YYYYY').toLowerCase().includes(searchWord.toLowerCase())

          });

  if (searchWord === "") {
    setFilteredData([]);
  } else {
    setFilteredData(newFilter);
  }
};

//pagination 
const [pageNumber, setPageNumber] = useState(0);
const [RequestPerPage, setRequestPerPage] = useState(10);

const pagesVisited = pageNumber * RequestPerPage;


  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
 


    const dispatch = useDispatch();

  
    const onFinish = (values) => {
      dispatch(createUser(values));  
      setOpen(false)
      dispatch(listUser());
    };
  

    useEffect(() => {
      dispatch(listUser());
    }, [dispatch]);
   

  return (
    <>
    {loading ? <Loading/> : error ? (
              <Message variant="alert-danger">{error}</Message>): <section className="content-main user">
              
    <div className="content-header">
  
          <h2 className="content-title"> List d'utilisateur</h2>
          <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      
                     </div>
                     
                  

        <Drawer
        title="Create a new account"
        width={720}
       
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
     
      >
        <Form layout="vertical"  onFinish={onFinish}  >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstname"
                label="Prenom"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer le prenom d'utilisateur",
                  },
                ]}
              >
                <Input placeholder="Prenom"/>
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="lastname"
                label="Nom"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer le nom d'utilisateur",
                  },
                ]}
              >
                <Input placeholder="Nom" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
            <Form.Item
                name="cin"
                label="Cin"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre cin",
                  },
                ]}
              >
                <Input placeholder="CIN" />
              </Form.Item>
            </Col> 
            <Col span={12}>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            
          </Row>

          <Row gutter={16}>
          <Col span={12}>
            <Form.Item
                name="phonenum"
                label="Numéro de Téléphone"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer un Numéro de Téléphone",
                  },
                ]}
              >
                <Input placeholder="Numéro de Téléphone" />
              </Form.Item>
            </Col> 
            <Col span={12}>
            <Form.Item
                name="socite"
                label="Nom du société"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer le Nom du société",
                  },
                ]}
              >
                <Input placeholder="Nom du société" />
              </Form.Item>
            </Col>
            
          </Row>

          <Row gutter={16}>
          <Col span={12}>
            <Form.Item
                name="sociteAdress"
                label="Adresse de société"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer un Adresse de soscite",
                  },
                ]}
              >
                <Input placeholder="Adresse de société" />
              </Form.Item>
            </Col> 
            <Col>
            <Form.Item
                            name="isAdmin"
                            label="Role:"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Select
                              placeholder="Sélectionner un choix"
                              allowClear
                            >
                              <Option value="true">Admin</Option>
                              <Option value="false">Utilisateur</Option>

                            </Select>
                          </Form.Item>
            </Col>
          </Row>
         
          <Button  type="primary" htmlType="submit">
              Ajouter 
            </Button>
           
        </Form>
      </Drawer>       


    <div  className="container-xl">
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
                <option value={users?.length}>Afficher tout</option>
              </select>
            </div>
          
          </div>
        </header>
    <div  className="table-responsive">
        <div  className="table-wrapper">
       
                <div  className="row">
                
            </div>
            <table  className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>						
                        <th>Date de création</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {wordEntered ==="" ? (<> {users.slice(pagesVisited, pagesVisited + RequestPerPage).map((r) => (
              <User user={r} />
              ))}</>): (<> {filteredData.slice(pagesVisited, pagesVisited + RequestPerPage).map((r) => (
                <User user={r} />
                ))}</>)} 
                    
                </tbody>
            </table>
    
        </div>
    </div>
    <nav className="float-end mt-4" aria-label="Page navigation">
          <div className="float-end mt-4" aria-label="Page navigation">
          <ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant"}
        pageCount={Math.ceil(users?.length / RequestPerPage)}
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
</section>}
    </>

      )
}

export default ListUser