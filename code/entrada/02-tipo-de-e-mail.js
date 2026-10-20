// Pegamos o e-mail da entrada
const email = ($json.body?.email || "").trim().toLowerCase();

// Domínios pessoais
const personalDomains = new Set([
  // Google
  "gmail.com",
  "googlemail.com",

  // Microsoft
  "hotmail.com",
  "hotmail.com.br",
  "hotmail.co.uk",
  "hotmail.fr",
  "outlook.com",
  "outlook.com.br",
  "live.com",
  "live.com.br",
  "msn.com",

  // Yahoo
  "yahoo.com",
  "yahoo.com.br",
  "ymail.com",
  "rocketmail.com",

  // Apple
  "icloud.com",
  "me.com",
  "mac.com",

  // AOL
  "aol.com",

  // Proton
  "protonmail.com",
  "proton.me",

  // Zoho
  "zoho.com",
  "zohomail.com",

  // GMX
  "gmx.com",
  "gmx.net",

  // Mail.com
  "mail.com",

  // Fastmail
  "fastmail.com",
  "fastmail.fm",

  // Tuta
  "tuta.com",
  "tutanota.com",
  "tutanota.de",

  // Mailfence
  "mailfence.com",

  // Yandex
  "yandex.com",
  "yandex.ru",

  // Mail.ru
  "mail.ru",
  "bk.ru",
  "inbox.ru",
  "list.ru",

  // Naver
  "naver.com",

  // QQ
  "qq.com",

  // NetEase
  "163.com",
  "126.com",

  // Brasil
  "uol.com.br",
  "bol.com.br",
  "terra.com.br",
  "ig.com.br",
  "globo.com",
  "oi.com.br",

  // Outros
  "rediffmail.com",
  "web.de",
  "email.com",
  "posteo.de",
  "hey.com"
]);

// Domínios temporários
const disposableDomains = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "yopmail.com",
  "temp-mail.org",
  "dispostable.com",
  "getnada.com",
  "maildrop.cc"
]);

function getDomain(email) {
  const index = email.lastIndexOf("@");
  return index > -1 ? email.substring(index + 1) : "";
}

const domain = getDomain(email);

let classificacao = "Domínio Corporativo";

if (!domain) {
  classificacao = "E-mail inválido";
} else if (disposableDomains.has(domain)) {
  classificacao = "Domínio Temporário";
} else if (personalDomains.has(domain)) {
  classificacao = "Domínio Pessoal";
}

return {
  email,
  dominio: domain,
  classificacao
};
