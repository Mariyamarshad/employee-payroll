import React, { useEffect, useState } from "react";
import RequestsAPI from "../../utils/APIs/RequestsAPI";
import RequestCard from "../../components/user/RequestCard";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const loadRequests = async () => {
    const data = await RequestsAPI.fetchRequests();
    setRequests(data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    await RequestsAPI.createRequest({
      subject,
      message,
      recieverId: "68e4c062c9ffae7b94e0ef55",
    });

    setSubject("");
    setMessage("");
    loadRequests();
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Requests</h1>

      {/* Create Request */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="text-lg font-semibold mb-4">Create Request</h2>

        <form onSubmit={handleCreate} className="space-y-3">

          <input
            type="text"
            placeholder="Subject"
            className="w-full border rounded-lg p-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            placeholder="Message"
            className="w-full border rounded-lg p-2 h-24"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
            Send Request
          </button>

        </form>
      </div>

      {/* Requests List */}
      <div className="space-y-4">

        {requests.map((req) => (
          <RequestCard
            key={req._id}
            request={req}
          />
        ))}

      </div>

    </div>
  );
};

export default Requests;