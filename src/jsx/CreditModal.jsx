import { Button, Modal } from "@mui/material";
import React from "react";

export function CreditModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        style={{
          textDecoration: "none",
          marginTop: "10px",
          color: "white",
          borderBottom: "4px solid #ccc",
        }}
        onClick={handleOpen}
      >
        {" See Credits "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "5%",
        }}
        componentsProps={{
          backdrop: {
            style: { backgroundColor: "#111", opacity: "0.9" },
          },
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            backgroundColor: "white",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "0 5% 0 5%",
            border: "2px solid #000",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h5
            style={{
              borderBottom: "2px solid #000",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            WELCOME TO THE POKÉACT-DEX
          </h5>

          <h6>ABOUT</h6>
          <span> v1.0</span>
          <span>
            The current Pokédex is created using the data from&nbsp;
            <a href="https://pokeapi.co/" target="_blank">
              PokéAPI
            </a>
            . (Up to Gen-9)
          </span>
          <span>The PokéAPI database is accurate but it's not perfect.</span>
          <br />
          <h6>SPECIAL THANKS</h6>
          <span>
            <a href="https://pokeapi.co/" target="_blank">
              PokéAPI
            </a>
            &nbsp;for the data.&nbsp;
            <a href="https://dribbble.com/lilong" target="_blank">
              Lilong
            </a>
            &nbsp;&&nbsp;
            <a href="https://dribbble.com/RemovT" target="_blank">
              RemovT
            </a>
            &nbsp; for awesome GIFs.
          </span>
          <span>
            Nintendo, Game Freak and The Pokémon Company for this awesome
            franchise of game.
          </span>
          <br />
          <h6>CONTACT</h6>
          <span>
            If you enjoy this, you can kudos the&nbsp;
            <a href="https://github.com/hikariakio/pokeact-dex" target="_blank">
              repo
            </a>
            .
          </span>
          <span>
            Please also visit my&nbsp;
            <a href="http://yginnovatory.com" target="_blank">
              homepage
            </a>
            &nbsp;to see other awesome projects.
          </span>
          <br />
          <h6>DISCLAIMER</h6>
          <span>This is an unofficial, fan-made website.</span>
          <span>NOT AFFILIATED with NINTENDO/GameFreak.</span>
          <span>No Copyright Infringement intended.</span>
          <br />
          <br />
          <span> Developed by Ye Gaung</span>
          <span> Built with React.js</span>
          <span> Made with ❤️ for Pokémon</span>
          <br />
        </div>
      </Modal>
    </>
  );
}
