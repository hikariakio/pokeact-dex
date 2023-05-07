import React, {useEffect, useState} from "react";
import {BGColor} from "../_helper/CustomColor";
import RadarChart from "react-svg-radar-chart";

export function Radar(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const baseStats = props.stats.map((stat) => stat.base_stat);
    const maxBaseStat = Math.max(...baseStats) + 50;

    const data = [
        {
            data: {
                hp: props.stats[0]["base_stat"] / maxBaseStat,
                attack: props.stats[1]["base_stat"] / maxBaseStat,
                defense: props.stats[2]["base_stat"] / maxBaseStat,
                s_attack: props.stats[3]["base_stat"] / maxBaseStat,
                s_defense: props.stats[4]["base_stat"] / maxBaseStat,
                speed: props.stats[5]["base_stat"] / maxBaseStat,
            },
            meta: { color: BGColor[props.color] },
        },
    ];

    const captions = {
        // columns
        hp: `HP ${props.stats[0]["base_stat"]}`,
        defense: `Def ${props.stats[2]["base_stat"]}`,
        attack: `Atk ${props.stats[1]["base_stat"]}`,
        speed: `Speed ${props.stats[5]["base_stat"]}`,
        s_attack: `S.Atk ${props.stats[3]["base_stat"]} `,
        s_defense: `S.Def ${props.stats[4]["base_stat"]} `,
    };

    return (
        <>
            <RadarChart
                captions={captions}
                data={data}
                size={Math.min(windowWidth-10, 450)}
                options={{
                    scales: 10,
                    axes: true,
                    rotation: 0,
                    // dots: true,
                    // smoothing: noSmoothing, // shape smoothing function
                    axisProps: () => ({ className: "axis" }),
                    scaleProps: () => ({
                        className: "scale",
                        fill: BGColor[props.color],
                    }),
                    shapeProps: () => ({ className: "shape" }),
                    captionProps: () => ({
                        className: "caption",
                        style: {
                            display: "block",
                            width: 1,
                            height: 1,
                            textAnchor: "middle",
                            overflow: "auto",
                        },
                    }),
                    // wrapCaptionAt: 8,
                    // captionLineHeight: 20,
                    dotProps: () => ({
                        className: "dot",
                        fill: BGColor[props.color],
                        mouseEnter: (dot) => {
                            console.log(dot);
                        },
                        mouseLeave: (dot) => {
                            console.log(dot);
                        },
                    }),
                    // setViewBox: (options) =>
                    //   `-${options.captionMargin} 0 ${
                    //     options.size + options.captionMargin * 5
                    //   } ${options.size}`, // custom viewBox ?
                }}
            />
        </>
    );
}
