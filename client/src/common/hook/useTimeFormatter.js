import { useState, useEffect, useRef } from 'react';

// Function to convert seconds into 1d 12h 30m 45s format
const formatTime = (totalSeconds) => {
  if (totalSeconds <= 0) {
    return '0d 0h 0m 0s'; // Handle the case where there is no time left
  }

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

// Custom hook for formatting time without re-rendering
const useTimeFormatter = (initialSeconds, isLoadingJokeEndTime) => {
  console.log(initialSeconds);

  const [formattedTime, setFormattedTime] = useState(() =>
    formatTime(initialSeconds !== undefined ? initialSeconds : 0)
  ); // Only set the initial formatted time
  const secondsLeftRef = useRef(
    initialSeconds !== undefined ? initialSeconds : 0
  ); // Use ref to store time internally

  useEffect(() => {
    if (isLoadingJokeEndTime) {
      return; // Skip updating the time if loading
    }

    // Start the countdown only when not loading
    const interval = setInterval(() => {
      if (secondsLeftRef.current > 0) {
        secondsLeftRef.current -= 1;
      }
      setFormattedTime(formatTime(secondsLeftRef.current)); // Update formatted time
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isLoadingJokeEndTime]); // Re-run when `isLoadingJokeEndTime` changes

  return formattedTime; // Return the formatted time, no re-renders
};

export default useTimeFormatter;
