import React, { useState } from 'react'
import { Button,Col, Drawer, Form, Input, Row, Select } from 'antd'
import { useDispatch } from 'react-redux';
import { deleteUser, listUser, updateUser } from '../../../Redux/Actions/AdminAction';
import Logo from '../../../images/user.png'

import moment from 'moment';
import { Link } from 'react-router-dom';

const User = ({user}) => {
    const [open2, setOpen2] = useState(false);
    const dispatch = useDispatch();
    const { Option } = Select;

    const showDrawer2 = () => {
        setOpen2(true);
      };
      
      const onClose2 = () => {
        setOpen2(false);
      };

      const deletehandler = (id) => {
        if (window.confirm("Are you sure??")) {
          dispatch(deleteUser(id));
          dispatch(listUser());
        }
      };

      const onEdit = (values) => {
        dispatch(updateUser(values));  
        setOpen2(false)
        dispatch(listUser());
      };


  return (
   <>
      <Drawer
                      title="Modifier un Utilisateur"
                      width={720}
                      onClose={onClose2}
                      open={open2}
                      bodyStyle={{
                        paddingBottom: 80,
                      }}
                   
                    >
                      <Form layout="vertical"  onFinish={onEdit}>
                      <Form.Item name="id" hidden initialValue={user._id} defaultValue={user._id}>
        <Input />
      </Form.Item>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              name="firstname"
                              label="Prenom"
                              
                          
                            >
                              <Input placeholder="Prenom" defaultValue={user.firstname} initialValue={user.firstname}/>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                          <Form.Item
                              name="lastname"
                              label="Nom"
                              
                            >
                              <Input placeholder="Nom" initialValue={user.lastname}  defaultValue={user.lastname} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                              name="cin"
                              label="Cin"
                              
                            >
                              <Input placeholder="CIN" defaultValue={user.cin} initialValue={user.cin} />
                            </Form.Item>
                          </Col> 
                          <Col span={12}>
                          <Form.Item
                              name="email"
                              label="Email"
                             
                            >
                              <Input placeholder="Email" defaultValue={user.email} initialValue={user.email} />
                            </Form.Item>
                          </Col>
                          
                        </Row>
              
                        <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                              name="phonenum"
                              label="Numéro de Téléphone"
                             
                            >
                              <Input placeholder="Numéro de Téléphone" defaultValue={user.phonenum} initialValue={user.phonenum} />
                            </Form.Item>
                          </Col> 
                          <Col span={12}>
                          <Form.Item
                              name="socite"
                              label="Nom du société"
                             
                            >
                              <Input placeholder="Nom du société" defaultValue={user.socite} initialValue={user.socite} />
                            </Form.Item>
                          </Col>
                          
                        </Row>
              
                        <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                              name="sociteAdress"
                              label="Adresse de société"
                              
                            >
                              <Input placeholder="Adresse de société"  defaultValue={user.sociteAdress} initialValue={user.sociteAdress}/>
                            </Form.Item>
                          </Col> 
                          <Col>
                          <Form.Item
                                          name="isAdmin"
                                          label="Role:"
                                         
                                        >
                                          <Select
                                            placeholder="Sélectionner un choix"
                                            allowClear
                                            initialValue={user.isAdmin}
                                          >
                                            <Option value={"true"}>Admin</Option>
                                            <Option value={"false"}>Utilisateur</Option>
              
                                          </Select>
                                        </Form.Item>
                          </Col>
                        </Row>
                       <Row>
                        
                       </Row>
                        <Button  type="primary" htmlType="submit" >
                            Modifier 
                          </Button>
                         
                      </Form>
                    </Drawer> 
                     
                    <tr>
                        <td></td>
                        <td><a href="#"><img src={user.avatar || Logo }  className="avatar" alt="Avatar"/> {user.firstname} {user.lastname}</a></td>
                        <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>                        
                        <td>{user.isAdmin ? <>Admin</> : <>Utilisateur</>}</td>
                        <td> {user.isActive ? <><span  className="status text-success">&bull;</span> Active</> :<><span  className="status">&bull;</span> Désactiver</>}</td>
                        <td className='d-flex'>
                        <Link  onClick={showDrawer2} className="settings" title="" data-toggle="tooltip" data-original-title="Settings"><i className="fas fa-user-edit"></i></Link>
                    
                        {user.isActive ? <Link to="#" onClick={() => deletehandler(user._id)} title="" data-toggle="tooltip" data-original-title="Delete"><i className="fas fa-toggle-on" style={{color: "#237c8d"}}></i></Link>:
                        

                        <Link to="#" onClick={() => deletehandler(user._id)} className="" title="" data-toggle="tooltip" data-original-title=""><i className="fad fa-toggle-off"></i>
                        </Link>}
                        </td>
                    </tr>
   </>
  )
}

export default User