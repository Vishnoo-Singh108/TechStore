  import React, { useState, useEffect } from 'react';
  import { Mail, Lock, User, ArrowLeft, Check, Phone } from 'lucide-react';
  import { Button } from './ui/button';
  import { Input } from './ui/input';
  import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
  import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
  import { toast } from 'sonner';
  import API from '../api'; // centralized API instance

  interface AuthProps {
    isOpen: boolean;
    onClose: () => void;
    onSignIn: (user: any) => void;
  }

  type AuthMode = 'signin' | 'signup' | 'otp-verification';

  interface SignUpData {
    name: string;
    email: string;
    password: string;
    phone: string;
    latitude?: number;
    longitude?: number;
  }

  interface SignInData {
    email: string;
    password: string;
  }

  export function Auth({ isOpen, onClose, onSignIn }: AuthProps) {
    const [mode, setMode] = useState<AuthMode>('signin');
    const [signUpData, setSignUpData] = useState<SignUpData>({
      name: '',
      email: '',
      password: '',
      phone: '',
      latitude: undefined,
      longitude: undefined,
    });
    const [signInData, setSignInData] = useState<SignInData>({
      email: '',
      password: '',
    });
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Auto-geolocation for signup
    useEffect(() => {
      if (mode === 'signup' && navigator.geolocation) {
        const watcher = navigator.geolocation.getCurrentPosition(
          (pos) => {
            setSignUpData((prev) => ({
              ...prev,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            }));
          },
          () => toast.error('Geolocation permission denied or unavailable')
        );
        return () => navigator.geolocation.clearWatch?.(watcher as any);
      }
    }, [mode]);

    // ================= SIGN UP =================
    const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
      if (signUpData.password.length < 6) return toast.error('Password must be at least 6 characters');
      if (!signUpData.phone) return toast.error('Phone number is required');

      try {
        setIsLoading(true);
        const res = await API.post('/auth/register', signUpData);
        toast.success(res.data.message || 'OTP sent to email');
        setMode('otp-verification');
      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // ================= VERIFY OTP =================
    const handleVerifyOtp = async () => {
      try {
        setIsLoading(true);
        const res = await API.post('/auth/verify-email', { email: signUpData.email, otp });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast.success(res.data.message);
        onSignIn(res.data.user);
        handleClose();
      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // ================= SIGN IN =================
    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const res = await API.post('/auth/login', signInData);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast.success(res.data.message);
        onSignIn(res.data.user);
        handleClose();
      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const resetForms = () => {
      setSignUpData({ name: '', email: '', password: '', phone: '', latitude: undefined, longitude: undefined });
      setSignInData({ email: '', password: '' });
      setOtp('');
      setMode('signin');
    };

    const handleClose = () => {
      resetForms();
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-2">
              {mode !== 'signin' && (
                <Button variant="ghost" size="icon" onClick={() => setMode(mode === 'otp-verification' ? 'signup' : 'signin')}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div className="flex-1" />
              <Button variant="ghost" size="icon" onClick={handleClose}>×</Button>
            </div>
            <CardTitle>
              {mode === 'signin' && 'Welcome Back'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'otp-verification' && 'Verify Your Email'}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {mode === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <InputField icon={<Mail />} type="email" value={signInData.email} onChange={e => setSignInData(prev => ({ ...prev, email: e.target.value }))} placeholder="Email" />
                <InputField icon={<Lock />} type="password" value={signInData.password} onChange={e => setSignInData(prev => ({ ...prev, password: e.target.value }))} placeholder="Password" />
                <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign In'}</Button>
                <div className="text-center">
                  <Button type="button" variant="link" onClick={() => setMode('signup')} className="text-sm">Don't have an account? Sign up</Button>
                </div>
              </form>
            )}

            {mode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <InputField icon={<User />} type="text" value={signUpData.name} onChange={e => setSignUpData(prev => ({ ...prev, name: e.target.value }))} placeholder="Full Name" />
                <InputField icon={<Phone />} type="tel" value={signUpData.phone} onChange={e => setSignUpData(prev => ({ ...prev, phone: e.target.value }))} placeholder="Phone Number" />
                <InputField icon={<Mail />} type="email" value={signUpData.email} onChange={e => setSignUpData(prev => ({ ...prev, email: e.target.value }))} placeholder="Email" />
                <InputField icon={<Lock />} type="password" value={signUpData.password} onChange={e => setSignUpData(prev => ({ ...prev, password: e.target.value }))} placeholder="Password" />
                <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Create Account'}</Button>
                <div className="text-center">
                  <Button type="button" variant="link" onClick={() => setMode('signin')} className="text-sm">Already have an account? Sign in</Button>
                </div>
              </form>
            )}

            {mode === 'otp-verification' && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => <InputOTPSlot key={i} index={i} />)}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button onClick={handleVerifyOtp} className="w-full" disabled={otp.length !== 6}>
                  <Check className="w-4 h-4 mr-2" /> Verify & Create Account
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const InputField = ({ icon, ...props }: any) => (
    <div>
      <div className="relative">
        <div className="absolute left-3 top-3 text-muted-foreground">{icon}</div>
        <Input {...props} className="pl-10" required />
      </div>
    </div>
  );
