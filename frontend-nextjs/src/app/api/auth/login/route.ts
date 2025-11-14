import { NextRequest, NextResponse } from 'next/server'
import { isValidEmail, isValidPassword } from '@/backend/core/shared/validation'
import { loginUser } from '@/backend/core/user/UserService';
import { LoginInput } from '@/backend/core/user/types';


export async function POST(request: NextRequest) {
  try {
    const body: LoginInput = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    if (!isValidPassword(password)) return NextResponse.json({ error: 'Password too weak' }, { status: 400 });


    const loginResult = await loginUser(body);
    if (!loginResult.success) {
      return NextResponse.json({ error: loginResult.error}, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'User logged in successfully',
      data: loginResult.data,
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}