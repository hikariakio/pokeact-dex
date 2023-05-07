import React, { useState } from "react";

export function FilterBox(props) {
  const [sortTypeIdx, setSortTypeIdx] = useState(0);
  const [sortOrder, setSortOrder] = useState(false); // false for asc, true for desc
  const [searchPokeName, setSearchPokeName] = useState("");

  const sortButtons = [
    {
      name: "enc.",
      sorting: [
        {
          sort: function (a, b) {
            return a.dfid - b.dfid;
          },
        },
        {
          sort: function (b, a) {
            return a.dfid - b.dfid;
          },
        },
      ],
    },
    {
      name: "idx.",
      sorting: [
        {
          sort: function (a, b) {
            return a.id - b.id;
          },
        },
        {
          sort: function (b, a) {
            return a.id - b.id;
          },
        },
      ],
    },
    {
      name: "a-z.",
      sorting: [
        {
          sort: function (a, b) {
            return a.name.localeCompare(b.name);
          },
        },
        {
          sort: function (b, a) {
            return a.name.localeCompare(b.name);
          },
        },
      ],
    },
    {
      name: "wgt.",
      sorting: [
        {
          sort: function (a, b) {
            if (a.weight !== b.weight) return a.weight - b.weight;
            else return a.dfid - b.dfid;
          },
        },
        {
          sort: function (b, a) {
            if (a.weight !== b.weight) return a.weight - b.weight;
            else return a.dfid - b.dfid;
          },
        },
      ],
    },
    // {
    //   name: "hgt.",
    //   sorting: [
    //     {
    //       sort: function (a, b) {
    //         return a.height - b.height;
    //       },
    //     },
    //     {
    //       sort: function (b, a) {
    //         return a.height - b.height;
    //       },
    //     },
    //   ],
    // },
  ];

  return (
    <div className={"filter-box center"}>
      <div className={"filter-row"}>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          maxLength="20"
          placeholder="Type to search..."
          value={searchPokeName}
          onChange={(event) => {
            var regex = /^[a-zA-Z]*$/;
            var searchKey = event.target.value;

            if (!regex.test(searchKey)) {
              searchKey = searchKey.replace(/[^a-zA-Z]/g, '');
            }
            setSearchPokeName(searchKey);
            props.searchPoke(
              searchKey,
              sortButtons[sortTypeIdx]["sorting"][Number(sortOrder)]["sort"]
            );
          }}
        />
        <img src={require(`../assets/misc/small_pokeball.png`)} />
      </div>
      <div className={"filter-row"}>
        <div
          style={{
            display: "flex",
            // justifyContent:"center"
          }}
        >
          <div>Sort : &nbsp;</div>
          <div className="sort-button-container">
            {sortButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => {
                  var ord;
                  if (sortTypeIdx === index) {
                    ord = sortOrder;
                    ord = !ord;
                    setSortOrder(ord);
                  } else {
                    ord = false;
                    setSortOrder(ord);
                  }
                  props.sortPoke(button["sorting"][Number(ord)]["sort"]);
                  setSortTypeIdx(index);
                }}
                className={`sort-button ${index === sortTypeIdx && "active"}`}
              >
                {button["name"]}
                <span className="arrow-container">
                  <span className={`arrow up-arrow ${index === sortTypeIdx && sortOrder === false && "active"}`}>&#9650;</span>
                  <span className={`arrow down-arrow ${index === sortTypeIdx && sortOrder === true && "active"}`}>&#9660;</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        {/*<div>*/}
        {/*  <p>View :</p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
