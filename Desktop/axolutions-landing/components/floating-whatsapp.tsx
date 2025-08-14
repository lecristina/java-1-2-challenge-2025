"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNotification, setHasNotification] = useState(false)

  useEffect(() => {
    // Simular uma notificação após 3 segundos
    const timer = setTimeout(() => {
      setHasNotification(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/5511983207820?text=Olá! Gostaria de saber mais sobre os serviços da Axolutions.",
      "_blank",
    )
    setIsOpen(false)
    setHasNotification(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-4 mb-4 w-72"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-medium text-gray-800">Axolutions</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Olá! Como podemos ajudar você hoje? Clique abaixo para iniciar uma conversa no WhatsApp.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Iniciar conversa</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(!isOpen)
          setHasNotification(false)
        }}
      >
        <MessageCircle className="w-7 h-7 text-white" />

        {/* Notification dot */}
        {hasNotification && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          />
        )}
      </motion.button>
    </div>
  )
}
