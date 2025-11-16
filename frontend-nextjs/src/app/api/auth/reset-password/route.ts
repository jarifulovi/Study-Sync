import { NextRequest, NextResponse } from 'next/server'
import { isValidPassword } from '@/backend/core/shared/validation'
import { resetPassword } from '@/backend/core/user/UserService'
import { ResetPasswordInput } from '@/backend/core/user/types'

export async function POST(request: NextRequest) {
  try {
    const body: ResetPasswordInput = await request.json()
    const { access_token, password } = body

    // Validate required fields
    if (!access_token) {
      return NextResponse.json({ success: false, error: 'Missing required field: access_token' }, { status: 400 })
    }
    if (!isValidPassword(password)) {
      return NextResponse.json({ success: false, error: 'Password too weak' }, { status: 400 })
    }

    const resetPasswordResult = await resetPassword(body)
    if (!resetPasswordResult.success) {
      return NextResponse.json({ success: false, error: resetPasswordResult.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset successful',
      data: resetPasswordResult.data,
    }, { status: 200 })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}