"use client"

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} bg-black text-white min-h-screen flex flex-col items-center justify-center p-4`}
      >
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#9200cf] mb-4">Erro Crítico</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Algo deu muito errado</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
            Ocorreu um erro crítico ao carregar o site. Por favor, tente novamente.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#9200cf] hover:bg-[#a02ee3] transition-colors rounded-md font-medium"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  )
}
