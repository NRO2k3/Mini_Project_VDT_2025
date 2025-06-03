import { host } from "../App";

export async function login(email, password, host) {
    const response = await fetch(`https://${host}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    if(response.status === 200){
      const dataResponse = await response.json();
      localStorage.setItem("username", dataResponse.data.user.name);
      localStorage.setItem("role", dataResponse.data.user.role);
    }
  return true;
}

export async function logout() {
  const response = await fetch(`https://${host}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message || "Log out failed");
  }

  localStorage.clear();
  return true;
}

export async function create_user(data){
  const response = await fetch(`https://${host}/api/v1/user/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  return true;
}

export async function create_object(url, data){
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials:"include",
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  return true;
}

export async function update_object(url, data){
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials:"include"
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message || "Update failed");
  }

  return true;
}

export async function delete_object(url){
  const response = await fetch(url, {
    method: "DELETE",
    credentials:"include"
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message || "Delete failed");
  }

  return true;
}

export async function verifyAccessToken() {
  try {
    const response = await fetch(`https://${host}/api/v1/auth/token/verify`, {
      method: "POST",
      credentials: "include",
    });
    return response.status === 200;
  } catch (error) {
    console.error("Access token verification failed:", error);
    return false;
  }
}

export async function verifyRefreshToken() {
  try {
    const response = await fetch(`https://${host}/api/v1/auth/token/refresh`, {
      method: "POST",
      credentials: "include",
    });
    return response.status === 200;
  } catch (error) {
    console.error("Refresh token verification failed:", error);
    return false;
  }
}

export async function getData(url, setData, navigate ){
  const isAccessValid = await verifyAccessToken(host);

  if (!isAccessValid) {
    const isRefreshValid = await verifyRefreshToken(host);

    if (!isRefreshValid) {
      localStorage.clear();
      return navigate("/login");
    }
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 200) {
      const data = await response.json();
      setData(data.data);
      return true;
    } else {
      setData(null);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    setData(null);
  }
}

export async function requestWithAuth(navigate, apiCall) {
  const isAccessValid = await verifyAccessToken(host);
  if (!isAccessValid) {
    const isRefreshValid = await verifyRefreshToken(host);
    if (!isRefreshValid) {
      localStorage.clear();
      return navigate("/login");
    }
  }

  try {
    return await apiCall();
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
}
