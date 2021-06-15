import { useState, useEffect } from "react";

export default function Quiz(
  json,
  options = {
    shuffleQuestions: true,
    shuffleOptions: false,
    loop: true,
  }
) {
  const [data, setData] = useState(json);
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

  useEffect(() => {
    let newData = [];
    if (options.shuffleQuestions) {
      let arr = [];
      for (let i = 0; i < json.length; i++) {
        arr.push(i);
      }

      arr = shuffleArray(arr);
      console.log(arr);
      let oldData = [...json];
      newData = arr.map((each) => oldData[each]);
      setData(newData);
    }
    setQuestions({
      previous: options.loop ? data[data.length - 1] : null,
      current: newData[index] || data[index],
      next: newData[index + 1] || data[index + 1],
      hasNext: true,
      hasPrevious: false,
      total: data.length,
      remaining: options.loop ? null : data.length - 1,
    });
    if (options.loop) {
      setPrevIndex(data.length - 1);
      setNextIndex(1);
    }
  }, []);

  const previousQuestion = () => {
    if (questions.previous === null) return false;
    if (options.loop) {
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
      if (prev === 0 && options.loop) {
        return data.length - 1;
      }
      if (prev === 0 && !options.loop) {
        return prev;
      } else {
        return prev - 1;
      }
    });
    setQuestions((prev) => ({
      ...prev,
      previous: options.loop
        ? data[prevIndex - 1] || data[data.length - 1]
        : data[index - 2] || null,
      current: prev.previous,
      next: prev.current,
      hasNext: true,
      hasPrevious: data[index - 2] === undefined ? false : true,
      remaining: options.loop ? null : prev.remaining + 1,
    }));
  };

  const nextQuestion = () => {
    if (questions.next === null) return false;
    if (options.loop) {
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
      if (prev === data.length - 1 && options.loop) {
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
      next: options.loop
        ? data[nextIndex + 1] || data[0]
        : data[index + 2] || null,
      hasPrevious: true,
      hasNext: data[index + 2] === undefined ? false : true,
      remaining: options.loop ? null : prev.remaining - 1,
    }));
  };

  // prevent double checks
  // stop checks if no more questions
  const checkAnswer = (number) => {
    if (questions.current.checked === true) return false;
    const answer = questions.current.answer;
    const isMatch = answer === number;
    setQuestions((prev) => ({
      ...prev,
      current: {
        ...prev.current,
        checked: true,
      },
    }));
    if (isMatch) {
      setStats((prev) => ({
        ...prev,
        attempts: (prev.attempts += 1),
        correct: (prev.correct += 1),
      }));
    }
    if (!isMatch) {
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
    stats,
    numOfQuestions: data.length,
    checkAnswer,
    nextQuestion,
    previousQuestion,
    questions,
  };
}
