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
        { error: 'Email and Password are required' },
        { status: 400 },
      );
    }

    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      throw selectError;
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: user, error: insertError } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword }])
      .select();

    if (insertError) throw insertError;

    const sanitizedUser = { ...user[0] };
    delete sanitizedUser.password;

    const token = jwt.sign(
      { id: sanitizedUser.id, email: sanitizedUser.email },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    return NextResponse.json(
      { user: sanitizedUser, token },
      { status: 201 },
    );
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to register user' },
      { status: 500 },
    );
  }
}