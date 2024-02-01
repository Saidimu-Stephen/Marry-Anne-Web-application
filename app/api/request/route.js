/** @format */

// Function to make authenticated requests using the stored token
const makeAuthenticatedRequest = async (url, method = "GET", body = null) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    // Handle error scenarios here
    throw new Error("Failed to make authenticated request");
  }
};

// Example usage:
// Replace 'apiUrl' with the URL for the authenticated endpoint
const apiUrl = "/api/some_authenticated_endpoint";

// Use the function to make an authenticated request
makeAuthenticatedRequest(apiUrl, "GET")
  .then((data) => {
    // Handle successful response data here
    console.log("Authenticated request successful:", data);
  })
  .catch((error) => {
    // Handle error scenarios here
    console.error("Error making authenticated request:", error);
  });
