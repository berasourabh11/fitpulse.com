function timeConverter(timeObject: {
  hours: number;
  minutes: number;
  seconds: number;
  am_pm: string;
}): Date {
  const { hours, minutes, seconds, am_pm } = timeObject;

  let convertedHours = hours;
  if (am_pm === "PM" && hours !== 12) {
    convertedHours += 12;
  } else if (am_pm === "AM" && hours === 12) {
    convertedHours = 0;
  }

  const date = new Date();
  date.setHours(convertedHours, minutes, seconds);
  
  // Set the timezone offset for IST (+05:30)
  const offsetInMinutes = 330; // 5 hours and 30 minutes
  date.setMinutes(date.getMinutes() + offsetInMinutes);

  return date;
}

export default timeConverter;
