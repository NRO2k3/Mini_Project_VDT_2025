export async function login(email, password, host) {
    const response = await fetch(`http://${host}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }
  return true;
}
