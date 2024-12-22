interface ApiError {
  message: string;
  statusCode: number;
  details?: any;
}

const API_URL = "http://localhost:3001";

export const register = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    console.log("Attempting to connect to:", API_URL);

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(data),
    });

    // Check if the server is reachable
    if (!response) {
      throw new Error("Cannot connect to server");
    }

    const contentType = response.headers.get("content-type");
    let result;

    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const textResult = await response.text();
      console.error("Server response:", textResult);
      throw new Error(`Invalid response: ${textResult}`);
    }

    if (!response.ok) {
      throw {
        message: result.message || "Registration failed",
        statusCode: response.status,
        details: result,
      } as ApiError;
    }

    return result;
  } catch (error: any) {
    console.error("Registration error:", {
      name: error.name,
      message: error.message,
      cause: error.cause,
      stack: error.stack,
    });

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw {
        message: "Cannot connect to server. Please try again later.",
        statusCode: 503,
        details: error,
      } as ApiError;
    }

    throw {
      message: error.message || "Network error",
      statusCode: error.statusCode || 500,
      details: error,
    } as ApiError;
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Auth service login response:", result);

    if (!response.ok) {
      throw {
        message: result.message || "Login failed",
        statusCode: response.status,
      } as ApiError;
    }

    document.cookie = `token=${result.access_token}; path=/; max-age=86400`;
    localStorage.setItem("token", `Bearer ${result.access_token}`);
    localStorage.setItem("user", JSON.stringify(result.user));

    return result;
  } catch (error) {
    console.error("Auth service error:", error);
    throw error;
  }
};

export const logout = () => {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
