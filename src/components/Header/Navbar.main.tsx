'use client';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../../context/usercontext';
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '../../../lib/chakraui';
import { useAuth } from '../../../context/authContext';

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUser();
  const { logout } = useAuth();

  const toggleMenu = () => {
    setOpen(!open);
  };

  const menuItems = [
    { href: '/#home', text: 'Home' },
    { href: '/#benefits', text: 'Benefits' },
    { href: '/#testimonial', text: 'Testimonial' },
    { href: '/#subscription', text: 'Subscription' },
    { href: '/#contact', text: 'Contact Us' }
  ];

  return (
    <div
      className={`sticky top-0 z-50 px-4 py-4 w-screen justify-between items-center flex ${
        open ? 'flex-col' : 'flex-row'
      } text-white font-semibold bg-[#221389] shadow-lg`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between items-center gap-4">
          <Link href="/">
            <img src="/Frame.svg" className="w-12" alt="Logo" />
          </Link>
          <Link href="/" className="font-bold text-lg holtwood">
            DERMACURE.AI
          </Link>
        </div>

        <div
          className={`hidden md:flex md:items-center md:gap-3 ${
            open ? 'hidden' : ''
          }`}
        >
          {menuItems.map((item, index) => (
            <ul
              key={index}
              className="cursor-pointer hover:scale-105 transition-all duration-150"
            >
              <Link href={item.href}>{item.text}</Link>
            </ul>
          ))}
          <ul>
            {user?.name ? (
              <Menu>
                <MenuButton>
                  <Avatar
                    name={user?.name}
                    size={'md'}
                    cursor={'pointer'}
                    onClick={() => setOpenMenu(true)}
                  />
                </MenuButton>
                <MenuList fontWeight={'400'} textColor={'black'}>
                  <MenuItem onClick={() => router.push('/profile')}>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      user.role === 'Doctor'
                        ? router.push(
                            '/dashboard/doctor-dashboard/?currentTab=Appointments'
                          )
                        : router.push(
                            '/dashboard/patient-dashboard/?currentTab=E-Clinic'
                          )
                    }
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link href="/auth/login">
                <button className="btn-primary">Register/Login</button>
              </Link>
            )}
          </ul>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="block text-white">
            {open ? <ImCross /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      <div
        className={`${
          open ? 'block' : 'hidden'
        } w-full py-4 md:hidden flex flex-col items-center gap-4`}
      >
        {menuItems.map((item, index) => (
          <ul
            key={index}
            className="cursor-pointer hover:scale-105 transition-all duration-150"
          >
            <Link href={item.href}>{item.text}</Link>
          </ul>
        ))}
        {user?.name ? (
          <Avatar name={user?.name} />
        ) : (
          <Link href="/auth/login">
            <button className="btn-primary">Register/Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
