"use client"

import React, { useState, useEffect, useRef } from 'react'
import { BellIcon } from '@heroicons/react/20/solid'
import { Menu, Pencil, X } from "lucide-react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from "@clerk/nextjs";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    // a ref to the menu
    const menuRef = useRef<HTMLUListElement | null>(null);

    // Close the menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if the click is outside the menu
            if (menuRef.current && !(menuRef.current.contains(event.target as Node))) {
                setIsOpen(false);
            }
        };

        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const pathname = usePathname()

  return (
    <div className='fixed top-0 left-0 w-full bg-white z-50'>
        <div className='flex bg-blue-1 flex-row justify-between h-14 m-3 mb-0 rounded-lg items-center shrink'>
            <div className='px-4 py-2 mx-4 bg-deepgreen rounded-lg'>
                AIRFIN 
            </div>

            {/* Desktop Navigation Links */}
            <div className='hidden md:flex md:space-x-14 md:justify-between'>
                <Link href={"/"}>
                <p className={pathname === "/"? "text-slate-900 font-bold": "text-white"}>Dashboard</p>
                </Link>

                <Link href={"/accounts"}>
                <p className={pathname === "/accounts"? "text-slate-900 font-bold": "text-white"}>Accounts</p>
                </Link>

                <Link href={"/budget"}>
                <p className={pathname === "/budget"? "text-slate-900 font-bold": "text-white"}>Budget</p>
                </Link>

                <Link href={"/chatbot"}>
                <p className={pathname === "/chatbot"? "text-slate-900 font-bold": "text-white"}>Chatbot</p>
                </Link>

                
            </div>

            
                
            

            {/* Mobile Menu Button and Bell Icon */}
            <div className="flex items-center space-x-4">
                <div className='flex justify end'>
                    <Link href="/feedback">
                        <Pencil className="w-5 h-5 text-white cursor-pointer mx-6 my-2" />
                    </Link>
                    <UserButton />
                </div>
                {/* Menu Button (Mobile) */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Bell Icon (Always Visible) */}
                <Link href= "/notifications">
                    <div className="relative shrink">
                        <button className="text-white px-4">
                            <BellIcon className="h-8 w-8" />
                        </button>
                    </div>
                </Link>
            </div>
        </div>

        {/* Mobile Menu Links */}
        {isOpen && (
            <ul ref={menuRef} className="md:hidden bg-gray-700 p-4 w-48 space-y-1 text-center mx-auto absolute top-full left-1/2">
                <li><Link href="/" className="block hover:text-gray-300">Dashboard</Link></li>
                <li><Link href="#" className="block hover:text-gray-300">Accounts</Link></li>
                <li><Link href="#" className="block hover:text-gray-300">Budgeting</Link></li>
                <li><Link href="#" className="block hover:text-gray-300">Chatbot</Link></li>
            </ul>
        )}
    </div>
  )
}

export default Navigation
