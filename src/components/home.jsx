"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CircleDollarSign, TrendingUp, Shield } from "lucide-react";
import { useRouter } from "next/navigation"; 


const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

export default function Home() {
   const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handlesubmit=()=>{
    router.push('/auth/signup');
  }
  const handleloginbutton=()=>{
    router.push('/auth/login');
  }


  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(25, 25, 25, 0.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(25, 25, 25, 0.7) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '-1px -1px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Refined Navigation */}
      <motion.nav
        variants={fadeInUp}
        className={`fixed w-full px-4 sm:px-6 py-4 md:px-12 z-20 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="relative">
            <Image
              src="/P1-removebg-preview.png"
              alt="flashfund"
              width={150}
              height={75}
              className="w-32 md:w-auto"
            />
          </Link>

          <motion.div
            variants={staggerContainer}
            className="hidden md:flex items-center space-x-8"
          >
            {["Home", "Customers", "Collaborator", "Contact Us"].map((item) => (
              <motion.div
                key={item}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-white/90 hover:text-white font-medium px-4 py-2 rounded-full transition-colors duration-300 text-sm lg:text-base"
                >
                  {item}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500/50 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full py-2 px-6 md:py-6 md:px-12 text-sm md:text-lg font-semibold shadow-lg transition-all duration-300"
              onClick={handleloginbutton}
            >
              Login
            </Button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 pt-32 px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[80vh]">
          {/* Left Section */}
          <motion.div
            variants={staggerContainer}
            className="w-full lg:w-1/2 space-y-8"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              At{" "}
              <motion.span
                className="text-blue-500 inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                flashfund
              </motion.span>{" "}
              we put
              <br />
              the customer first.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-gray-300 max-w-xl leading-relaxed"
            >
              Fuel your business growth with our tailored{" "}
              <span className="text-blue-400 font-bold uppercase">
                working capital
              </span>{" "}
              solutions.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 pt-6"
            >
              <motion.button
               
                className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full py-4 sm:py-6 px-8 sm:px-16 text-lg sm:text-xl font-semibold text-white shadow-xl"
                whileHover={{ scale: 1.05 }}
                onClick={handlesubmit}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span className="relative z-10 flex items-center justify-center gap-4">
                  Apply Now
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Enhanced Right Section with 3D Card Effect */}
          <motion.div
            variants={fadeInUp}
            className="w-full lg:w-1/2 relative"
          >
            <motion.div
              className="relative w-full aspect-square max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              {/* Feature Cards */}
              <div className="relative w-full h-full grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <CircleDollarSign className="w-8 h-8 text-blue-400" />,
                    title: "Quick Funding",
                    description: "Get capital within 24 hours of approval"
                  },
                  {
                    icon: <TrendingUp className="w-8 h-8 text-green-400" />,
                    title: "Growth Focus",
                    description: "Tailored solutions for business expansion"
                  },
                  {
                    icon: <Shield className="w-8 h-8 text-purple-400" />,
                    title: "Secure Process",
                    description: "Bank-grade security protocols"
                  },
                  {
                    title: "Success Rate",
                    description: "95% client satisfaction score",
                    customContent: (
                      <div className="text-4xl font-bold text-blue-400">95%</div>
                    )
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="relative bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/5 overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, zIndex: 1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {feature.icon && (
                      <div className="mb-4">{feature.icon}</div>
                    )}
                    {feature.customContent && (
                      <div className="mb-4">{feature.customContent}</div>
                    )}
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>

                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 inset-0">
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0) 70%)"
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}