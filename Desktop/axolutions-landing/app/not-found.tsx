import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-black text-white">
      <h1 className="text-5xl md:text-7xl font-bold text-[#9200cf] mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Página não encontrada</h2>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-md">
        A página que você está procurando não existe ou foi movida para outro endereço.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#9200cf]/30 transition-all"
      >
        Voltar para Home
      </Link>
    </div>
  )
}
