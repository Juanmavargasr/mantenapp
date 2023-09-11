import { createContext, useState, useContext, useEffect } from "react";
import { registerReq, loginReq, verifiyTokenReq } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("user Auth must be userd within an Authprovider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerReq(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      alert(`User ${user.username} succesfully created`);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginReq(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      try {
        if (!cookies.token) {
          setIsAuthenticated(false);
          setLoading(false);
          return setUser(null);
        } else {
          const res = await verifiyTokenReq(cookies.token);
          if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          } else {
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, errors, signin, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
