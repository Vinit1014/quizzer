import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    
  return (
    <div className="flex justify-center">
      <div className="flex border font-medium text-[24px] px-3 py-1 m-2 rounded-lg w-full items-center justify-between">
        <Link href="/">
          <div className="flex cursor-pointer">Quizer</div>
        </Link>
        <div className="flex gap-x-2">
          Hello
        </div>
      </div>
    </div>
  );
};

export default Navbar;