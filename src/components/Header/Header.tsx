import React from 'react';
import { MoreHorizontalIcon } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const Header = () => {
  return (
      <header className="fixed w-full py-2 top-0 left-0 bg-[#0d0d1fe6] z-50">
        <div className="flex items-center justify-between h-full w-5/6 mx-auto">
          <div className="flex items-center">
            <img
              className="w-[59px] h-[59px] object-cover"
              alt="Logo"
              src="/logo-1.png"
            />
          </div>

          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
              <button className="rounded-full hover:bg-white/10 transition-colors">
                <MoreHorizontalIcon className="w-8 h-8 text-white" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={8}
                className="bg-[#1C1C3A] bg-opacity-80 rounded-lg p-2 shadow-xl translate-y-8 animate-in fade-in-80 z-50"
              >
                <DropdownMenu.Item className="text-sm px-4 py-2 outline-none cursor-pointer hover:text-purple-400 rounded-md text-white">
                  Terms & Conditions
                </DropdownMenu.Item>
                <DropdownMenu.Item className="text-sm px-4 py-2 outline-none cursor-pointer hover:text-purple-400 rounded-md text-white"
                onSelect={() => {
                  const section = document.getElementById("blog-section");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                >
                  Blog
                </DropdownMenu.Item>
                <DropdownMenu.Item className="text-sm px-4 py-2 outline-none cursor-pointer hover:text-purple-400 rounded-md text-white">
                  Example Report
                </DropdownMenu.Item>
                <DropdownMenu.Item className="text-sm px-4 py-2 outline-none cursor-pointer hover:text-purple-400 rounded-md text-white font-medium"
                onSelect={() => {
                  const section = document.getElementById("how-to-work");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                >
                  How to work
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </header>
  );
};
