import React from "react";
import { useState, useRef, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Calendar from "react-calendar";
//import { Link } from "react-router-dom";

type bookingProps = {
  date: Date;
};

const Booking = ({ date }: bookingProps) => {
  const [value, onChange] = useState(new Date());

  const [showTimes, setShowTimes] = useState(false as boolean);
  const [timeData, setTimeData] = useState(new Date());
  const [bookingDate, showBookingDate] = useState(false as boolean);

  const [test, setTest] = useState(false);
  // const handleTest = () => {
  //   setTest(!test);
  // };

  // const handleClick = () => {
  //   setActive(!active);
  // };

  const divRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleTimes = () => {
    showBookingDate(false);
    setShowTimes(true);
    if (showTimes) setShowTimes(true);
    console.log(showTimes);
    //console.log(value.setHours(7));
    console.log(value);
    setTimeData(new Date());
  };
  const handleMonth = () => {
    setShowTimes(false);
    console.log(showTimes);
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  // const times: any[] = [
  //   `${value}`

  // ]

  const times: any[] = [
    7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  ];

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        alert("You clicked outside");
        console.log("OUTSIDE");
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
  }, []);
  return (
    <div ref={divRef} className="h-screen bg-slate-600">
      <OutsideClickHandler
        onOutsideClick={() => {
          setShowTimes(false);
        }}
      >
        <div className="flex justify-center items-center pt-64">
          <Calendar
            className={
              showTimes
                ? "rounded-l-lg shadow-lg duration-300"
                : "rounded-lg shadow-lg duration-300"
            }
            onChange={onChange}
            onClickDay={handleTimes}
            onClickMonth={handleMonth}
            onViewChange={handleMonth}
            value={value}
          />

          <button
            onClick={() => showBookingDate(true)}
            className={
              test
                ? "bg-red-500 text-white font-bold text-2xl shadow-lg px-4 py-2 h-[271px] duration-500"
                : "h-[0px] text-[0px] duration-700"
            }
          >
            Book Now
          </button>

          <div
            className={
              showTimes
                ? "w-[110px] h-[271px]  bg-gray-700 rounded-r-lg shadow-lg duration-500 overflow-y-scroll"
                : "w-[0px] h-[0px] bg-gray-700 rounded-r-lg duration-700"
            }
          >
            <ul className="w-[100%] text-center font-bold text-white">
              {times.map((time) => {
                const [active, setActive] = useState(false);
                return (
                  <>
                    <li className="my-2">
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setActive(false);
                          setTest(false);
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: active ? "red " : "",
                            cursor: active ? "default" : "",
                          }}
                          onClick={() => {
                            //console.log(time);
                            value.setHours(time);
                            //console.log(value);
                            setActive(!active);
                            setTimeData(value);
                            setTest(true);
                          }}
                          className={
                            showTimes
                              ? "w-[90%] py-1 rounded-md bg-blue-500 cursor-pointer cur shadow-lg"
                              : "hidden"
                          }
                        >
                          {time}:00
                        </button>
                      </OutsideClickHandler>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </OutsideClickHandler>
      {bookingDate && (
        <h1 className="text-center mt-4 text-white font-bold">
          All booked for {timeData.toString()}
        </h1>
      )}
    </div>
  );
};

export default Booking;
