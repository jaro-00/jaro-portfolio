import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'email and password are required' },
        { status: 400 },
      );
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    const { password: _pw, ...sanitizedUser } = user;

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: sanitizedUser,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 },
    );
  }
}

