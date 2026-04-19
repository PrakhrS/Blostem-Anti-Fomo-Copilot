import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Target, Wallet, Activity } from 'lucide-react';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    monthlyIncome: '',
    liquidCash: '',
    riskProfile: 'Moderate'
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        Number(formData.monthlyIncome),
        Number(formData.liquidCash),
        formData.riskProfile
      );
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background py-12 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] opacity-5 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-danger rounded-full blur-[150px] opacity-5 pointer-events-none"></div>

      <div className="w-full max-w-xl bg-surface p-8 sm:p-10 rounded-3xl border border-gray-800/50 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-inner shadow-primary/20">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-tight">Create an Account</h2>
        <p className="text-gray-400 text-center mb-8">Join Anti-FOMO Copilot and master your investments</p>

        {error && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-2">
            <div className="mt-0.5">•</div>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5 pl-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-background/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-white outline-none transition-all placeholder-gray-600"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5 pl-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-background/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-white outline-none transition-all placeholder-gray-600"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 pl-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-11 pr-4 py-3 bg-background/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-white outline-none transition-all placeholder-gray-600"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-800/80"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface px-4 text-sm font-medium text-gray-400 tracking-wider uppercase flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Financial Profile
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5 pl-1">Monthly Income ($)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Activity className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="number"
                  required
                  min="0"
                  className="block w-full pl-11 pr-4 py-3 bg-background/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-white outline-none transition-all placeholder-gray-600"
                  placeholder="5000"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5 pl-1">Liquid Cash ($)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Wallet className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="number"
                  required
                  min="0"
                  className="block w-full pl-11 pr-4 py-3 bg-background/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-white outline-none transition-all placeholder-gray-600"
                  placeholder="15000"
                  value={formData.liquidCash}
                  onChange={(e) => setFormData({ ...formData, liquidCash: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="pb-2">
            <label className="block text-sm font-medium text-gray-400 mb-1.5 pl-1">Risk Profile</label>
            <div className="relative">
              <select
                className="block w-full px-4 py-3 bg-background/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-white outline-none transition-all appearance-none cursor-pointer"
                value={formData.riskProfile}
                onChange={(e) => setFormData({ ...formData, riskProfile: e.target.value })}
              >
                <option value="Conservative">Conservative (Low Risk, Stable)</option>
                <option value="Moderate">Moderate (Balanced)</option>
                <option value="Aggressive">Aggressive (High Risk, Compounding)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-lg shadow-primary/20 text-sm font-semibold text-background bg-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-all disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-white font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
