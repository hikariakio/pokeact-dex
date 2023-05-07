import { BGColor, ShadowColor, TxtColor } from "../_helper/CustomColor";
import React from "react";

export function DetailBar(props) {
  return (
    <div
      className="detail-bar"
      style={{
        backgroundColor: BGColor[props.colorName],
        textShadow: `1px 1px 1px ${ShadowColor[props.colorName]}`,
      }}
    >
      <p style={{ color: TxtColor[props.colorName] }}>{props.text}</p>
    </div>
  );
}

export function DetailInfo(props) {
  return (
    <div
      className={"detail-info"}
      style={{
        borderColor: BGColor[props.colorName],
      }}
    >
      <div className={"center"} style={{ width:"100%", aspectRatio:"1", maxHeight:"450px"  }}>
        {props.mainInfo}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "40px",
        }}
      >
        <h4>{props.title}</h4>
        {props.titleDetails}
      </div>
    </div>
  );
}
