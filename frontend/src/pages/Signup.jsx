import React, { useState } from 'react';

const API = import.meta?.env?.VITE_API || 'http://localhost:8000/api';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [login, setLogin] = useState({ email_or_phone: '', password: '' });
  const [msg, setMsg] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const post = async (url, body) => {
    const r = await fetch(`${API}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j.detail || 'error');
    return j;
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const res = await post('/signup', form);
      setMsg('Successfully registered: ' + res.email);
      setForm({ name: '', email: '', phone: '', password: '' });
    } catch (e) {
      setMsg(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await post('/login', login);
      setMsg('Welcome ' + res.user.name);
      setLogin({ email_or_phone: '', password: '' });
    } catch (e) {
      setMsg(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const themeClasses = isDark
    ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100'
    : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900';

  const cardClasses = isDark
    ? 'bg-gray-800 border-gray-700 shadow-xl'
    : 'bg-white border-gray-100 shadow-xl';

  const inputClasses = isDark
    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500';

  const buttonClasses = isDark
    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white disabled:bg-gray-600 shadow-md'
    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white disabled:bg-gray-400 shadow-md';

  const toggleButtonClasses = isDark
    ? 'text-blue-400 hover:text-blue-300'
    : 'text-blue-600 hover:text-blue-800';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses} py-8`}>
      <div className="container mx-auto px-4 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">🛡️</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Safety Portal
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Tab Toggle */}
        <div className={`rounded-xl border shadow-lg transition-colors duration-300 ${cardClasses} mb-6 overflow-hidden`}>
          <div className="flex">
            <button
              onClick={() => {setIsSignup(true); setMsg('');}}
              className={`flex-1 px-6 py-4 font-medium transition-all duration-200 ${
                isSignup
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-inner'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              👤 Sign Up
            </button>
            <button
              onClick={() => {setIsSignup(false); setMsg('');}}
              className={`flex-1 px-6 py-4 font-medium transition-all duration-200 ${
                !isSignup
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-inner'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🔑 Login
            </button>
          </div>
        </div>

        {/* Forms Card */}
        <div className={`rounded-2xl border transition-colors duration-300 ${cardClasses} overflow-hidden`}>
          <div className="p-8">
            {isSignup ? (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className={`text-center mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Join our secure platform for safety services
                </p>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${inputClasses}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${inputClasses}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${inputClasses}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 pr-12 ${inputClasses}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 ${
                        isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSignup}
                  disabled={isLoading || !form.name || !form.email || !form.phone || !form.password}
                  className={`w-full px-6 py-4 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2 ${buttonClasses} ${
                    isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className={`text-center mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Sign in to access your safety services
                </p>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Enter email or phone number"
                    value={login.email_or_phone}
                    onChange={e => setLogin({ ...login, email_or_phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${inputClasses}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={login.password}
                      onChange={e => setLogin({ ...login, password: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 pr-12 ${inputClasses}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 ${
                        isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {showLoginPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className={`ml-2 text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className={`text-sm font-medium transition-colors duration-200 ${toggleButtonClasses}`}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={isLoading || !login.email_or_phone || !login.password}
                  className={`w-full px-6 py-4 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4 ${buttonClasses} ${
                    isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            )}

            {/* Message Display */}
            {msg && (
              <div className={`mt-6 p-4 rounded-lg border-l-4 transition-colors duration-300 ${
                msg.includes('Welcome') || msg.includes('Successfully')
                  ? isDark
                    ? 'bg-green-900/30 border-green-500 text-green-200'
                    : 'bg-green-50 border-green-500 text-green-800'
                  : isDark
                  ? 'bg-red-900/30 border-red-500 text-red-200'
                  : 'bg-red-50 border-red-500 text-red-800'
              }`}>
                <p className="text-sm font-medium flex items-center">
                  {msg.includes('Welcome') || msg.includes('Successfully') ? (
                    <span className="mr-2">✅</span>
                  ) : (
                    <span className="mr-2">⚠️</span>
                  )}
                  {msg}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-8 text-center space-y-3 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p className="text-sm">Secure authentication for safety services</p>
          <div className="flex justify-center space-x-4 text-xs">
            <button className={`transition-colors duration-200 ${toggleButtonClasses}`}>
              Privacy Policy
            </button>
            <span>•</span>
            <button className={`transition-colors duration-200 ${toggleButtonClasses}`}>
              Terms of Service
            </button>
            <span>•</span>
            <button className={`transition-colors duration-200 ${toggleButtonClasses}`}>
              Help
            </button>
          </div>
          <p className="text-xs pt-2">© 2023 Safety Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}