

// Validate text
export function isValidText(
  text: string,
  length: number = 3,
  allowSpecialChars: boolean = true
): boolean {
  if (!text) return false
  if (typeof text !== 'string') return false
  if (text.trim().length < length) return false

  // Check for special characters if not allowed
  if (!allowSpecialChars) {
    const specialCharPattern = /[^a-zA-Z0-9\s]/ // only letters, numbers, spaces allowed
    if (specialCharPattern.test(text)) return false
  }

  return true
}


// Validate email format
export function isValidEmail(email: string): boolean {
  if (!email || email.trim() === "") return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}


// Validate password strength
export function isValidPassword(password: string): boolean {
  if (!password || password.trim() === "") return false
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}
