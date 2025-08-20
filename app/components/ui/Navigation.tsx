'use client'
import Link from "next/link"

export default function Navigation () {
    return (
        <nav data-testid="navigation" className="flex items-center justify-between p-4 border-b">
            <Link href="/" aria-label="logo">
            <img src="/logo.png" alt="logo" width={48} height={48}/>
            
            <div className="flex gap-3">
                <Link href="/"><button>Home</button></Link>
                <Link href="/form"><button>Form</button></Link>
                <Link href="/feedbacks"><button>Feedbacks</button></Link>

            </div>
            </Link>
        </nav>
    )
}