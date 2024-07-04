import React, { useState } from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

const Navbar = () => {
    
  return (
    <div className="flex justify-center">
      <div className="flex border font-medium text-[24px] px-3 py-1 m-2 rounded-lg w-full items-center justify-between">
        <Link href="/">
          <div className="flex cursor-pointer">Quizzer</div>
        </Link>
        <div className="flex gap-x-2">
          <a href='https://github.com/Vinit1014/rtleaderboard'>
            <Github />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;