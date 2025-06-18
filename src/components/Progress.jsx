const Progress = ({ progress, status }) => {
  const getColor = () => {
    switch (status) {
      case "In Progress":
        return "text-white bg-yellow-500 border border-yellow-500/10";

      case "Completed":
        return "text-white bg-green-800 border border-green-500/10";

      default:
        return "text-white bg-orange-500 border border-orange-500/10";
    }
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Progress;
