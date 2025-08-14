// Usando a API gratuita LibreTranslate para tradução
// Você pode substituir por outra API como Google Translate ou DeepL se preferir

const LIBRE_TRANSLATE_API = "https://libretranslate.com/translate"
// Alternativa: use uma instância auto-hospedada ou outra API
// const LIBRE_TRANSLATE_API = "https://api.your-translation-service.com/translate"

// Cache para armazenar traduções já realizadas
const translationCache: Record<string, Record<string, string>> = {}

export async function translateText(text: string, targetLang: string, sourceLang = "pt"): Promise<string> {
  // Verificar se já temos essa tradução em cache
  if (translationCache[text]?.[targetLang]) {
    return translationCache[text][targetLang]
  }

  // Se o texto estiver vazio ou o idioma de origem for igual ao de destino, retornar o texto original
  if (!text || sourceLang === targetLang) {
    return text
  }

  try {
    const response = await fetch(LIBRE_TRANSLATE_API, {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error("Erro na tradução:", await response.text())
      return text // Retorna o texto original em caso de erro
    }

    const data = await response.json()
    const translatedText = data.translatedText || text

    // Armazenar no cache
    if (!translationCache[text]) {
      translationCache[text] = {}
    }
    translationCache[text][targetLang] = translatedText

    return translatedText
  } catch (error) {
    console.error("Erro ao traduzir texto:", error)
    return text // Retorna o texto original em caso de erro
  }
}

// Função para traduzir conteúdo de markdown preservando a formatação
export async function translateMarkdown(markdown: string, targetLang: string, sourceLang = "pt"): Promise<string> {
  if (!markdown || sourceLang === targetLang) {
    return markdown
  }

  // Identificar e preservar blocos de código
  const codeBlocks: string[] = []
  const markdownWithoutCode = markdown.replace(/```[\s\S]*?```|`[\s\S]*?`/g, (match) => {
    codeBlocks.push(match)
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`
  })

  // Traduzir o texto sem os blocos de código
  const translatedMarkdown = await translateText(markdownWithoutCode, targetLang, sourceLang)

  // Restaurar os blocos de código
  const finalMarkdown = translatedMarkdown.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => {
    return codeBlocks[Number.parseInt(index)]
  })

  return finalMarkdown
}
