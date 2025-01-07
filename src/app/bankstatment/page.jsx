'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from "next/navigation"; 
import { Lock, ChevronRight, ArrowLeft, Database, Upload, Menu, ShoppingCart } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};



const BankStatementsForm = () => {
     const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handlerouter=()=>{
    router.push('/financialconsent')
  }
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
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="sm:hidden mt-4 bg-white/5 rounded-lg overflow-hidden"
              >
                <div className="p-4 space-y-2">
                  <a href="#" className="block text-white hover:text-blue-400 py-2">Dashboard</a>
                  <a href="#" className="block text-white hover:text-blue-400 py-2">Applications</a>
                  <a href="#" className="block text-white hover:text-blue-400 py-2">Support</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                <p className="text-sm text-gray-400">You selected</p>
                <h2 className="text-xl sm:text-2xl font-semibold text-white">Working Capital Loans</h2>
                <p className="text-sm sm:text-base text-blue-400">
                  Verify more GSTINs to avail better financing options.
                </p>
              </div>
            </CardHeader>
          
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">
                    Provide bank statements to continue.
                  </h3>
                  <p className="text-sm text-gray-400">
                    Choose auto-fetch for quicker analysis & sanctions.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Database className="h-5 w-5" />
                    <span className="font-medium">Bank Statements</span>
                  </div>

                  <p className="text-sm text-gray-400">
                    Share your 12-month bank statements.
                  </p>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      className="w-full h-12 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-normal justify-center gap-2 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Bank Statements
                    </Button>
                  </motion.div>

                  <div className="text-center text-sm text-gray-400">OR</div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      className="w-full h-12 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-normal justify-center gap-2 transition-colors"
                    >
                      <Database className="h-4 w-4" />
                      Auto-fetch Statements
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-6 pt-6">
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button 
                 onClick={ handlerouter}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white h-14 text-lg shadow-lg shadow-blue-500/20"
                >
                  Proceed
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
                Your data is 100% Secure
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BankStatementsForm;