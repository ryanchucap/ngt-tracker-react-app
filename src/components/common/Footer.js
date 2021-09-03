import React from "react";
import "./common.css";

const Footer = () => {
    return (
        <div
            style={{
                textAlign: "center",
                width: "100%",
                boxSizing: "border-box!important",
                marginRight: "auto",
                fontFamily: "'Playfair Display',serif",
                position: "relative",
                bottom: "0",
                clear: "both",
            }}
        >
            <hr />
            <h3
                style={{
                    backgroundColor: "#1abc9c",
                    paddingTop: "50px",
                    paddingBottom: "50px",
                    width: "100%",
                    boxSizing: "border-box!important",
                }}
            >
                Capgemini Inc. | 2021
            </h3>
        </div>
    );
};

export default Footer;
