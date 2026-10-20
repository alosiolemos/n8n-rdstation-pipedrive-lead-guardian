// ===============================
// Lead Guardian v1
// Objetivo:
// Detectar apenas comportamento de spam.
// ===============================

// Dados do Lead
const lead = $('Obter Dados Lead').first().json;

// Eventos de Conversão
const eventos = $('Obter Eventos do Lead').all().map(i => i.json);

// BIO (informativa)
const bio = (lead.bio || "").trim();
const jaSincronizado = /pipedrive/i.test(bio);

// ===============================
// Ordena eventos
// ===============================
const ordenados = eventos
    .map(e => new Date(e.event_timestamp))
    .filter(d => !isNaN(d.getTime()))
    .sort((a, b) => a - b);

// ===============================
// Estatísticas
// ===============================
const totalEventos = ordenados.length;

let tempoTotalSegundos = 0;

if (totalEventos > 1) {
    tempoTotalSegundos = Math.round(
        (ordenados[totalEventos - 1] - ordenados[0]) / 1000
    );
}

// ===============================
// Regras
// ===============================
let spam = false;
let status = "VALIDO";
let acao = "CRIAR";

const motivos = [];

// Flood
if (
    totalEventos >= 2 &&
    tempoTotalSegundos <= 60
) {

    spam = true;
    status = "SPAM";
    acao = "IGNORAR";

    motivos.push(
        `Foram identificadas ${totalEventos} conversões em apenas ${tempoTotalSegundos} segundos, caracterizando comportamento compatível com flood ou automação.`
    );

}

// Lead válido
if (!spam) {

    motivos.push(
        "Nenhum comportamento suspeito foi identificado."
    );

}

// ===============================
// Observação
// ===============================
const observacao = spam

? `[Lead Guardian]

Lead bloqueado automaticamente.

Motivo:
• ${motivos.join("\n• ")}

Ação:
• Nenhuma sincronização com o CRM Pipedrive foi realizada.`

: `[Lead Guardian]

Lead validado automaticamente.

Nenhum comportamento suspeito foi identificado.

O lead está apto para seguir o fluxo normal de sincronização.`;

// ===============================
// Retorno
// ===============================
return [{
    json: {

        status,

        acao,

        spam,

        enviar_pipedrive: !spam,

        uuid: lead.uuid,

        email: lead.email,

        nome: lead.name,

        bio_encontrada: bio !== "",

        ja_sincronizado: jaSincronizado,

        total_eventos: totalEventos,

        tempo_total_segundos: tempoTotalSegundos,

        primeiro_evento: ordenados.length
            ? ordenados[0].toISOString()
            : null,

        ultimo_evento: ordenados.length
            ? ordenados[ordenados.length - 1].toISOString()
            : null,

        motivos,

        observacao

    }
}];
