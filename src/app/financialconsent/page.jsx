'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { ArrowLeft, Upload, FileText, Building2, PlusCircle, ShoppingCart, Menu } from 'lucide-react';

const FinancialsForm = () => {
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

      {/* Header */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <motion.button 
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
            <h1 className="ml-4 text-lg text-white font-medium">Submit Financials & Consent</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Loan Info Card */}
          <Card className="bg-gray-900/40 border-white/10 shadow-xl backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">BizFIN - 001</div>
                  <div className="text-white font-medium">Working Capital Loan</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="text-sm text-gray-400">Requested Amount</div>
                <div className="text-xl font-semibold text-white mt-1">INR 75.00 L</div>
                <div className="inline-flex items-center gap-2 mt-2 text-sm text-blue-400">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Draft
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload Section */}
          <div className="space-y-4">
            {/* Provisional Statement */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-gray-900/40 border border-white/10 rounded-lg backdrop-blur-xl"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Provisional of latest FY</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Please enter all information from the date of last filing
                    </div>
                  </div>
                </div>
                <div className="text-green-500">✓</div>
              </div>
            </motion.div>

            {/* Shareholding Pattern */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-gray-900/40 border border-white/10 rounded-lg backdrop-blur-xl"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Shareholding Pattern</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Upload PDF of latest shareholders
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                  <Upload className="h-4 w-4 mr-2" /> Upload
                </Button>
              </div>
            </motion.div>

            {/* Income Tax Returns */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-gray-900/40 border border-white/10 rounded-lg backdrop-blur-xl"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Income Tax Returns</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Includes Shareholding Pattern, Provisionals of latest FY and 2 year...
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3">
            <Checkbox className="mt-1 border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" />
            <label className="text-sm text-gray-400">
              I, as the Authorized Representative of the Requesting Entity, hereby consent, on behalf of the Requesting Entity, to the lending parties accessing and utilizing the aforementioned data for the purpose of obtaining credit bureau reports for the shareholders and the Requesting Entity, and consent...
            </label>
          </div>

          {/* Footer */}
          <div className="pt-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Upload className="h-4 w-4" />
              Upload 4 documents to unlock lenders
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FinancialsForm;