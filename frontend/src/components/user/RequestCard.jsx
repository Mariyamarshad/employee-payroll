const RequestCard = ({ request, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-xl p-4 mb-4 cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {request.subject}
        </h3>

        <span
          className={`px-3 py-1 text-sm rounded-full ${
            request.status === "open"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {request.status}
        </span>
      </div>

      <p className="text-gray-500 text-sm mt-2">{request.createdAt}</p>
    </div>
  );
};

export default RequestCard;
