import React from "react";

export function GIF(props) {
  return (
    <div className={"gif"}>
      <img
        src={require(`../assets/misc/${props.gifName}.gif`)}
        alt={`loading`}
      />
      <h6 className="bling-anim" bling-text={props.gifTitle} />
    </div>
  );
}
