import React from "react";
import "./SmallDataCard.css";
import Loading from "../Shared/Loading";
import DountCard from "../Charts/DonutCard";

const SmallDataCard = ({ data, isloading }) => {
  return (
    <div className="smalldatacard">
      <div className="smalldatacardleft">
        <p>{data[0].label}</p>
        <h3>{data[0].value}</h3>
      </div>
      <div className="smalldatacardright">
        {isloading ? <Loading /> : <DountCard data={data} />}
      </div>
    </div>
  );
};

export default SmallDataCard;
