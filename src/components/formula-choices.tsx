'use client';

import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import Link from 'next/link';
import type { Offer } from '@/config/offers';

export function FormulaChoices({ offer }: { offer: Offer }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  if (!offer.choiceGroups.length) {
    return <div className="offer-choice-empty"><p>Une formule pensée pour vous : pas de choix interminables, juste de bonnes choses à partager.</p><Link className="text-link" href="/devis">Préparer mon événement <ArrowUpRight size={16}/></Link></div>;
  }

  return (
    <div className="offer-customizer">
      <div className="offer-customizer-head">
        <span className="eyebrow">À VOTRE FAÇON</span>
        <h4>Quelques choix, <em>et c’est tout.</em></h4>
        <p>Une formule déjà imaginée pour vous, avec une petite marge de liberté.</p>
      </div>
      {offer.choiceGroups.map((group, groupIndex) => (
        <fieldset className="offer-choice-group" key={group.title}>
          <legend>{group.title}</legend>
          <p>{group.hint}</p>
          <div className="offer-choice-pills">
            {group.choices.map((choice, choiceIndex) => {
              const selected = (answers[groupIndex] ?? 0) === choiceIndex;
              return <label key={choice} className={`offer-choice-pill ${selected ? 'is-selected' : ''}`}>
                <input type="radio" name={`${offer.slug}-choice-${groupIndex}`} value={choice} checked={selected} onChange={() => setAnswers((prev) => ({ ...prev, [groupIndex]: choiceIndex }))}/>
                {selected && <Check size={14} aria-hidden="true" />}{choice}
              </label>;
            })}
          </div>
        </fieldset>
      ))}
      <div className="offer-selection">
        <p className="eyebrow">VOS PRÉFÉRENCES</p>
        <ul>{offer.choiceGroups.map((group, i) => <li key={group.title}>{group.choices[answers[i] ?? 0]}</li>)}</ul>
        <p>Ces préférences sont indicatives : elles ne sont pas encore transmises et ne constituent pas une réservation.</p>
      </div>
      <Link className="button" href={`/devis?formule=${offer.slug}`}>Préparer mon événement <ArrowUpRight size={17}/></Link>
    </div>
  );
}
