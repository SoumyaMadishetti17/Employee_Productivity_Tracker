import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Logo } from '../Logo';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, error, loading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-md mx-auto"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl" />
      <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)]" />
      
      <div className="relative p-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-white/30 focus:ring-white/20"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-white/30 focus:ring-white/20"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm bg-red-500/10 p-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:bg-white/30 transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>

          <p className="text-center text-white/80">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
    </motion.div>
  );
}