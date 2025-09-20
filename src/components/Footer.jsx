import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linkVariants = {
    rest: { y: 0 },
    hover: { y: -2, transition: { duration: 0.2, ease: "easeOut" } }
  };

  const socialVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.3, ease: "backOut" }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-playfair text-3xl font-bold text-teal-400 mb-6">
                HealthRx
              </h3>
              <p className="text-zinc-300 text-lg leading-relaxed mb-8 max-w-md">
                Premium protein crafted for peak performance. 
                <span className="block mt-2 text-teal-300">
                  Fuel your potential. Embrace your strength.
                </span>
              </p>
              
              {/* Newsletter signup */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-400 hover:to-teal-500 transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Navigation links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-semibold text-white mb-6 text-lg">Products</h4>
              <ul className="space-y-4">
                {['Whey Protein', 'Plant Protein', 'Pre Workout', 'BCAA', 'Creatine', 'Multivitamins'].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      variants={linkVariants}
                      initial="rest"
                      whileHover="hover"
                      className="text-zinc-300 hover:text-teal-400 transition-colors duration-200 inline-block"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Support links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold text-white mb-6 text-lg">Support</h4>
              <ul className="space-y-4">
                {['Help Center', 'Contact Us', 'Shipping Info', 'Returns', 'FAQ', 'Nutrition Guide'].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      variants={linkVariants}
                      initial="rest"
                      whileHover="hover"
                      className="text-zinc-300 hover:text-teal-400 transition-colors duration-200 inline-block"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>

              {/* Social links */}
              <div className="mt-8">
                <h5 className="font-medium text-white mb-4">Follow Us</h5>
               
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="border-t border-zinc-800"
      >
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-sm">
              © {currentYear} HealthRx. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item, index) => (
                <React.Fragment key={item}>
                  <motion.a
                    href="#"
                    variants={linkVariants}
                    initial="rest"
                    whileHover="hover"
                    className="text-zinc-400 hover:text-teal-400 transition-colors duration-200 inline-block"
                  >
                    {item}
                  </motion.a>
                  {index < 2 && <span className="text-zinc-600">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Premium touch - subtle glow line */}
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

          {/* Bottom center credit */}
          <p className="mt-3 text-center text-xs text-zinc-500">
            Designed & Developed By TheSocialKollab
          </p>
        </div>
      </motion.div>
    </footer>
  );
}