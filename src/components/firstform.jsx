'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Lock, ChevronRight, Check, ArrowLeft, User, Shield, AlertCircle, ShoppingCart, Building, Menu } from 'lucide-react';
import useStore from '@/stores/userstore';
import { verifyBusinessAccount } from '@/api/cignetacccreate';


const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const LoanApplicationForm = () => {
  const router = useRouter();
  const taxpayerData = useStore((state) => state.taxpayerData);
  const [selectedGSTIN, setSelectedGSTIN] = useState('');
  const [verificationStep, setVerificationStep] = useState('initial');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loanAmount, setLoanAmount] = useState('1,00,00,000');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState({});

  // Initialize selectedBusinesses based on taxpayerData
  console.log('taxpayerdata',taxpayerData);
  
  React.useEffect(() => {
    if (taxpayerData?.data?.length > 0) {
      const initialSelectedBusinesses = {};
      taxpayerData.data.forEach(taxpayer => {
        initialSelectedBusinesses[taxpayer.gstin] = false;
      });
      setSelectedBusinesses(initialSelectedBusinesses);
    }
  }, [taxpayerData]);

  const handleContinue = async () => {
    if (!username.trim()) return;
    
    setIsLoading(true);
    try {
      // Now we only need to pass username
      await verifyBusinessAccount(username);
      setVerificationStep('otp');
    } catch (error) {
      console.error('Verification failed:', error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
        nextInput?.focus();
      }
    }
  };

  const handleCheckboxChange = (gstin) => {
    setSelectedBusinesses(prev => ({
      ...prev,
      [gstin]: !prev[gstin]
    }));
  };

  const handleRouter = () => {
    router.push('/bankstatment');
  };

  const renderBusinessCard = (taxpayer) => (
    <motion.div key={taxpayer.gstin} layout className="bg-white/5 p-4 sm:p-5 rounded-lg border border-white/10 hover:border-blue-500/30 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={selectedBusinesses[taxpayer.gstin]}
              onCheckedChange={() => handleCheckboxChange(taxpayer.gstin)}
              className="border-blue-500/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Building className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-white">{taxpayer.stj}</span>
            <p className="text-xs text-gray-400 mt-1">{taxpayer.gstin}</p>
            <p className="text-xs text-gray-500 mt-1">{taxpayer.lgnm}</p>
          </div>
        </div>
        <Button 
          onClick={() => {
            setSelectedGSTIN(taxpayer.gstin);
            setVerificationStep('username');
          }}
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
        >
          Verify Now
        </Button>
      </div>
      {selectedGSTIN === taxpayer.gstin && renderVerificationContent()}
    </motion.div>
  );

  // Rest of the verification content remains the same
  const renderVerificationContent = () => {
    switch (verificationStep) {
      case 'username':
        return (
          <motion.div {...fadeIn} className="space-y-6 mt-6">
            <div className="bg-gray-900/40 p-4 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-3 text-blue-400">
                <User size={20} className="flex-shrink-0" />
                <label className="text-sm font-medium">Business Account Verification</label>
              </div>
              <motion.div 
                initial={{ scale: 0.95 }} 
                animate={{ scale: 1 }} 
                className="mt-4"
              >
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus:border-blue-500/50 focus:ring-blue-500/50"
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </motion.div>
              <motion.div 
                className="mt-4" 
                whileHover={{ scale: isLoading ? 1 : 1.01 }} 
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
              >
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 disabled:opacity-50"
                  onClick={handleContinue}
                  disabled={isLoading || !username.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        );
      
      case 'otp':
        return (
          <motion.div {...fadeIn} className="space-y-6 mt-6">
            <div className="bg-gray-900/40 p-4 sm:p-6 rounded-lg border border-blue-500/20">
              <div className="flex items-start space-x-3 text-blue-400">
                <AlertCircle size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Verify Your Identity</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Enter the OTP sent to +91 XXXX0987
                  </p>
                </div>
              </div>
              
              <motion.div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between gap-2 mt-6">
                {otp.map((digit, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-10 sm:w-12"
                  >
                    <Input
                      type="text"
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-full h-12 sm:h-14 text-center bg-white/5 border-white/10 text-white text-lg sm:text-xl font-semibold focus:border-blue-500/50 focus:ring-blue-500/50"
                      maxLength={1}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="mt-6" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  onClick={() => setVerificationStep('verified')}
                >
                  Verify OTP
                </Button>
              </motion.div>
            </div>
          </motion.div>
        );
        
      case 'verified':
        return (
          <motion.div {...fadeIn} className="mt-6">
            <div className="bg-green-500/10 p-4 sm:p-6 rounded-lg border border-green-500/20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center"
              >
                <div className="bg-green-500 rounded-full p-2">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <p className="text-green-400 mt-2 text-sm font-medium">Verification Successful</p>
              </motion.div>
            </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black"
      style={{
        backgroundImage: `
          linear-gradient(rgba(25, 25, 25, 0.7) 1px, transparent 1px),
          linear-gradient(90deg, rgba(25, 25, 25, 0.7) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: '-1px -1px'
      }}>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      {/* Navigation */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
              <Image 
                src="/Mainlogo.png" 
                alt="FlashFund" 
                width={140}
                height={80}
                className="w-32 sm:w-44 h-auto"
              />
            </motion.div>
            
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors sm:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div {...fadeIn}>
          <Card className="bg-gray-900/40 border-white/10 shadow-2xl backdrop-blur-xl">
            <CardHeader>
               <motion.div className="flex items-center justify-between mb-6">
                <motion.button 
                  className="text-gray-400 hover:text-white transition flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10"
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back</span>
                </motion.button>
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-white">Working Capital Loan Application</h2>
                <p className="text-sm sm:text-base text-blue-400">
                  Verify additional GSTINs to unlock enhanced financing options
                </p>
              </div>
            </CardHeader>
          
            <CardContent className="space-y-6">
              {/* Loan Amount Section */}
              <motion.div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Loan Amount Required</label>
                <div className="relative">
                  <Input 
                    type="text"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-lg pl-12 pr-16 h-14 focus:border-blue-500/50 focus:ring-blue-500/50"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                    INR
                  </span>
                </div>
              </motion.div>

              {/* Business Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">Select Business GSTIN</label>
                  <span className="text-xs text-blue-400">Step 1 of 3</span>
                </div>
                
                {taxpayerData?.map(taxpayer => renderBusinessCard(taxpayer))}
                
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-6 pt-6">
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white h-14 text-lg shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleRouter}
                  disabled={!Object.values(selectedBusinesses).some(value => value) || verificationStep !== 'verified'}
                >
                  Continue to Next Step
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center text-sm text-green-600 gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Lock className="h-4 w-4 text-green-600" />
                Your data is encrypted and secure
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoanApplicationForm;