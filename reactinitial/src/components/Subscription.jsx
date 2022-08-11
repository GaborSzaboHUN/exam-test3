import React, { useState, useEffect } from "react";
import LoadingMask from "./LoadingMask";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Subscription({ childParentCommunication }) {
  const [email, setEmail] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState("");

  // - - - - Csak functionnal tudok parent elemnek átadni adatot
  useEffect(() => {
    childParentCommunication(subscribed);
  }, [childParentCommunication, subscribed]);

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
      .then((data) => setSubscribed(data)) // - - MIÉRT LESZ TRUE?

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <form>
        <h3>Subscribe to our newsletter</h3>
        {!loading && !subscribed && (
          <>
            <TextField
              variant="outlined"
              type="text"
              value={email}
              onChange={onEmailChange}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              Subscribe to our newsletter
            </Button>
          </>
        )}
        {loading && <LoadingMask />}

        {subscribed && <p>Subscribed</p>}
      </form>
    </>
  );
}

export default Subscription;
