"use client"

import { motion } from "framer-motion"

export function LoadingBubble() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative w-24 h-24">
        {/* Bolla esterna pulsante */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#B8D8E8]/20"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Bolla interna che si riempie */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <motion.path
            d="M50 5 A45 45 0 1 1 50 95 A45 45 0 1 1 50 5"
            fill="none"
            stroke="#B8D8E8"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="#B8D8E8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </div>
  )
}

