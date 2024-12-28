'use client';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function Header() {
    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [path]); // Added `path` to dependency array

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Questions', path: '/dashboard/questions' },
        { name: 'Upgrade', path: '/dashboard/upgrade' },
        { name: 'How it Works?', path: '/dashboard/how' },
    ];

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
            <Image src='/logo.svg' width={160} height={100} alt='logo' />
            <ul className='hidden md:flex gap-6'>
                {navItems.map((item) => (
                    <li
                        key={item.name}
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === item.path ? 'text-primary font-bold' : ''}`}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
            <UserButton />
        </div>
    );
}

export default Header;
