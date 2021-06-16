import React from "react";
import { Image } from "react-bootstrap";

const FlagImage = ({ src, showAnswer, correctAnswer, ...rest }) => {
  return (
    <div
      className="mb-3 text-center d-flex justify-content-center align-content-center"
      style={{
        position: "relative",
        paddingTop: "calc(1.5rem + env(safe-area-inset-top)",
      }}
      {...rest}
    >
      <div
        hidden={!showAnswer}
        style={{
          position: "absolute",
          top: "15%",
          zIndex: "10",
        }}
        className={correctAnswer ? "text-success" : "text-danger"}
      >
        {correctAnswer ? (
          <>
            <i
              style={{ fontSize: "5rem" }}
              className="bi bi-check-circle-fill"
            ></i>
            <h3>CORRECT</h3>
          </>
        ) : (
          <>
            <i style={{ fontSize: "5rem" }} className="bi bi-x-circle-fill"></i>
            <h3>WRONG</h3>
          </>
        )}
      </div>

      <Image
        fluid
        style={showAnswer ? { filter: "grayscale(50%)", opacity: "30%" } : null}
        className="mb-4"
        src={src}
        {...rest}
      />
    </div>
  );
};

export default FlagImage;
