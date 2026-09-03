/**
 * Helper to validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * Helper to validate phone numbers (India specific)
 */
export const isValidMobile = (mobile) => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

/**
 * Common headers for Auth API calls
 */
export const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  "Authorization": token ? `Bearer ${token}` : "",
});