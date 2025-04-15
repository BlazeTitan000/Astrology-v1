import React from 'react';
import { MoreHorizontalIcon } from "lucide-react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const Header = () => {
  return (
    <header className="absolute w-full h-[100px] top-0 left-0 bg-[#0d0d1fe6] z-50">
      <div className="relative w-full max-w-[1280px] h-10 top-4 px-4">
        <div className="absolute h-8 top-1 left-4">
          <img
            className="w-[58px] h-[54px] -top-[11px] object-cover"
            alt="Logo"
            src="/logo-1.png"
          />
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="absolute top-0 right-4 p-2 rounded-full hover:bg-white/10 transition-colors">
              <MoreHorizontalIcon className="w-8 h-8 text-white" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] bg-white rounded-lg p-2 shadow-xl animate-in fade-in-80 z-50"
              sideOffset={5}
            >
              <DropdownMenu.Item className="text-sm px-4 py-2 outline-none cursor-pointer hover:bg-purple-50 rounded-md text-gray-700">
                About Us
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-sm px-4 py-2 outline-none cursor-pointer hover:bg-purple-50 rounded-md text-gray-700">
                Services
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-sm px-4 py-2 outline-none cursor-pointer hover:bg-purple-50 rounded-md text-gray-700">
                Contact
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />
              <DropdownMenu.Item className="text-sm px-4 py-2 outline-none cursor-pointer hover:bg-purple-50 rounded-md text-purple-600 font-medium">
                Sign In
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
};