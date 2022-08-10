import React, { useState, useEffect } from "react";
import LoadingMask from "./LoadingMask";

function Subscription() {
  const [email, setEmail] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // - - - - Email validation
  const validateEmail = (email) =>
    typeof email === "string" && email.includes("@") && email.includes(".");

  // - - - - Email fill
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // - - - - Button disable
  useEffect(() => {
    setDisabled(!validateEmail(email));
  }, [email]);

  // - - - - Subscribe - fetch
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("https://demoapi.com/api/series/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <form>
        <h3>Subscribe to our newsletter</h3>
        <input type="text" value={email} onChange={onEmailChange} />
        <button type="submit" disabled={isDisabled} onClick={handleSubmit}>
          Subscribe to our newsletter
        </button>
        {loading && <LoadingMask />}
      </form>
    </>
  );
}

export default Subscription;
