import { useEffect, useState } from "react";
import jsPDF from "jspdf";

function Success() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orderData"));

    if (!data) {
      window.location.href = "/";
      return;
    }

    setOrder(data);
  }, []);

  const downloadPDF = () => {
    if (!order) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Payment Receipt", 70, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${order?.name}`, 20, 40);
    doc.text(`Address: ${order?.address}`, 20, 50);
    doc.text(`Payment ID: ${order?.paymentId}`, 20, 60);

    let y = 80;

    doc.text("Items:", 20, y);
    y += 10;

    order?.cart?.forEach((item) => {
      doc.text(
        `${item.name} x ${item.qty} - ₹${item.price * item.qty}`,
        20,
        y
      );
      y += 10;
    });

    y += 10;

    doc.setFontSize(14);
    doc.text(`Total: ₹${order?.total}`, 20, y);

    doc.save("receipt.pdf");
  };

  if (!order) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px 15px",
        background: "#f4f4f4",
      }}
    >
      {/* MAIN BOX */}
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          padding: "25px",
          borderRadius: "12px",
          background: "#ffffff",
          color: "#111",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "26px",
            fontWeight: "600",
          }}
        >
          ✅ Payment Successful
        </h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#666",
            marginBottom: "20px",
          }}
        >
          Payment ID: {order?.paymentId}
        </p>

        {/* RECEIPT BOX */}
        <div
          style={{
            borderRadius: "10px",
            padding: "18px",
            background: "#fafafa",
            border: "1px solid #eee",
          }}
        >
          <h2 style={{ marginBottom: "15px" }}>Order Receipt</h2>

          <div style={{ marginBottom: "10px" }}>
            <p><strong>Name:</strong> {order?.name}</p>
            <p><strong>Address:</strong> {order?.address}</p>
          </div>

          <hr style={{ margin: "15px 0" }} />

          {order?.cart?.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr style={{ margin: "15px 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            <span>Total</span>
            <span>₹{order?.total}</span>
          </div>
        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            marginTop: "20px",
          }}
        >
          {/* Download */}
          <button
            onClick={downloadPDF}
            style={{
              padding: "4px 6px",
              fontSize: "12px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            ⬇️ Download
          </button>

          {/* Home */}
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              padding: "4px 6px",
              fontSize: "12px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;