# Validação

Executei 14 verificações locais com sucesso. Verifiquei JSON, conexões, compilação dos blocos JavaScript, estado inativo, ausência de credenciais e padrões conhecidos de tokens. Os testes fictícios do Guardian cobrem evento único, limite de 60 segundos, 61 segundos, datas inválidas e janela entre extremos.

Consulte [resultados](../tests/resultados.json). Essa verificação não substitui teste de importação no n8n ou validação das APIs, condições e modelos no ambiente de destino. Não realizei chamadas externas nem envio de mensagens.

Para repetir as verificações estruturais com Node.js, abra o terminal na pasta do projeto e execute: `node tests/validar-estrutura.cjs`. Os casos específicos do Guardian estão registrados nos resultados; esse script repete a validação estrutural.
