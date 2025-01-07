
"use client";
import React, { useState } from "react";
import { Loader2, DollarSign, Briefcase, LineChart, CheckCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation"; 

const PremiumSignup = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    panNumber: "",
    password: "",
    confirmPassword: ""
  });

  const features = [
    {
      icon: DollarSign,
      title: "Instant Funding",
      description: "Access capital within 48 hours"
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

  const validateForm = () => {
    if (currentStep === 1) {
      if (!formData.businessName.trim()) {
        setError("Business name is required");
        return false;
      }
      if (!formData.businessEmail.trim() || !/\S+@\S+\.\S+/.test(formData.businessEmail)) {
        setError("Please enter a valid email address");
        return false;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.panNumber.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
        setError("Please enter a valid PAN number");
        return false;
      }
    }
    
    if (currentStep === 3) {
      if (!formData.password || formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }
    
    setError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/auth/signup", {
        email: formData.businessEmail,
        password: formData.password,
        panNumber: formData.panNumber,
        phnnumber:formData.businessName
      });

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        router.push('/auth/login');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error during signup. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (validateForm() && currentStep < 3) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(curr => curr - 1);
      setError("");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="w-full h-full  blur-xl" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black mx-auto min-h-screen relative z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(25, 25, 25, 0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(25, 25, 25, 0.7) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '-1px -1px'
        }}
      >
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full lg:w-1/2 order-1"
          >
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl max-w-xl mx-auto">
              <div className="mb-8">
                <Image 
                  src="/Mainlogo.png" 
                  alt="FlashFund" 
                  width={180} 
                  height={50}
                  className="mb-6 mx-auto lg:mx-0"
                />
                <h2 className="text-2xl md:text-3xl font-bold   text-blue-500/50 text-center lg:text-left">
                  Power Your Growth
                </h2>
                <p className="text-blue-200/80 mt-2 text-center lg:text-left">
                  Fuel your growth with the working capital you need to succeed
                </p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <div className="mb-8">
                <div className="flex justify-between items-center max-w-sm mx-auto lg:mx-0">
                  {[1, 2, 3].map((step) => (
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
                      {step < 3 && (
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
                        <label className="text-white/80 text-sm">Phone Number</label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none text-white placeholder-white/40"
                          placeholder="Enter your Phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/80 text-sm">Business Email</label>
                        <input
                          type="email"
                          name="businessEmail"
                          value={formData.businessEmail}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none text-white placeholder-white/40"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-white/80 text-sm">PAN No</label>
                        <input
                          type="text"
                          name="panNumber"
                          value={formData.panNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none text-white placeholder-white/40"
                          placeholder="Enter PAN Number"
                        />
                      </div>
                      
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-white/80 text-sm">Create Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none text-white placeholder-white/40"
                          placeholder="Enter your password"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/80 text-sm">Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none text-white placeholder-white/40"
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 text-white/80 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={currentStep === 3 ? handleSubmit : nextStep}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium flex items-center gap-2 group"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      {currentStep === 3 ? "Complete Setup" : "Continue"}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </div>

              <p className="mt-6 text-center text-white/60">
                Already have an account?{" "}
                <a href="/auth/login" className="text-blue-400 hover:text-blue-300">Sign in</a>
              </p>
            </div>
          </motion.div>

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
                  key={index}initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-xl p-4 rounded-xl border border-white/20"
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

export default PremiumSignup;