"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import ProfileSection from "../ui/ProfileSection";
import { supabase } from "@/lib/supabaseClient";
import { getInitials } from "@/utils/formatter";



export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar state
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile modal state
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // TODO: Replace with actual user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  // Handle click outside sidebar to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        toggleButtonRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !toggleButtonRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Main",
      href: "/main",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      name: "Groups",
      href: "/groups",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: "Files",
      href: "/files",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    // Force a hard refresh to clear all cached data and update middleware
    window.location.replace('/auth/login');
  }

  return (
    <>
      {/* Profile Modal */}
      <ProfileModal user={user} isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Mobile Toggle Button - Only visible on mobile */}
      <button
        ref={toggleButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white shadow-lg transition-all hover:bg-slate-700 hover:shadow-xl active:scale-95 md:hidden ${
          isOpen ? "hidden" : "block"
        }`}
        aria-label="Toggle Sidebar"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Collapsed Icon-Only Sidebar - Desktop/Tablet (Always visible, takes space) */}
      <aside className="hidden md:flex fixed left-0 top-0 z-30 h-screen w-16 flex-col items-center bg-slate-800 border-r border-slate-700 shadow-lg">
        {/* Logo Icon - Clickable for Profile */}
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex h-16 w-full items-center justify-center border-b border-slate-700 hover:bg-slate-700 transition-colors group"
          title="Profile"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 text-white font-bold text-lg group-hover:bg-slate-600 transition-colors">
            SS
          </div>
        </button>

        {/* Icon Navigation */}
        <nav className="flex flex-col gap-2 py-4 w-full px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
              title={item.name}
            >
              {item.icon}
            </Link>
          ))}
        </nav>

        {/* Logout Icon - Bottom */}
        <div className="mt-auto mb-4 w-full px-2">
          <button
            onClick={handleLogOut}
            className="flex h-12 w-12 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-red-900/30 hover:text-red-400"
            title="Logout"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Mobile Full Sidebar */}
      <aside
        ref={sidebarRef}
        className={`md:hidden fixed left-0 top-0 z-40 h-screen bg-slate-800 border-r border-slate-700 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "260px" }}
      >
        {/* Profile Section */}
        <div className="bg-slate-900 p-5">
          <ProfileSection user={user} />
        </div>

        {/* App Title */}
        <div className="px-6 py-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Study Sync</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 px-3 pb-24">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`group flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <span className={`transition-colors ${
                isActive(item.href) ? "text-white" : "text-slate-400 group-hover:text-white"
              }`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section - Logout */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-900 p-4">
          <button 
            onClick={handleLogOut} 
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-slate-300 transition-all duration-200 hover:bg-red-900/30 hover:text-red-400 group"
          >
            <svg className="h-5 w-5 text-slate-400 transition-colors group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}




// Profile Modal Component
function ProfileModal({ user, isOpen, onClose }: { 
  user: { name: string; email: string; avatar: string | null }, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  if (!isOpen) return null;


  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="fixed left-20 top-4 z-50 w-72 bg-slate-800 rounded-xl shadow-2xl">
        {/* Profile Content */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-24 w-24 rounded-full"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-2xl font-bold text-white">
                {getInitials(user.name)}
              </div>
            )}
            
            <div className="mt-4 text-center">
              <h4 className="text-lg font-semibold text-white">{user.name}</h4>
              <p className="text-sm text-slate-400 mt-1">{user.email}</p>
            </div>
            
            <Link
              href="/profile/edit"
              onClick={onClose}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Simple close button at bottom */}
        <button 
          onClick={onClose}
          className="w-full p-3 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 border-t border-slate-700 transition-colors"
        >
          Close
        </button>
      </div>
    </>
  );
}
