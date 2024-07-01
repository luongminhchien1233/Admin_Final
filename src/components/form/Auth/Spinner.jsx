import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = ({path = ""}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        className="flex flex-col justify-center items-center h-screen"
      >
        <h1 className="text-center text-3xl">redirecting to you in {count} second </h1>
        <div className="" role="status">
          <span className="text-center text-lg">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;