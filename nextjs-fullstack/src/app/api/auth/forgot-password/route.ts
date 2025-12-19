import { NextRequest, NextResponse } from 'next/server'
import { isValidEmail } from '@/backend/core/shared/validation'
import { forgotPassword } from '@/backend/core/user/UserService'
import { ForgotPasswordInput } from '@/backend/core/user/types'

export async function POST(request: NextRequest) {
  try {
    const body: ForgotPasswordInput = await request.json()
    const { email } = body

    // Validate required fields
    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 })
    }

    const forgotPasswordResult = await forgotPassword(body)
    if (!forgotPasswordResult.success) {
      return NextResponse.json({ success: false, error: forgotPasswordResult.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent successfully',
      data: forgotPasswordResult.data,
    }, { status: 200 })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}