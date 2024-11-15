export const registerUser = (req, res) => {
  try {
    // dummy data
    const username = "John Doe";
    const email = "bHsI2@example.com";

    if (!username || !email) return res.error(400, "All fields are required");

    res.success(201, { username, email }, "User registered successfully");
  } catch (error) {
    next(error);
  }
};
