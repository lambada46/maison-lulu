'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { site } from '@/config/site';
import { offers, type FormulaId } from '@/config/offers';

type Stage = 1 | 2 | 3 | 4;
type Channel = 'retrait' | 'livraison';
type EventType = 'professionnel' | 'prive';
const labels = ['Choisissez votre formule', 'Personnalisez votre sélection', 'Précisez votre événement', 'Recevez votre estimation'];
const validFormula = (id: string | null): id is FormulaId => id === 'aperitif' || id === 'cocktail' || id === 'buffet';

export function DevisWizard() {
  const query = useSearchParams();
  const initialFormula = validFormula(query.get('formule')) ? (query.get('formule') as FormulaId) : 'cocktail';
  const [step, setStep] = useState<Stage>(1);
  const [formula, setFormula] = useState<FormulaId>(initialFormula);
  const [custom, setCustom] = useState<Record<string, string>>({});
  const [guests, setGuests] = useState(50);
  const [kind, setKind] = useState<EventType>(query.get('type') === 'prive' ? 'prive' : 'professionnel');
  const [mode, setMode] = useState<Channel>('livraison');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selected = site.formulas.find((item) => item.slug === formula)!;
  const details = offers[formula];
  const total = useMemo(() => guests * selected.price, [guests, selected.price]);
  const preferences = details.choiceGroups.map((group, i) => ({
    question: group.title,
    answer: custom[formula + '-' + i] ?? group.choices[0],
  }));
  const euro = (value: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  const advance = () => { setMessage(''); setStep((current) => Math.min(4, current + 1) as Stage); };
  const back = () => { setMessage(''); setStep((current) => Math.max(1, current - 1) as Stage); };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setMessage('');
    setSending(true);
    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          formula, guests, estimatedTotal: total, preferences, eventType: kind,
          mode, date, city: city.trim(), comment: comment.trim(), name: name.trim(),
          email: email.trim(), phone: phone.trim(), consent, website,
        }),
      });
      if (!response.ok) {
        const data: { message?: string } = await response.json().catch(() => ({}));
        throw new Error(data.message ?? 'Le service est momentanément indisponible.');
      }
      setSubmitted(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Impossible d’envoyer la demande pour le moment.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="devis-page container">
      <header className="devis-heading">
        <p className="eyebrow">MAISON LULU · VOTRE ÉVÉNEMENT</p>
        <h1>Faisons les choses <em>simplement.</em></h1>
        <p>Votre formule, vos préférences, votre budget. Quelques étapes suffisent.</p>
      </header>
      <ol className="devis-progress">
        {labels.map((label, index) => <li key={label} className={step === index + 1 ? 'current' : step > index + 1 ? 'completed' : ''}>
          <span>{step > index + 1 ? <Check size={16} /> : String(index + 1).padStart(2, '0')}</span>
          <small>{label}</small>
        </li>)}
      </ol>

      {submitted ? <div className="devis-success" role="status">
        <Check size={32} />
        <h2>Merci, votre demande a bien été envoyée.</h2>
        <p>Notre équipe reviendra vers vous pour confirmer la disponibilité et établir un devis personnalisé.</p>
        <Link className="text-link" href="/">Retour à l’accueil <ArrowRight size={16}/></Link>
      </div> : (
        <div className="devis-layout">
          <div className="devis-workspace">
            {step === 1 && <>
              <p className="eyebrow">01 · LA FORMULE</p>
              <h2>À chaque occasion, <em>sa formule.</em></h2>
              <p className="devis-help">Choisissez le format qui correspond le mieux à votre réception.</p>
              <div className="devis-formulas">
                {site.formulas.map((item) => <label className={`devis-formula ${formula === item.slug ? 'selected' : ''}`} key={item.slug}>
                  <input type="radio" name="formule" checked={formula === item.slug} onChange={() => setFormula(item.slug)} />
                  <span className="devis-formula-text"><strong>{item.title}</strong><small>{item.description}</small></span>
                  <span className="devis-formula-price">{item.price} €<small>/ pers.</small></span>
                </label>)}
              </div>
              <Link className="text-link" href="/nos-formules">Voir les compositions <ArrowRight size={15}/></Link>
            </>}
            {step === 2 && <>
              <p className="eyebrow">02 · VOS PRÉFÉRENCES</p>
              <h2>À votre façon, <em>sans complication.</em></h2>
              <p className="devis-help">La cuisine est pensée par nous ; vous pouvez indiquer quelques préférences, sous réserve de confirmation.</p>
              {details.choiceGroups.length === 0 ? <p className="devis-muted-panel">L’Apéritif est déjà composé pour vous. Vous pourrez préciser d’éventuelles demandes à l’étape suivante.</p> : details.choiceGroups.map((group, index) => <fieldset className="devis-fieldset" key={group.title}>
                <legend>{group.title}</legend><p>{group.hint}</p>
                <div className="devis-options">{group.choices.map((choice) => {
                  const key = formula + '-' + index;
                  const selectedChoice = (custom[key] ?? group.choices[0]) === choice;
                  return <label key={choice} className={`devis-option ${selectedChoice ? 'selected' : ''}`}>
                    <input type="radio" name={key} value={choice} checked={selectedChoice} onChange={() => setCustom(prev => ({ ...prev, [key]: choice }))}/>
                    {selectedChoice && <Check size={14}/>} {choice}
                  </label>;
                })}</div>
              </fieldset>)}
            </>}
            {step === 3 && <>
              <p className="eyebrow">03 · LES DÉTAILS</p>
              <h2>Parlez-nous de <em>votre événement.</em></h2>
              <div className="devis-fields">
                <div className="devis-field"><label htmlFor="guests">Nombre de convives</label><input id="guests" type="number" min={1} max={2000} value={guests} onChange={e => setGuests(Math.max(1, Math.min(2000, Number(e.target.value) || 1)))}/></div>
                <div className="devis-field"><label htmlFor="date">Date envisagée (facultative)</label><input id="date" type="date" value={date} onChange={e=>setDate(e.target.value)}/></div>
                <div className="devis-field"><label htmlFor="event-type">Type d’événement</label><select id="event-type" value={kind} onChange={e => setKind(e.target.value as EventType)}><option value="professionnel">Professionnel</option><option value="prive">Privé</option></select></div>
                <div className="devis-field"><label htmlFor="mode">Réception</label><select id="mode" value={mode} onChange={e=>setMode(e.target.value as Channel)}><option value="livraison">Livraison (sur devis)</option><option value="retrait">Retrait (à confirmer)</option></select></div>
                <div className="devis-field full"><label htmlFor="city">Ville de l’événement</label><input id="city" maxLength={120} placeholder="Ex. Avignon, Villeneuve-lès-Avignon…" value={city} onChange={e=>setCity(e.target.value)}/></div>
                <div className="devis-field full"><label htmlFor="comment">Une précision ? (facultatif)</label><textarea id="comment" maxLength={2000} rows={4} placeholder="Horaires, contraintes alimentaires, particularités…" value={comment} onChange={e=>setComment(e.target.value)}/></div>
              </div>
            </>}
            {step === 4 && <>
              <p className="eyebrow">04 · VOTRE ESTIMATION</p>
              <h2>Une première idée <em>du budget.</em></h2>
              <div className="devis-estimate">
                <span>Estimation indicative TTC</span>
                <strong>{euro(total)}</strong>
                <p>{guests} convives × {euro(selected.price)} / personne</p>
              </div>
              <p className="devis-help">Ce montant couvre uniquement la formule alimentaire. Livraison, éventuels suppléments, options et prestation de service ne sont pas inclus. Le devis final sera établi après échange avec notre équipe.</p>
              <form className="devis-contact-form" onSubmit={submit}>
                <h3>Recevoir un devis personnalisé</h3>
                <div className="devis-fields">
                  <div className="devis-field"><label htmlFor="lead-name">Nom et prénom *</label><input id="lead-name" value={name} onChange={e=>setName(e.target.value)} required minLength={2} maxLength={100} autoComplete="name"/></div>
                  <div className="devis-field"><label htmlFor="lead-email">E-mail *</label><input id="lead-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={254} autoComplete="email"/></div>
                  <div className="devis-field full"><label htmlFor="lead-phone">Téléphone (facultatif)</label><input id="lead-phone" type="tel" maxLength={40} value={phone} onChange={e=>setPhone(e.target.value)} autoComplete="tel"/></div>
                </div>
                <div className="devis-honeypot" aria-hidden="true"><label htmlFor="lead-website">Site web</label><input id="lead-website" name="website" autoComplete="off" tabIndex={-1} value={website} onChange={e=>setWebsite(e.target.value)}/></div>
                <label className="devis-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/><span>J’accepte que Maison Lulu utilise ces informations pour répondre à ma demande. <Link href="/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">Informations sur mes données</Link>.</span></label>
                {message && <p className="devis-error" role="alert">{message}</p>}
                <button type="submit" className="button devis-submit" disabled={sending || !consent}>{sending ? 'Envoi en cours…' : 'Envoyer ma demande'} <ArrowRight size={17}/></button>
                <p className="devis-contact-note">Votre demande ne constitue pas une réservation. Aucun paiement n’est demandé.</p>
              </form>
            </>}
            {step < 4 && <div className="devis-controls">
              {step > 1 ? <button type="button" className="devis-back" onClick={back}><ArrowLeft size={16}/> Retour</button> : <span/>}
              <button type="button" className="button" onClick={advance}>Continuer <ArrowRight size={17}/></button>
            </div>}
            {step === 4 && <button className="devis-back devis-bottom-back" type="button" onClick={back}><ArrowLeft size={16}/> Modifier les détails</button>}
          </div>
          <aside className="devis-summary">
            <p className="eyebrow">VOTRE SÉLECTION</p>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <dl><div><dt>Convives</dt><dd>{guests}</dd></div><div><dt>Formule</dt><dd>{euro(selected.price)} / personne</dd></div><div><dt>Réception</dt><dd>{mode === 'livraison' ? 'Livraison sur devis' : 'Retrait à confirmer'}</dd></div></dl>
            <div className="devis-summary-total"><span>Estimation alimentaire</span><strong>{euro(total)}</strong></div>
            <small>Tarifs indicatifs non contractuels. Livraison et suppléments non compris. Composition à confirmer.</small>
          </aside>
        </div>
      )}
    </section>
  );
}
