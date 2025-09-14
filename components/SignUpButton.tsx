'use client'

import Link from 'next/link'
import { CircleUserRoundIcon } from 'lucide-react'

function SignUpButton() {
    return (
        <Link
            href='/auth'
            className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-2xl transition-colors duration-200 font-medium"
        >
            <span>Sign up</span>
            <CircleUserRoundIcon size={16} />
        </Link>
    )
}

export default SignUpButton
