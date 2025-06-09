import {useContext, createContext } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies(["superAdminToken"]);
  const [superAdminProfileName, setSuperAdminProfileName, removeSuperAdminProfileName] = useCookies(["superAdminUserName"]);
  const superAdminToken = cookies.superAdminToken;
  const superAdminUserName = superAdminProfileName.superAdminUserName;

  const setSuperAdminToken = (newSuperAdminToken) => setCookies("superAdminToken", newSuperAdminToken, { path: "/" });
  const setSuperAdminUserName = (newName) => setSuperAdminProfileName("superAdminUserName", newName, { path: "/" });
  const deleteSuperAdminTokenToken = () => removeCookies("superAdminTokenToken");
  const deleteSuperAdminUserName = () => removeSuperAdminProfileName("superAdminUserName");
  function logoutSuperAdmin(){
    setSuperAdminToken("");
    removeCookies("superAdminToken");
    setSuperAdminUserName("")
    removeCookies("superAdminUserName")
  };

  return (
    <AuthContext.Provider
      value={{
        superAdminToken,
        setSuperAdminToken,
        deleteSuperAdminTokenToken,
        superAdminUserName,
        setSuperAdminUserName,
        deleteSuperAdminUserName,
        logoutSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
