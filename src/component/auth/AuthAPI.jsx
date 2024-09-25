import { toast } from "react-toastify";

export function signUpUser(userData) {
  // console.log("From API: ", userData);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8081/auth/signup`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      // console.log("Response Status: ", response.status);
      // console.log("Response Data: ", data.token);
      if (response.ok) {
        toast.success("SignUp successfully");
      } else {
        toast.error(`SignUp Failed: ${data.error || "Unknown error"}`);
      }
      // console.log(data.token);
      resolve(data.token);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function loginUser(userData) {
  // console.log("From API: ", userData);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8081/auth/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      // console.log("Response Status: ", response.status);
      // console.log("Response Data: ", data.token);
      if (response.ok) {
        toast.success("Login successfully");
      } else {
        toast.error(`Login Failed: ${data.error || "Unknown error"}`);
      }
      // console.log(data.userInfo);
      resolve({ token: data.token, userInfo: data.userInfo });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function logoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8081/auth/logout`);
      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("token");
        toast.success("Logout successfully");
      } else {
        toast.error("Logout Failed");
      }
      resolve(data.message);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
