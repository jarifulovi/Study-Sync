// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/backend/lib/supabaseServer';

import { isValidText, isValidEmail, isValidPassword } from '@/backend/core/shared/validation';

interface RegisterBody {
  email: string
  password: string
  firstName: string
  lastName: string
};

export async function POST(request: NextRequest) {
  try {
    
    const supabase = createServerSupabaseClient();
    const body: RegisterBody = await request.json();

    const { email, password, firstName, lastName } = body;

    // Validate required fields
    if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    if (!isValidPassword(password)) return NextResponse.json({ error: 'Password too weak' }, { status: 400 })
    if (!isValidText(firstName)) return NextResponse.json({ error: 'Invalid first name' }, { status: 400 })
    if (!isValidText(lastName)) return NextResponse.json({ error: 'Invalid last name' }, { status: 400 })



    // Register user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName
        }
      }
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // @TODO : 
    // Create profile row in 'profiles' table
    // Insert a new profile
    // If profile creation failed roll back user auth

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: authData.user?.id,
        email,
        firstName,
        lastName
      }
    }, { status: 201 })

  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
};
