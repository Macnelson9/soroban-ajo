// Issue #20: Design responsive dashboard layout
// Complexity: Trivial (100 pts)
// Status: Complete - with loading states from #62, theme toggle #58

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GroupCard } from './GroupCard'
import { WalletConnector } from './WalletConnector'
import { useAuthContext } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'

export const DashboardLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useAuthContext()
  const { resolvedTheme, toggleTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/dashboard', label: 'Dashboard', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { href: '/groups', label: 'Groups', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { href: '/analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { href: '/profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-blue-600 dark:text-indigo-400">Soroban Ajo</h1>
              </Link>
              <p className="text-gray-600 dark:text-slate-400 text-sm">Decentralized Rotational Savings</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {resolvedTheme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              {isLoading && (
                <div className="flex items-center space-x-3 text-blue-600 dark:text-indigo-400">
                  <span className="text-sm font-semibold animate-pulse">Syncing...</span>
                  <div className="spinner"></div>
                </div>
              )}
              <WalletConnector />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-1 -mb-px">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? 'border-blue-600 dark:border-indigo-400 text-blue-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:border-gray-300 dark:hover:border-slate-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                  </svg>
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-700 dark:to-indigo-900 rounded-xl shadow-lg p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            {isAuthenticated ? `Welcome back!` : 'Welcome to Soroban Ajo'}
          </h2>
          <p className="text-blue-100 dark:text-indigo-200 text-lg">
            {isAuthenticated 
              ? 'Manage your savings groups and track your contributions.'
              : 'Connect your wallet to get started with community savings.'}
          </p>
          {!isAuthenticated && (
            <div className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <p className="text-sm text-blue-50 dark:text-indigo-100 mb-3">
                To start saving with your community, connect your Stellar wallet
              </p>
              <WalletConnector />
            </div>
          )}
        </div>

        {isAuthenticated && (
          <>
            {/* Stat Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow dark:shadow-slate-900/50 p-6 border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-slate-100">Active Groups</h3>
                {isLoading ? (
                  <div className="skeleton h-9 w-12 rounded mt-1"></div>
                ) : (
                  <p className="text-3xl font-bold text-blue-600 dark:text-indigo-400">0</p>
                )}
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow dark:shadow-slate-900/50 p-6 border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-slate-100">Total Saved</h3>
                {isLoading ? (
                  <div className="skeleton h-9 w-24 rounded mt-1"></div>
                ) : (
                  <p className="text-3xl font-bold text-green-600 dark:text-emerald-400">$0.00</p>
                )}
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow dark:shadow-slate-900/50 p-6 border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-slate-100">Next Payout</h3>
                {isLoading ? (
                  <div className="skeleton h-6 w-32 rounded mt-2"></div>
                ) : (
                  <p className="text-gray-600 dark:text-slate-400">None scheduled</p>
                )}
              </div>
            </div>

            {/* Groups List Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Your Groups</h2>
                <Link
                  href="/groups/create"
                  className="px-4 py-2 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-500 transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Group
                </Link>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <GroupCard isLoading={true} />
                  <GroupCard isLoading={true} />
                  <GroupCard isLoading={true} />
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 p-12 text-center">
                  <svg className="w-16 h-16 text-gray-400 dark:text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-2">No groups yet</h3>
                  <p className="text-gray-600 dark:text-slate-400 mb-6">Create your first savings group to get started</p>
                  <Link
                    href="/groups/create"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-500 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Your First Group
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}