import "./styles.css";
import { useEffect, useState, useRef, useCallback } from "react";

const TIMEOUT = 1000;

const useStopwatch = () => {
  const [count, setCount] = useState(0);
  const timeOutRef = useRef(null);

  const onStop = useCallback(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = null;
    }
  }, []);

  const onStart = useCallback(() => {
    const onTimeout = () => {
      setCount(cur => cur+1);
      timeOutRef.current = setTimeout(onTimeout, TIMEOUT);
    };

    if (!timeOutRef.current) {
      setTimeout(onTimeout, TIMEOUT);
    }
  }, []);

  const onReset = useCallback(() => {
    onStop();
    setCount(0);
  }, [onStop]);

  useEffect(() => {
    onStart();
    return onStop;
  }, [onStop, onStart]);

  return [count, onStart, onStop, onReset];
}

export default function App() {
  const [count, onStart, onStop, onReset] = useStopwatch();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>{count}</div>
      <button onClick={onStop}>Stop</button>
      <button onClick={onStart}>Start</button>
      <button onClick={onReset}>Reset</button>

      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
