import React, { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return "Loading...";
  }

  return user ? children : <Navigate to="/signin" replace />;
}

export default PrivateRoute;