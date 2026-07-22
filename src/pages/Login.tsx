import { useState } from "react";
import { User, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Mail } from "lucide-react";
import logo from "../assets/cybence-logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot Password state management
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate API request
    setTimeout(() => {
      console.log({ username, password, rememberMe });
      setIsLoading(false);
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 overflow-hidden select-none">
      
      {/* --- Dispersed Mesh Ambient Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left Beam */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[50vh] rotate-[-25deg] rounded-[100%] bg-gradient-to-br from-[#106fb8]/35 to-sky-300/20 blur-[130px]" />

        {/* Bottom Right Beam */}
        <div className="absolute -bottom-[20%] -right-[10%] w-[75vw] h-[55vh] rotate-[20deg] rounded-[100%] bg-gradient-to-tl from-sky-400/35 to-[#106fb8]/20 blur-[140px]" />

        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[400px] rounded-full bg-sky-200/30 blur-[150px]" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/80 bg-white/85 backdrop-blur-xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all">
        
        {/* Top Accent Bar */}
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-sky-400 to-[#106fb8]" />

        {/* Header Section */}
        <div className="mb-8 flex flex-col items-center text-center">
          <img 
            src={logo} 
            alt="Cybence Logo" 
            className="mb-4 h-16 w-auto object-contain transition-all sm:h-20" 
          />

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Cybence IT Solutions Scheduler
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            {isForgotMode ? "Reset your account password" : "Sign in to continue"}
          </p>
        </div>

        {/* Optional Error Alert */}
        {error && (
          <div className="mb-5 flex items-center gap-2.5 rounded-2xl border border-red-100 bg-red-50/80 p-3.5 text-xs font-semibold text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {!isForgotMode ? (
          /* LOGIN FORM */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Username
              </label>
              <div className="group relative flex items-center">
                <User className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none transition-colors group-focus-within:text-[#106fb8]" />
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 py-3.5 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all hover:border-slate-300 focus:border-[#106fb8] focus:bg-white focus:ring-4 focus:ring-[#106fb8]/10"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="group relative flex items-center">
                <Lock className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none transition-colors group-focus-within:text-[#106fb8]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 py-3.5 pl-11 pr-11 text-slate-900 placeholder:text-slate-400 outline-none transition-all hover:border-slate-300 focus:border-[#106fb8] focus:bg-white focus:ring-4 focus:ring-[#106fb8]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer select-none items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 text-[#106fb8] focus:ring-[#106fb8]/30 accent-[#106fb8]"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setIsForgotMode(true)}
                className="font-medium text-[#106fb8] transition-colors hover:underline hover:text-[#0e5ea4] focus:outline-none cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#106fb8] py-3.5 font-semibold text-white shadow-md shadow-[#106fb8]/20 transition-all hover:bg-[#0e5ea4] hover:shadow-lg hover:shadow-[#106fb8]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        ) : (
          /* FORGOT PASSWORD FORM */
          <form onSubmit={handleResetPassword} className="space-y-5">
            {resetSent ? (
              <div className="text-center space-y-4 py-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Mail className="h-6 w-6" />
                </div>
                <p className="text-sm text-slate-600">
                  Password reset link sent to <strong className="text-slate-800">{resetEmail}</strong>. Please check your inbox.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setResetSent(false);
                    setIsForgotMode(false);
                  }}
                  className="mt-2 text-sm font-semibold text-[#106fb8] hover:underline cursor-pointer"
                >
                  Back to sign in
                </button>
              </div>
            ) : (
              <>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email or Username
                  </label>
                  <div className="group relative flex items-center">
                    <Mail className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none transition-colors group-focus-within:text-[#106fb8]" />
                    <input
                      type="text"
                      placeholder="Enter your email or username"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 py-3.5 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all hover:border-slate-300 focus:border-[#106fb8] focus:bg-white focus:ring-4 focus:ring-[#106fb8]/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#106fb8] py-3.5 font-semibold text-white shadow-md shadow-[#106fb8]/20 transition-all hover:bg-[#0e5ea4] hover:shadow-lg hover:shadow-[#106fb8]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotMode(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}