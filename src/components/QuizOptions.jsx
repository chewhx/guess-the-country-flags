import React from "react";
import { Button } from "react-bootstrap";

const QuizOptions = ({ options, checkAnswer, nextQuestion, ...rest }) => {
  return options.map((each, idx) => (
    <Button
      block
      size="lg mb-3"
      variant="warning"
      key={`key-${each}-${idx}`}
      onClick={() => {
        checkAnswer(idx);
        setTimeout(() => {
          nextQuestion();
        }, 500);
      }}
      {...rest}
    >
      <strong>{each}</strong>
    </Button>
  ));
};

export default QuizOptions;

QuizOptions.defaultProps = {
  options: ["option1", "option2", "option3", "option4"],
};
