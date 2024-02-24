import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 text-white items-center p-3'>
        <div className='logo'>
            <span className='px-5 font-bold text-xl'>iTask</span>
        </div>
        <ul className='flex gap-4 mx-5 text-xl'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Your tasks</li>
        </ul>

    </nav>
  )
}

export default Navbar