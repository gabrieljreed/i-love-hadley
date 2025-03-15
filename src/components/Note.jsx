import Button from "./Button";
import { useState } from "react";
import DATA from "../data.js";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function getRandomIndex(array) {
  if (array.length === 0) {
    return undefined;
  }
  return Math.floor(Math.random() * array.length);
}

function formatDate(isoDate) {
  // Split YYYY-MM-DD and create a Date object in local time
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day); // Month is zero-based in JS

  return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
  }).format(date);
}

function getClosestDateIndex(dates) {
  const currentDate = new Date(); // Get current date
  let closestIndex = -1; // Initialize closest index to -1 (indicating no match found)
  let minDiff = Infinity; // Initialize the minimum difference to a large number

  dates.forEach((dateString, index) => {
    const date = new Date(dateString); // Convert the string date to a Date object
    const diff = Math.abs(currentDate - date); // Calculate the absolute difference

    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = index; // Store the index of the closest date
    }
  });

  return closestIndex;
}

const closestDateIndex = getClosestDateIndex(DATA.map((item) => item.date ));

export default function Note() {
  const [currentDataIndex, setCurrentDataIndex] = useState(closestDateIndex);
  const currentData = DATA[currentDataIndex];

  function handleRandomDateClicked() {
    setCurrentDataIndex(getRandomIndex(DATA));
  }

  function handleNextDateClicked() {
    setCurrentDataIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex >= DATA.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  }

  function handlePrevDateClicked() {
    setCurrentDataIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex >= DATA.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  }

  return (
    <div>
      <div className="relative h-screen w-full flex flex-col items-center justify-center text-center">
        {/* Full-screen background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 to-sky-400"></div>

        {/* Content with backdrop blur */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white drop-shadow-md mb-6">
            Why I Love Hadley ❤️
          </h1>

          <motion.div
            key={currentData.date}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md text-white"
          >
            <p className="text-lg font-semibold">
              {formatDate(currentData.date)}
            </p>
            <p className="mt-2 text-xl italic">{currentData.note}</p>
          </motion.div>

          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={handlePrevDateClicked}>{"<<"}</Button>
            <Button onClick={handleRandomDateClicked}>Random</Button>
            <Button onClick={handleNextDateClicked}>{">>"}</Button>
          </div>
          <footer className="text-neutral-100 text-sm italic text-center py-2 mt-auto">
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by Gabe
          </footer>
        </div>
      </div>
    </div>
  );
}
