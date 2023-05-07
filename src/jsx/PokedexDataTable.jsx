import {capitalizeFirstLetter} from "../_helper/helper";
import {BGColor} from "../_helper/CustomColor";
import React from "react";

export function PokeDexDataTable(props) {
    return (
        <div
            className={"center"}
            style={{
                marginTop: "1rem",
            }}
        >
            <h2>Pokédex Data</h2>

            <table>
                <tbody>
                <DataRow
                    colorName={props.colorName}
                    left="National №"
                    right={props.id}
                />
                <DataRow
                    colorName={props.colorName}
                    left="Weight"
                    right={`${props.weight / 10} kg`}
                />
                <DataRow
                    colorName={props.colorName}
                    left="Height"
                    right={`${props.height / 10} m`}
                />
                <DataRow
                    colorName={props.colorName}
                    left="Habitat"
                    right={capitalizeFirstLetter( props.habitat)}
                />
                <DataRow
                    colorName={props.colorName}
                    left="Base Exp."
                    right={props.baseExperience}
                />
                <DataRow
                    colorName={props.colorName}
                    left="Catch Rate"
                    right={props.catchRate}
                />

                </tbody>
            </table>
        </div>
    );
}

export function DataRow(props) {
    return (
        <tr
            style={{
                borderColor: BGColor[props.colorName],
            }}
        >
            <td className="right-align">{props.left} :</td>
            <td className="left-align">{props.right}</td>
        </tr>
    );
}