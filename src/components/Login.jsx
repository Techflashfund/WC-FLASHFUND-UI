"use client";
import React, { useState } from "react";
import { Loader2, DollarSign, Briefcase, LineChart, CheckCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/stores/userstore";
import { useRouter } from "next/navigation"; 

const LoginPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [lockTimer, setLockTimer] = useState(null);
  

  const setUser = useStore((state) => state.setUser);
  const setTaxpayerData = useStore((state) => state.setTaxpayerData);

  const features = [
    {
      icon: DollarSign,
      title: "Instant Funding",
      description: "Access capital within 24 hours"
    },
    {
      icon: Briefcase,
      title: "Flexible Solutions",
      description: "Customized to your business needs"
    },
    {
      icon: LineChart,
      title: "Growth Analytics",
      description: "Track and optimize your success"
    }
  ];

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const logindata = await response.json();
      setUser(logindata.email, logindata._id, logindata.panNumber,logindata.phnnumber); 

      const Gstresults = await fetch('http://localhost:3001/cignet/authenticate/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ panNumber: logindata.panNumber })
      });

      console.log('Gstresults',Gstresults);
      
      
      if (!Gstresults.ok) {
        throw new Error('Network response was not ok');
      }
      
      const responseData = await Gstresults.json();
      console.log('response gst',responseData);
      
      const fetchedData = responseData.taxpayerData?.data || [];
      console.log('fetcheddata',fetchedData);
      
      setTaxpayerData(fetchedData); 

      if (!response.ok) {
        if (response.status === 423) {
          // Account is locked
          const lockUntil = new Date(data.lockUntil);
          const timeRemaining = Math.ceil((lockUntil - Date.now()) / 1000);
          setLockTimer(timeRemaining);
          
          // Start countdown timer

          const timer = setInterval(() => {
            setLockTimer((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                setError(null);
                return null;
              }
              return prev - 1;
            });
          }, 1000);
        }
        throw new Error(data.message);
      }

      // Handle successful login
      if (rememberMe) {
        localStorage.setItem('token', logindata.token);
      } else {
        sessionStorage.setItem('token', logindata.token);
      }

      // Redirect or handle successful login
      
      router.push('/gstselect');// Or use your preferred navigation method

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentStep === 2) {
      await handleLogin();
    } else {
      nextStep();
    }
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(curr => curr + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(curr => curr - 1);
  };

  const renderErrorMessage = () => {
    if (!error) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-4"
      >
        <p className="text-red-400 text-sm">
          {error}
          {lockTimer && (
            <span> Please try again in {lockTimer} seconds.</span>
          )}
        </p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black "
    style={{
      backgroundImage: `
        linear-gradient(rgba(25, 25, 25, 0.7) 1px, transparent 1px),
        linear-gradient(90deg, rgba(25, 25, 25, 0.7) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      backgroundPosition: '-1px -1px'
    }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="w-full h-full" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" mx-auto min-h-screen relative z-10"
      >
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8">
          {/* Form Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full lg:w-1/2 order-1"
          >
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl max-w-xl mx-auto">
              <div className="mb-8">
                <Image 
                  src="/Mainlogo.png" 
                  alt="FlashFund" 
                  width={180} 
                  height={50}
                  className="mb-6 mx-auto lg:mx-0"
                />
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent text-center lg:text-left">
                  Welcome Back
                </h2>
                <p className="text-blue-200/80 mt-2 text-center lg:text-left">
                  Fuel your growth with the working capital you need to succeed
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center max-w-sm mx-auto lg:mx-0">
                  {[1, 2].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === currentStep 
                          ? "bg-blue-500 text-white" 
                          : step < currentStep 
                            ? "bg-green-500 text-white"
                            : "bg-white/20 text-white/60"
                      }`}>
                        {step < currentStep ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          step
                        )}
                      </div>
                      {step < 2 && (
                        <div className={`w-12 md:w-16 h-0.5 mx-2 ${
                          step < currentStep ? "bg-green-500" : "bg-white/20"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-white/80 text-sm">Business Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none text-white placeholder-white/40"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-white/80 text-sm">Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none text-white placeholder-white/40"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500" 
                          />
                          <span className="text-sm text-white/80">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {renderErrorMessage()}

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 text-white/80 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    Back
                  </button>
                )}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading || lockTimer}
                  className={`ml-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium flex items-center gap-2 group ${
                    (isLoading || lockTimer) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      {currentStep === 2 ? "Sign In" : "Continue"}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </div>

              <p className="mt-6 text-center text-white/60">
                Don't have an account?{" "}
                <a href="/auth/signup" className="text-blue-400 hover:text-blue-300">Sign up</a>
              </p>
            </form>
          </motion.div>

          {/* Image & Features Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full lg:w-1/2 order-2 flex flex-col items-center justify-center"
          >
            <div className="relative mb-8">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex justify-center"
              >
                <Image
                  src="/Credit assesment-rafiki.png"
                  alt="Business Growth"
                  width={400}
                  height={400}
                  className="w-full max-w-md h-auto drop-shadow-2xl"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20"
                >
                  <feature.icon className="h-6 w-6 text-blue-400 mb-2" />
                  <h3 className="text-white font-medium">{feature.title}</h3>
                  <p className="text-blue-200/80 text-sm mt-1">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;