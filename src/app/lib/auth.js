import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Extract and verify the user from a Next.js `Request` using a Bearer JWT.
 *
 * Returns the decoded JWT payload on success, otherwise `null`.
 *
 * @param {Request} request
 * @returns {any | null}
 */
export function getUserFromRequest(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return null;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (err) {
    return null;
  }
}