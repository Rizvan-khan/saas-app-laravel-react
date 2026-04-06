import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8000/api/v1';
  const apiUrl = (endpoint) => `${apiBaseUrl}/${endpoint}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(apiUrl('register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const contentType = response.headers.get('content-type');
      
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Server returned non-JSON:', text.substring(0, 200));
        throw new Error(`Server error (${response.status}): Check console logs. Verify API endpoint is correct.`);
      }

      if (!response.ok) {
        throw new Error(data.message || `Registration failed. Please try again. (${response.status})`);
      }

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.35),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.25),transparent_25%)]" />
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-indigo-500 opacity-30 blur-3xl animate-blob" />
      <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-sky-500 opacity-25 blur-3xl animate-blob animation-delay-2000" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <div className="relative flex items-center justify-center px-6 py-10 sm:px-10 sm:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(255,255,255,0.15),transparent_35%)]" />
            <div className="relative z-10 flex h-full w-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-8 shadow-xl">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Get Started</p>
                <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                  Create your account
                </h1>
                <p className="mt-4 max-w-md text-sm text-slate-300">
                  Join our SaaS platform and start building amazing things. Fast, secure, and easy account creation.
                </p>
              </div>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-sky-300 shadow-lg shadow-slate-950/20">
                  <span className="text-xl">✨</span>
                </div>
                <p className="font-medium text-white">Image panel ready</p>
                <p className="mt-2 text-slate-400">Replace this section with your own illustration or screenshot.</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">Create your account</h2>
              <p className="mt-3 text-sm text-slate-300">
                Fill in your details to get started. All fields are required.
              </p>
              {error && (
                <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
              {success && (
                <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                  {success}
                </div>
              )}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4 rounded-3xl bg-slate-950/80 p-5 shadow-inner shadow-slate-900/40 ring-1 ring-white/10">
                <label className="block text-sm font-medium text-slate-200">
                  Name
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                    placeholder="John Doe"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-200">
                  Email
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-200">
                  Password
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                    placeholder="Enter password"
                  />
                </label>
              </div>

              <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                <input type="checkbox" required className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500" />
                I agree to the Terms of Service and Privacy Policy
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700"
                disabled={loading}
              >
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-semibold text-white hover:text-sky-200"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
