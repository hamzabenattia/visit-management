import React from "react";
import { Pie } from '@ant-design/plots';
import Loading from "../LoadingError/Loading";


const RequestStatistics = (props) => {


const { requests,loading  } = props;
let Accepted = 0;
let Refused = 0;
let Pending = 0;

if (requests) {
  requests.map((r) =>{
    r.Status === "Accepted" ? (Accepted++) : r.Status === "Accepted" ? (Refused++):Pending++ ;
  }
  );
}

  const data = [
    {
      type: 'En Attente',
      value: Pending,
    },
    {
      type: 'Accepté',
      value: Accepted,
    },
    {
      type: 'Refusé',
      value: Refused,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };





  return (
    <div className="col">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Statistiques des Demandes</h5>
          {loading ? (
              <Loading /> ):
          <Pie {...config} />
         
        }
        </article>
      </div>
    </div>
  );
};

export default RequestStatistics;
