import React from "react";
import { Button } from "react-bootstrap";

const QuizOptions = ({ options, checkAnswer, nextQuestion, ...rest }) => {
  const [disabled, setDisabled] = React.useState(false);
  return options.map((each, idx) => (
    <Button
      block
      size="lg mb-3"
      variant="warning"
      disabled={disabled}
      key={`key-${each}-${idx}`}
      onClick={() => {
        setDisabled(true);
        checkAnswer(idx);
        setTimeout(() => {
          nextQuestion();
          setDisabled(false);
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
  options: ["option", "option", "option", "option"],
};
