import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswodEmail, setResetPasswordEmail] = useState("");
  const [isPasswordReset, setPasswordReset] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswodEmail);
      setPasswordReset(true);
      setPasswordError(null);
    } catch (err) {
      console.error("Error sending email", err);
      setPasswordReset(false);
      setPasswordError(err.message);
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Please provide your account email"
        onChange={(event) => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordError && <p className="error-text">{passwordError}</p>}
    </div>
  );
}

export default ForgotPassword;
