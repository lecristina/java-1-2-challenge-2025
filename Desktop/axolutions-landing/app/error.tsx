"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-black text-white">
      <h1 className="text-5xl md:text-7xl font-bold text-[#9200cf] mb-4">Erro</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Algo deu errado</h2>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-md">
        Ocorreu um erro ao carregar esta página. Por favor, tente novamente.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#9200cf] hover:bg-[#a02ee3] transition-colors rounded-md font-medium"
        >
          Tentar novamente
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-[#9200cf] hover:bg-[#9200cf]/10 transition-colors rounded-md font-medium text-center"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
