import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {Col, Divider, Drawer, Row, Table, Button, Space,Modal, Input, Form,
  TimePicker,
  Select,
  DatePicker, } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { AcceptRequest, RefuseRequest, deleteRequest, listRequests } from "../../Redux/Actions/RequestActions";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import axios from "axios";


const Request = (props) => {
  const { request } = props;
  const { Option } = Select;

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [RefuseReason,setRefuseReason] = useState("")
  const [openModel, setOpenModel] = useState(false);
  const requestDeliver = useSelector((state) => state.requestDeliver);
  const { loading, success, error } = requestDeliver;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const requestRefused = useSelector((state) => state.requestRefused);
  const { loading:rLoading, success:rsuccess, error:rerror} = requestRefused;

  const requestDelete = useSelector((state) => state.requestDelete);
  const { loading:dLoading, success:dsuccess, error:derror} = requestDelete;


  const showModal = () => {
    setOpenModel(true);
  };
  const hideModal = () => {
    setOpenModel(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showDrawer2 = () => {
    setOpen2(true);
  };
  const onClose2 = () => {
    setOpen2(false);
  };


  const dispatch = useDispatch();

  const Accepthandler = (id) => {
    if (window.confirm("Êtes-vous sûr ?")) {
      dispatch(AcceptRequest(id));
    }
  };

  const Refusehandler = (id) => {
      dispatch(RefuseRequest(id,RefuseReason));
    
  };

  const deletehandler = (id) => {
    if (window.confirm("Êtes-vous sûr ?")) {
      dispatch(deleteRequest(id));
    }
  };

  useEffect(() => {
    if (success) {
      setOpen(false)
      dispatch({ type: "REQUEST_DELIVERED_RESET" });
      dispatch(listRequests());

    }
     if (rsuccess){
      setOpenModel(false);
      setOpen(false);
      dispatch({ type: "REQUEST_REFUSED_RESET" });

      
    }
   
  }, [rsuccess,dsuccess, success, dispatch]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  function handleDateChange(time, timeString) {
    setSelectedDate(timeString);
  }

  function handleTimeChange(time, timeString) {
    setSelectedHour(timeString);
  }




  const onEdit = async (fieldsValue) => {
    const values = {
      ...fieldsValue,
      visithour: selectedHour,
      visitdate: selectedDate,
    };
    try {
      const response = await axios.put(`/api/request/edit/${values.id}`, values);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(listRequests())
    }
    setOpen2(false)
  };

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
   );
   const fullname=request.user.firstname +" "+ request.user?.lastname;
  const columns = [
    {
      title: 'Prénom et Nom',
      dataIndex: 'fullname',
    },
    {
      title: 'N° de la pièce d’identité',
      dataIndex: 'cin',
    },
   ];
  
  return (
    <><Toast />
     <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>

<p className="site-description-item-profile-p">Information de la demande</p>
<Row>
  <Col span={12}>
    <DescriptionItem title="Demandeur" content={fullname} />
  </Col>
  <Col span={12}>
    <DescriptionItem title="Date de la demande" content={moment(request.createdAt).format('DD/MM/YYYY')} />
  </Col>
</Row>
<Row>
  <Col span={12}>
    <DescriptionItem title="Site concerné" content={request.site} />
  </Col>
  <Col span={12}>
    <DescriptionItem title="Local concerné" content={request.Local} />
  </Col>
</Row>
<Row>
  <Col span={12}>
    <DescriptionItem title="Objet de la demande" content={request.object} />
  </Col>
</Row>
<Row>
  <Col span={12}>
    <DescriptionItem title="Date de l’intervention/visite" content={request.visitdate} />
  </Col>
  <Col span={12}>
    <DescriptionItem title="Horaire de l’intervention/visite" content={request.visithour} />
  </Col>
</Row>


<Divider />
<p className="site-description-item-profile-p">Liste des personnes</p>

<Row>
 <Table
 pagination={false}
 columns={columns} dataSource={request.personnes} size="middle" />
</Row>
<Divider />

<Row>
  <Col span={24}>
       <Space
       direction="vertical"
       style={{
         width: '100%',
       }}
     >
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
       <Button type="primary" block onClick={() => Accepthandler(request._id)}>
         Accepter
       </Button>
       <Button onClick={showModal} block>Refuser</Button>
       </Space>
       <Modal
        title="Motif du refus:"
        open={openModel}
        onOk={() => Refusehandler(request._id,RefuseReason)}
        onCancel={hideModal}
        okText="Refuser"
        cancelText="Annuler"
      >
         <Form>
         {rLoading && <Loading />}
          <Form.Item
        name="RefuseReason"
        rules={[
          {
            required: true,
            message: 'Motif du refus',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={200} onChange={(e) =>setRefuseReason(e.currentTarget.value)}/>
      </Form.Item>
      </Form>
      </Modal>
       
  </Col>
</Row>
</Drawer>

<Drawer
                      title="Modifier le demande"
                      width={600}
                      onClose={onClose2}
                      open={open2}
                      bodyStyle={{
                        paddingBottom: 80,
                      }}
                   
                    >
                      <Form layout="vertical"  onFinish={onEdit}>
                      <Form.Item name="id" hidden initialValue={request._id} defaultValue={request._id}>
        <Input />
      </Form.Item>
                        <Row gutter={16}>
                          <Col span={12}>
                          <Form.Item
                            name="object"
                            label="Objet de la demande :"
                           
                          >
                            <Select
                              placeholder="Sélectionner un choix"
                              allowClear
                              initialValue={request.object}
                              defaultValue={request.object}
                            >
                              <Option value="Ajout d’équipements">Ajout d’équipements</Option>
                              <Option value="Récupération d’équipements">
                                Récupération d’équipements
                              </Option>
                            </Select>
                          </Form.Item>
                          </Col>
                        </Row>
                  

                        <Row gutter={16}>
                          <Col span={12}>
                          <Form.Item
                            name="visitdate"
                            label="Date de l’intervention/visite:"
                           
                          >
                            <DatePicker
                              format={"DD/MM/YYYY"}
                              initialValue={request.visitdate}
                              onChange={handleDateChange}
                            />
                          </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={16}>
                          <Col span={12}>
                          <Form.Item
                            label="Heure de l’intervention/visite :"
                            name="visithour"
                           
                          >
                            <TimePicker
                              format={"HH:mm"}
                              onChange={handleTimeChange}
                              initialValue={request.visithour}
                            />
                          </Form.Item>
                          </Col>
                        </Row>

                        
                        <Button  type="primary" htmlType="submit" disabled={request.Status!=="Pending"} >
                            Modifer 
                          </Button>
                          <Row>
                          {request.Status!=="Pending" && <>La demande a déjà été traitée, vous ne pouvez pas la modifier</>}
                          </Row>
                         
                      </Form>
                    </Drawer> 


          <tr key={request._id}>
            <td>
              <b>{moment(request.createdAt).format("DD/MM/YYYY")}</b>
            </td>
            <td>{request.user.firstname} {request.user?.lastname}</td>
            <td>{request.object}</td>
            <td>
              {request.visitdate}
            </td>
            <td>{request.visithour}</td>
            <td>
              {request.Status ==="Accepted" ? (
                <span className="badge btn-success">Accepté</span>
              ) : request.Status ==="Refused" ? (
                <span className="badge btn-danger">Refusé </span>
              ):  <span className="badge btn-warning">Attent</span>
            }
            </td>
            
            <td className="d-flex flex p-2 justify-content-between align-item-center">
               <Link to='#'> <i className="fas fa-trash-alt"  onClick={() => deletehandler(request._id)}></i></Link>
              {userInfo.isAdmin || userInfo.user?.isAdmin ? <Link> <i className="fas fa-eye" onClick={showDrawer}></i></Link> :<Link to={`/demande/${request._id}`}> <i className="fas fa-eye" ></i></Link>} 
              {userInfo.isAdmin || userInfo.user?.isAdmin? <></> :<Link> <i className="fas fa-edit" onClick={showDrawer2}></i></Link>} 
            </td>
          </tr>
          </>
  );
};

export default Request;
