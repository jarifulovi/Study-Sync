import { NextRequest, NextResponse } from 'next/server'
import { isValidPassword } from '@/backend/core/shared/validation'
import { resetPassword } from '@/backend/core/user/UserService';

/**
 * API route handler for password reset with recovery token
 * This endpoint receives the recovery token from the password reset email
 * and updates the user's password after validating the token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken, newPassword } = body;

    // Validate required fields
    if (!accessToken) {
      return NextResponse.json({ error: 'Recovery token is required' }, { status: 400 });
    }

    if (!isValidPassword(newPassword)) {
      return NextResponse.json({ error: 'Password must be at least 8 characters and include a number' }, { status: 400 });
    }

    const result = await resetPassword(accessToken, refreshToken || '', newPassword);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: result.message || 'Password reset successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
