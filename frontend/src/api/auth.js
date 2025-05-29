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

export async function logout(host) {
  const response = await fetch(`https://${host}/api/v1/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message || "Log out failed");
  }

  localStorage.clear();
  return true;
}

export async function create_user(data, host){
  const response = await fetch(`https://${host}/api/v1/auth/register`, {
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

export async function verifyAccessToken(host) {
  try {
    const response = await fetch(`https://${host}/api/v1/auth/token/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return response.status === 200;
  } catch (error) {
    console.error("Access token verification failed:", error);
    return false;
  }
}

export async function verifyRefreshToken(host) {
  try {
    const response = await fetch(`https://${host}/api/v1/auth/token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return response.status === 200;
  } catch (error) {
    console.error("Refresh token verification failed:", error);
    return false;
  }
}

export async function verifyAndGetData(host){

}
