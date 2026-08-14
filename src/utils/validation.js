// ================================
// Email Validation
// ================================

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    return "Email is required.";
  }

  if (!regex.test(email)) {
    return "Enter a valid email address.";
  }

  return "";
}

// ================================
// Username Validation
// ================================

export function validateUsername(username) {
  if (!username.trim()) {
    return "Username is required.";
  }

  if (username.length < 4) {
    return "Username must contain at least 4 characters.";
  }

  if (username.length > 20) {
    return "Username cannot exceed 20 characters.";
  }

  const regex = /^[a-zA-Z0-9_.]+$/;

  if (!regex.test(username)) {
    return "Only letters, numbers, _ and . are allowed.";
  }

  return "";
}

// ================================
// Full Name Validation
// ================================

export function validateFullName(name) {
  if (!name.trim()) {
    return "Full name is required.";
  }

  if (name.length < 3) {
    return "Enter your complete name.";
  }

  return "";
}

// ================================
// Phone Validation
// ================================

export function validatePhone(phone) {
  const regex = /^[6-9]\d{9}$/;

  if (!phone.trim()) {
    return "Phone number is required.";
  }

  if (!regex.test(phone)) {
    return "Enter a valid 10 digit mobile number.";
  }

  return "";
}

// ================================
// Password Validation
// ================================

export function validatePassword(password) {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain one lowercase letter.";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain one number.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain one special character.";
  }

  return "";
}

// ================================
// Confirm Password
// ================================

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return "Confirm your password.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return "";
}