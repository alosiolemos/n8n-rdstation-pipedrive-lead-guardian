// Função para decodificar e extrair apenas o texto puro
const decodeHtml = (html) => {
  return html
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '') // Remove conteúdo de tags <script>
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '') // Remove conteúdo de tags <style>
    .replace(/<[^>]+>/gi, '') // Remove todas as outras tags HTML
    .replace(/formatNumber\([^)]*\)/gi, '') // Remove chamadas para formatNumber
    .replace(/\([^)]*\)/g, '') // Remove valores entre parênteses
    .replace(/{|}/g, '') // Remove chaves {}
    .replace(/--+>/g, '') // Remove "--->"
    .replace(/---+/g, '') // Remove múltiplos traços "---"
    .replace(/>+/g, '') // Remove o caractere ">" repetido
    .replace(/\$/g, '') // Remove o símbolo "$"
    .replace(/R\$/g, '') // Remove o símbolo "R$"
    .replace(/&+/g, '') // Remove o símbolo "&" repetido
    .replace(/\.+/g, '') // Remove pontos repetidos ou isolados
    .replace(/\)+/g, '') // Remove parênteses fechando `)`
    .replace(/-+/g, '') // Remove traços `-`
    .replace(/\++/g, '') // Remove sinais de mais `+`
    .replace(/\bnbsp\b/g, '') // Remove a palavra "nbsp"
    .replace(/;+/, '') // Remove ponto-e-vírgula
    .replace(/\[0\]/g, '') // Remove "[0]"
    .replace(/\bsplit\b/g, '') // Remove a palavra "split"
    .replace(/\.join\b/g, '') // Remove ".join"
    .replace(/&(quot|#34);/g, '') // Substitui entidades HTML para aspas duplas
    .replace(/&(apos|#39);/g, '') // Substitui entidades HTML para aspas simples
    .replace(/&(lt|#60);/g, '<')   // Substitui entidades HTML para menor que
    .replace(/&(gt|#62);/g, '>')   // Substitui entidades HTML para maior que
    .replace(/&(amp|#38);/g, '&')  // Substitui entidades HTML para "&"
    .replace(/&(nbsp|#160);/g, ' ') // Substitui espaços não separáveis
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code)) // Decodifica entidades numéricas
    .replace(/"/g, '') // Remove todas as aspas duplas
    .replace(/\s+/g, ' ') // Condensa espaços múltiplos em um único espaço
    .trim(); // Remove espaços no início e no final
};

// Pega o HTML extraído do JSON
const rawData = $json.data;

// Declara uma variável para armazenar o texto a ser retornado
let plainText = "SemDados";

// Tenta executar a função de decodificação e captura erros
try {
  if (rawData && typeof rawData === 'string' && rawData.trim()) { // Verifica se rawData contém dados válidos
    plainText = decodeHtml(rawData);
    // Remove padrões extras específicos solicitados
    plainText = plainText
      .replace(/:\s?\d+\b/g, '') // Remove padrões de ": número"
      .replace(/\s*[^\w\s]\s*/g, ''); // Remove caracteres não alfanuméricos isolados
  }

  // Verifica se o plainText está vazio e substitui por "SemDados"
  if (!plainText.trim()) {
    plainText = "SemDados";
  }

} catch (error) {
  // Em caso de erro, mantém o valor de plainText como "SemDados"
  plainText = "SemDados";
}

// Retorna no formato esperado pelo n8n
return [
  {
    json: {
      plainText: plainText,
    },
  },
];
