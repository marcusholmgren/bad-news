import React, {useState, useContext} from "react";
import FirebaseContext from "../../firebase/context";

const ForgotPassword: React.FC = () => {
  const context = useContext(FirebaseContext);
  const [userEmail, setEmail] = useState('');
  const [isPasswordReset, setPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState<string | null>(null);

  if (!context) {
    return null;
  }
  const { firebase } = context;

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(userEmail);
      setPasswordReset(true);
      setPasswordResetError(null);
    } catch(err) {
      if (err instanceof Error) {
        console.error("[ForgotPassword] Reset Password errror", err);
        setPasswordResetError(err.message);
      }
      setPasswordReset(false);
    }
  }

  return <div>
    <input type="email"
           className="input"
           placeholder="Provide your account email"
           onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
    />
    <button className="button" onClick={handleResetPassword}>
      Reset Password
    </button>
    {isPasswordReset && <p>Check email to reset password</p>}
    {passwordResetError && <p className="error-text">{passwordResetError}</p>}
  </div>;
}

export default ForgotPassword;
