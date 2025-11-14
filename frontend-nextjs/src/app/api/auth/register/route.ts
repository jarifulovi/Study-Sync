// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { isValidText, isValidEmail, isValidPassword } from '@/backend/core/shared/validation';
import { RegisterInput } from '@/backend/core/user/types';
import { createUserAuth } from '@/backend/core/user/UserService';
import { createUserProfile, doesUserExists } from '@/backend/core/user/ProfileService';


export async function POST(request: NextRequest) {
  try {
    
    const body: RegisterInput = await request.json();
    const { email, password, firstName, lastName } = body;

    // Validate required fields
    if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    if (!isValidPassword(password)) return NextResponse.json({ error: 'Password too weak' }, { status: 400 })
    if (!isValidText(firstName,3,50,false)) return NextResponse.json({ error: 'Invalid first name' }, { status: 400 })
    if (!isValidText(lastName,3,50,false)) return NextResponse.json({ error: 'Invalid last name' }, { status: 400 })

    // Check if user already exists
    const userExistsResult = await doesUserExists(email);
    if (!userExistsResult.success) {
      return NextResponse.json({ error: userExistsResult.error }, { status: 500 });
    }
    if (userExistsResult.data) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create user in Supabase Auth
    const authResult = await createUserAuth(body);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 400 });
    }

    // Create user profile
    const profileResult = await createUserProfile(body, authResult.data.user.id);
    if (!profileResult.success) {
      return NextResponse.json({ error: profileResult.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: authResult.data.user.id,
        email,
        firstName,
        lastName
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
};
