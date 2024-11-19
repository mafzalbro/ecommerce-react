// eslint-disable-next-line react/prop-types
const DateDisplay = ({ dateString }) => {
  const date = new Date(dateString);
  // Format the date using native Date methods
  const formattedDate = `${date.toLocaleString("en-US", { weekday: "long" })}, 
      ${date.toLocaleString("en-US", { month: "long" })} ${date.getDate()}, 
      ${date.getFullYear()} at ${date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default DateDisplay;
