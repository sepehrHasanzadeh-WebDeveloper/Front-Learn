import Link from "next/link";

import { LuCircleUserRound, LuLogOut, LuUserRound } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaRegComment } from "react-icons/fa6";

export default function UserModalMenu({ logout, theme }) {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton
          className={`
            inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold backdrop-blur-md
            ${theme.buttonBg}
            ${theme.buttonText}
            hover:${theme.buttonHover}
          `}
        >
          <LuUserRound size={20} />
        </MenuButton>

        <MenuItems
          transition
          className={`
    absolute left-0 mt-2 w-56 origin-top-left z-20
    rounded-xl backdrop-blur-xl shadow-lg transition
    outline-none border-none
    data-closed:scale-95 data-closed:opacity-0
    data-enter:duration-100 data-leave:duration-75
    ${theme.menuBg}
    ${theme.menuBorder}
    ${theme.menuText}
  `}
        >
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={`
                    block px-4 py-2 text-sm text-right d-flex align-items-center !text-inherit
                    ${
                      active
                        ? `${theme.menuHoverBg} ${theme.menuHoverText}`
                        : theme.menuText
                    }
                  `}
                >
                  <LuCircleUserRound size={21} style={{ marginLeft: "10px" }} />
                  پروفایل
                </Link>
              )}
            </MenuItem>

            <MenuItem>
              {({ active }) => (
                <Link
                  href="/profile/courses"
                  className={`
                    block px-4 py-2 text-sm text-right d-flex align-items-center !text-inherit
                    ${
                      active
                        ? `${theme.menuHoverBg} ${theme.menuHoverText}`
                        : theme.menuText
                    }
                  `}
                >
                  <MdFavoriteBorder size={21} style={{ marginLeft: "10px" }} />
                  دوره های من
                </Link>
              )}
            </MenuItem>

            <MenuItem>
              {({ active }) => (
                <Link
                  href="/profile/comments"
                  className={`
                    block px-4 py-2 text-sm text-right d-flex align-items-center !text-inherit
                    ${
                      active
                        ? `${theme.menuHoverBg} ${theme.menuHoverText}`
                        : theme.menuText
                    }
                  `}
                >
                  <FaRegComment style={{ marginLeft: "10px" }} size={21} />
                  دیدگاه های من
                </Link>
              )}
            </MenuItem>

            <MenuItem>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`
                    block px-4 py-2 text-sm text-right d-flex align-items-center w-full !text-inherit
                    ${active ? theme.logoutHoverBg : theme.logoutText}
                  `}
                >
                  <LuLogOut style={{ marginLeft: "10px" }} size={21} />
                  خروج از حساب کاربری
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}
