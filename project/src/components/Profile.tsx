import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../lib/firebase"; // Import Firebase auth
import { Logo } from "./Logo";
import Footer from "./Footer";

const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/auth"); // Redirect to auth page if not logged in
    } else {
      setUserDetails({
        email: user.email,
        signedIn: new Date(user.metadata.lastSignInTime).toLocaleString(),
      });
      setLoading(false); // Stop loading when user details are set
    }
  }, [user, navigate]);

  // Function to reauthenticate user
  const reauthenticate = async (password: string) => {
    const credential = EmailAuthProvider.credential(user!.email!, password);
    try {
      await reauthenticateWithCredential(user!, credential);
      return true;
    } catch (err) {
      setError("Reauthentication failed. Please check your current password.");
      console.error(err);
      return false;
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword.trim().length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setSuccess("");
    setShowModal(true); // Show modal for reauthentication
  };

  const confirmPasswordChange = async () => {
    if (await reauthenticate(currentPassword)) {
      try {
        await updatePassword(user!, newPassword);
        setSuccess("Your password has been updated successfully! 🔒");
        setError("");
      } catch (err) {
        setError(
          "Something went wrong while updating your password. Please try again."
        );
        console.error(err);
      }
    }
    setShowModal(false); // Close modal after processing
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="mb-20">
      <div className="max-w-lg mx-auto bg-white/5 p-6 rounded-xl border border-white shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-semibold mb-6 text-center text-blue-500">
          Your Profile
        </h1>
        {loading ? (
          <div className="text-center text-gray-300">
            Fetching your details...
          </div>
        ) : userDetails ? (
          <>
            <div className="mb-4">
              <p className="text-gray-300">Email : &nbsp;{userDetails.email}</p>
              <p className="text-gray-300">
                Signed In : &nbsp;{userDetails.signedIn}
              </p>
            </div>

            {/* Password Update */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Change Your Password
              </label>
              <input
                type="password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 bg-white/5 text-white border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter new password"
              />
              <button
                onClick={handlePasswordChange}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition duration-300"
              >
                Save New Password
              </button>
            </div>

            {/* Display error or success messages with animation */}
            {error && <p className="text-red-500 animate-pulse">{error}</p>}
            {success && <p className="text-green-500 animate-pulse">{success}</p>}

            {/* Modal for re-confirmation */}
            {showModal && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                <div className="bg-black p-6 rounded-lg shadow-lg max-w-sm w-full border-white/90 border-2">
                  <div className="flex justify-center mb-4">
                    <Logo />
                  </div>
                  <h2 className="text-lg font-semibold mb-4 text-center">
                    Reauthentication Required
                  </h2>
                  <p className="text-white-700 text-sm mb-4">
                    Please enter your current password to confirm this action.
                  </p>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Current password"
                  />
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmPasswordChange}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-300">No user data found.</div>
        )}
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
