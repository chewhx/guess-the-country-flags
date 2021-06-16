import { useState, useEffect } from "react";
import randomSelect from "../utils/randomSelect";

export default function Quiz(
  json,
  { shuffleQuestions, shuffleOptions, loop, optionsArray }
) {
  const [data, setData] = useState(json);
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [questions, setQuestions] = useState({
    previous: null,
    current: null,
    next: null,
    hasNext: true,
    hasPrevious: false,
    total: 0,
    remaining: 0,
  });
  const [stats, setStats] = useState({
    attempts: 0,
    correct: 0,
    incorrect: 0,
  });

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const resetGame = () => {
    let newData = [];

    setResults([]);

    setStats({
      attempts: 0,
      correct: 0,
      incorrect: 0,
    });

    if (shuffleQuestions) {
      let arr = [];
      for (let i = 0; i < json.length; i++) {
        arr.push(i);
      }

      arr = shuffleArray(arr);

      let oldData = [...json];
      newData = arr.map((each) => oldData[each]);
      setData(newData);
    }
    setQuestions({
      previous: loop ? data[data.length - 1] : null,
      current: newData[index] || data[index],
      next: newData[index + 1] || data[index + 1],
      hasNext: true,
      hasPrevious: false,
      total: data.length,
      remaining: loop ? null : data.length - 1,
    });
    if (loop) {
      setPrevIndex(data.length - 1);
      setNextIndex(1);
    }
  };

  useEffect(() => {
    resetGame();
  }, [json]);

  const populateOptions = (num) => {
    setData((prev) => {
      for (let each of prev) {
        const newOptions = [...randomSelect(optionsArray, 3), each.answer];
        each.options = [...newOptions];
        each.answer = newOptions.indexOf(each.answer);
      }
      return prev;
    });
  };
  const previousQuestion = () => {
    if (questions.previous === null) return false;
    if (loop) {
      setPrevIndex((prev) => {
        if (prev === 0) {
          return data.length - 1;
        }
        return prev - 1;
      });
      setNextIndex((prev) => {
        if (prev === 0) {
          return data.length - 1;
        }
        return prev - 1;
      });
    }
    setIndex((prev) => {
      if (prev === 0 && loop) {
        return data.length - 1;
      }
      if (prev === 0 && !loop) {
        return prev;
      } else {
        return prev - 1;
      }
    });
    setQuestions((prev) => ({
      ...prev,
      previous: loop
        ? data[prevIndex - 1] || data[data.length - 1]
        : data[index - 2] || null,
      current: prev.previous,
      next: prev.current,
      hasNext: true,
      hasPrevious: data[index - 2] === undefined ? false : true,
      remaining: loop ? null : prev.remaining + 1,
    }));
  };

  const nextQuestion = () => {
    if (questions.next === null) return false;
    if (loop) {
      setNextIndex((prev) => {
        if (prev === data.length - 1) {
          return 0;
        }
        return prev + 1;
      });
      setPrevIndex((prev) => {
        if (prev === data.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }
    setIndex((prev) => {
      if (prev === data.length - 1 && loop) {
        return 0;
      }
      if (prev === data.length - 1) {
        return prev;
      } else {
        return prev + 1;
      }
    });
    setQuestions((prev) => ({
      ...prev,
      previous: prev.current,
      current: prev.next,
      next: loop ? data[nextIndex + 1] || data[0] : data[index + 2] || null,
      hasPrevious: true,
      hasNext: data[index + 2] === undefined ? false : true,
      remaining: loop ? null : prev.remaining - 1,
    }));
  };

  // prevent double checks
  // stop checks if no more questions
  const checkAnswer = (number) => {
    if ("correct" in questions.current) return false;
    const answer = questions.current.answer;
    const isMatch = answer == number;

    if (isMatch) {
      setQuestions((prev) => {
        setResults((prevRes) => [
          {
            ...prev.current,
            correct: true,
          },
          ...prevRes,
        ]);

        return {
          ...prev,
          current: {
            ...prev.current,
            correct: true,
          },
        };
      });
      setStats((prev) => ({
        ...prev,
        attempts: (prev.attempts += 1),
        correct: (prev.correct += 1),
      }));
    }
    if (!isMatch) {
      setQuestions((prev) => {
        setResults((prevRes) => [
          {
            ...prev.current,
            correct: false,
          },
          ...prevRes,
        ]);
        return {
          ...prev,
          current: {
            ...prev.current,
            correct: false,
          },
        };
      });
      setStats((prev) => ({
        ...prev,
        attempts: (prev.attempts += 1),
        incorrect: (prev.incorrect += 1),
      }));
    }
    return isMatch;
  };

  return {
    index,
    prevIndex,
    nextIndex,
    questions,
    stats,
    previousQuestion,
    nextQuestion,
    checkAnswer,
    populateOptions,
    results,
    resetGame,
  };
}
