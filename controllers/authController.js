
const supabase = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
// ========== REGISTRATION ROUTE ==========
// POST /register - Create a new user account
// Expected request body: { email: string, password: string }
/**
 * Register a new user account.
 *
 * - Rejects if email/password missing or user already exists
 * - Hashes password with bcrypt before inserting
 * - Returns the created user (without password)
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.register =  async (req, res) => {
  console.log("REGISTER ROUTE HIT");
  console.log("Request Body:", req.body);
  const { email, password } = req.body; // Extract email and password from request
  console.log("EMAIL & PASSWORD:", email, password);
  
  // Validate that both email and password are provided
  if (!email || !password) return res.status(400).json({ error: "Email and Password are required" });

  try {
    // Check if user already exists
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 is "not found"
      throw selectError;
    }

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password using bcrypt with 10 salt rounds for security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user into the database with hashed password
    const { data: user, error: insertError } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword }])
      .select();
      

    if (insertError) throw insertError;

    delete user[0].password; // Remove password from response (never send hashed password back)
    res.status(201).json(user[0]); // return the inserted user with status 201 (Created)
  } catch (err) {
  console.error("REGISTER ERROR:", err);
  res.status(500).json({
    error: err.message,
    details: err
  });
  }
};

// ========== LOGIN ROUTE ==========
// POST /login - Authenticate user and return JWT token
// Expected request body: { email: string, password: string }
// Returns: { message: string, token: string }
/**
 * Authenticate a user and return a signed JWT.
 *
 * - Rejects if email/password missing or user not found
 * - Validates password via bcrypt compare
 * - Signs a JWT with a 1-hour expiry
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate that both email and password are provided
  if (!email || !password){
    return res.status(400).json({ error: "email and password are required" });
  }
  
  try {
    // Look up user by email in the database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Compare the provided password with the hashed password stored in database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    
    // Create JWT token that expires in 1 hour
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    
    delete user.password; // Don't send password back to client
    res.json({ message: "Login successful", token, user });
  }
  catch(err){
    console.error(err);
    res.status(500).json({ error: "Failed to login" });
  } 
};
