// Cloudflare Pages Function — aucune clé sensible n'est envoyée au navigateur.
// Configurer RESEND_API_KEY, DEVIS_TO_EMAIL et DEVIS_FROM_EMAIL dans Cloudflare Pages > Settings > Variables and Secrets.
// Les noms des variables de destination et d'expéditeur doivent être contrôlés au lancement.

const json = (value, status = 200) => new Response(JSON.stringify(value), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});
const text = (value, limit) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
const safe = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const ids = { aperitif: "L'Apéritif", cocktail: 'Le Cocktail', buffet: 'Le Buffet' };
const prices = { aperitif: 19, cocktail: 29, buffet: 35 }; // Prix indicatifs ; maintenir synchronisés avec src/config/site.ts.

export async function onRequestPost({ request, env }) {
  if (Number(request.headers.get('content-length') || 0) > 16000) return json({ message: 'Demande trop volumineuse.' }, 413);
  if (!env.RESEND_API_KEY || !env.DEVIS_TO_EMAIL || !env.DEVIS_FROM_EMAIL) {
    return json({ message: 'Le formulaire est momentanément indisponible. Merci de réessayer ultérieurement.' }, 503);
  }
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ message: 'Origine non autorisée.' }, 403);

  let payload;
  try { payload = await request.json(); } catch { return json({ message: 'Données invalides.' }, 400); }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return json({ message: 'Données invalides.' }, 400);
  if (text(payload.website, 200)) return json({ ok: true }); // honeypot — aucun email envoyé
  const formula = text(payload.formula, 30);
  const guests = Number(payload.guests);
  const email = text(payload.email, 254);
  const name = text(payload.name, 100);
  const phone = text(payload.phone, 40);
  const city = text(payload.city, 120);
  const comment = text(payload.comment, 2000);
  const date = text(payload.date, 10);
  const mode = text(payload.mode, 20);
  const eventType = text(payload.eventType, 30);
  const preferences = Array.isArray(payload.preferences) ? payload.preferences.slice(0, 6)
    .map(x => ({ question: text(x?.question, 100), answer: text(x?.answer, 120) })) : [];

  if (!(formula in ids) || !Number.isInteger(guests) || guests < 1 || guests > 2000 ||
      name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      payload.consent !== true || !['livraison', 'retrait'].includes(mode) ||
      !['professionnel', 'prive'].includes(eventType) ||
      (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) ||
      typeof payload.comment !== 'string' || payload.comment.length > 2000 ||
      typeof payload.city !== 'string' || payload.city.length > 120) {
    return json({ message: 'Veuillez vérifier les informations saisies.' }, 400);
  }

  // TURNSTILE_SECRET_KEY est optionnel en phase de test et recommandé avant les campagnes payantes.
  if (env.TURNSTILE_SECRET_KEY) {
    const token = text(payload.turnstileToken, 2048);
    if (!token) return json({ message: 'Validation anti-spam requise.' }, 400);
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET_KEY);
    form.append('response', token);
    const ip = request.headers.get('CF-Connecting-IP');
    if (ip) form.append('remoteip', ip);
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const verified = await verification.json().catch(() => ({ success: false }));
    if (!verified.success) return json({ message: 'Validation anti-spam échouée.' }, 400);
  }

  const estimatedTotal = guests * prices[formula];
  const fields = [
    ['Nom', name], ['Email', email], ['Téléphone', phone || 'Non indiqué'],
    ['Formule', ids[formula]], ['Nombre de convives', guests], ['Estimation TTC (hors options)', estimatedTotal + ' EUR'],
    ['Type d’événement', eventType], ['Date souhaitée', date || 'À préciser'],
    ['Ville', city || 'À préciser'], ['Réception', mode],
    ...preferences.map(p => [p.question, p.answer]), ['Observations', comment || 'Aucune'],
  ];
  const body = '<h2>Nouvelle demande de devis — Maison Lulu</h2><table cellpadding="7">' +
    fields.map(([key, value]) => '<tr><th align="left">' + safe(key) + '</th><td>' + safe(value) + '</td></tr>').join('') +
    '</table><p>Montant indicatif, non contractuel. Vérifier la disponibilité et les besoins du client.</p>';

  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: 'Bearer ' + env.RESEND_API_KEY, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.DEVIS_FROM_EMAIL,
        to: [env.DEVIS_TO_EMAIL],
        reply_to: email,
        subject: 'Maison Lulu — Demande de devis — ' + ids[formula] + ' — ' + guests + ' convives',
        html: body,
      }),
    });
  } catch {
    return json({ message: 'Envoi indisponible. Merci de réessayer.' }, 502);
  }
  if (!response.ok) {
    console.error('Resend email failed:', response.status);
    return json({ message: 'Votre demande n’a pas pu être transmise. Merci de réessayer.' }, 502);
  }
  return json({ ok: true }, 200);
}

export function onRequestGet() { return json({ message: 'Méthode non autorisée.' }, 405); }
