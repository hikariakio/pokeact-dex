import Grid from "@mui/material/Unstable_Grid2";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { CreditModal } from "./CreditModal";

export function Footer() {
  return (
    <div
      style={{
        backgroundColor: "#333",
        color: "#fff",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginTop: "auto",
      }}
    >
      <Grid container>
        <Grid
          xs={12}
          sm={6}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <h4>About</h4>
            <ul>
              <li>
                <a>Ye Gaung Kyaw</a>
              </li>
              <li>
                <a>n10923543-IFN666</a>
              </li>
              <li>
                <a>Web&Mobile App Development</a>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="center">
            <h4> Pokéact-DEX &copy; 2023</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  padding: "0.3rem",
                }}
              >
                <YouTubeIcon fontSize="small" />
              </div>
              <div
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  padding: "0.3rem",
                }}
              >
                <LinkedInIcon fontSize="small" />
              </div>
              <div
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  padding: "0.3rem",
                }}
              >
                <GitHubIcon fontSize="small" />
              </div>
            </div>
            <CreditModal />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
