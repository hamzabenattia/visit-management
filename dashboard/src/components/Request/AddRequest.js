import React, { useEffect, useState } from "react";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  TimePicker,
  Form,
  Input,
  Space,
  Select,
  DatePicker,
} from "antd";

import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { createRequest } from "../../Redux/Actions/RequestActions";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";

const AddRequest = () => {
  const { Option } = Select;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const requestCreate = useSelector((state) => state.requestCreate);
  const { loading, error, request } = requestCreate;

  const dispatch = useDispatch();

  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      visithour: selectedHour,
      visitdate: selectedDate,
    };

    dispatch(createRequest(values));
  };
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  useEffect(() => {
    if (request) {
      toast.success("Demande Ajouter", ToastObjects);
      dispatch({ type: "REQUEST_CREATE_RESET" });
    }
  }, [request, dispatch,ToastObjects]);

  function handleDateChange(time, timeString) {
    setSelectedDate(timeString);
  }

  function handleTimeChange(time, timeString) {
    setSelectedHour(timeString);
  }

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1000px" }}>
        <div className="content-header">
          <h2 className="content-title">Ajouter une nouvelle demande</h2>
        </div>
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <section className="content-body mx-auto">
                  <Form
                    className="mx-auto"
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
                    style={{
                      maxWidth: 700,
                    }}
                    autoComplete="off"
                  >
                    {" "}
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="row gx-3">
                          <Form.Item
                            name="site"
                            label="Site concerné :"
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
                              <Option value="Enfidha">Enfidha</Option>
                            </Select>
                          </Form.Item>

                          <Form.Item
                            name="Local"
                            label="Local concerné:"
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
                              <Option value="Enfidha">Enfidha</Option>
                            </Select>
                          </Form.Item>

                          <Form.Item
                            name="object"
                            label="Objet de la demande :"
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
                              <Option value="Ajout d’équipements">Ajout d’équipements</Option>
                              <Option value="Récupération d’équipements">
                                Récupération d’équipements
                              </Option>
                            </Select>
                          </Form.Item>

                          <Form.List name="personnes">
                            {(fields, { add, remove }) => (
                              <>
                                {fields.map(({ key, name, ...restField }) => (
                                  <Space
                                    key={key}
                                    style={{
                                      display: "flex",
                                      marginBottom: 8,
                                    }}
                                    align="baseline"
                                  >
                                    <Form.Item
                                      {...restField}
                                      name={[name, "fullname"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Nom manquant",
                                        },
                                      ]}
                                    >
                                      <Input
                                        className="form-control"
                                        placeholder="Prénom et NOM"
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "cin"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "CIN manquant",
                                        },
                                      ]}
                                    >
                                      <Input
                                        className="form-control"
                                        placeholder="N° de la pièce d’identité"
                                      />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                      onClick={() => remove(name)}
                                    />
                                  </Space>
                                ))}
                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                  >
                                    Ajouter un autre personnes
                                  </Button>
                                </Form.Item>
                              </>
                            )}
                          </Form.List>

                          <Form.Item
                            name="visitdate"
                            label="Date de l’intervention/visite:"
                            rules={[
                              {
                                required: true,
                                message: "Date de l’intervention manquant",
                              },
                            ]}
                          >
                            <DatePicker
                              format={"DD/MM/YYYY"}
                              onChange={handleDateChange}
                            />
                          </Form.Item>

                          <Form.Item
                            label="Heure de l’intervention/visite :"
                            name="visithour"
                            rules={[
                              {
                                required: true,
                                message:
                                  "Heure de l’intervention/visite manquant",
                              },
                            ]}
                          >
                            <TimePicker
                              format={"HH:mm"}
                              onChange={handleTimeChange}
                            />
                          </Form.Item>

                          <Form.Item>
                            <Button type="primary" htmlType="submit" style={{background:"#237C8D", borderColor:"#ffffff", margin:"0 200px"}} >
                              Submit
                            </Button>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </Form>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRequest;
