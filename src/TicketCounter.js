import React, { useState } from "react";

function TicketCounter() {
  const [numGuests, setNumGuests] = useState(0);
  const [guests, setGuests] = useState([]);
  const [userData, setUserData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleNoOfPeople = (e) => {
    const count = parseInt(e.target.value);
    if (count >= 0) {
      setNumGuests(count);
    }
    const newGuests = Array.from({ length: count }, () => ({
      name: "",
      age: "",
    }));
    setGuests(newGuests);
    setUserData([]);
    setTotalPrice(0);
  };
  const handleInputChange = (index, key, value) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = {
      ...updatedGuests[index],
      [key]: value,
    };
    setGuests(updatedGuests);
  };
  const calculateCharge = (age) => {
    if (!age) return 0;
    if (age <= 2) return 0;
    else if (age < 18) return 100;
    else if (age < 60) return 500;
    else return 300;
  };

  const handleIssueTicket = () => {
    const isEmptyField = guests.some((guest) => !guest.name || !guest.age);

    if (isEmptyField) {
      alert("Please fill in all guest details before issuing the ticket.");
      return;
    }
    const totalCharge = guests.reduce(
      (acc, guest) => acc + calculateCharge(guest.age),
      0
    );
    const ticket = guests.map((guest) => ({
      name: guest.name,
      age: guest.age,
    }));
    setUserData(ticket);
    setTotalPrice(totalCharge);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Ticket Counter</h2>
        <div className="ticketing-container">
          <label>Number of Guests: </label>
          <input
            type="number"
            value={numGuests}
            onChange={(e) => handleNoOfPeople(e)}
          />
        </div>
        <br />
        {numGuests > 0 && (
          <div
            className="ticketing-container"
            style={{ maxHeight: "40vh", overflow: "auto", height: "auto" }}
          >
            <div className="guest-container">
              {guests.map((guest, index) => (
                <div
                  className="guest-item"
                  style={{ margin: "10px" }}
                  key={index}
                >
                  <div className="guest-info">
                    <label>Name:</label>
                    <input
                      type="text"
                      value={guest.name}
                      style={{ width: "85%" }}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="guest-info">
                    <label>Age:</label>
                    <input
                      type="number"
                      value={guest.age}
                      style={{ width: "85%" }}
                      onChange={(e) =>
                        handleInputChange(index, "age", e.target.value)
                      }
                    />
                  </div>
                  {index !== guests.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleIssueTicket}
        >
          Submit
        </button>
      </div>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          marginTop: "20px",
          textAlign: "justify",
          display: "grid",
          justifyContent: "center",
        }}
      >
        {userData.map((user, id) => (
          <p key={id}>
            {user.name} (age: {user.age})
          </p>
        ))}
        <p>totalPrice: {totalPrice}</p>
      </div>
    </>
  );
}
export default TicketCounter;
