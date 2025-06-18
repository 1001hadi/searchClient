const RemoveAlert = ({ content, onRemove }) => {
  return (
    <div>
      <p className="text-sm">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-white whitespace-nowrap bg-red-600  rounded-lg px-4 py-2 cursor-pointer"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default RemoveAlert;
