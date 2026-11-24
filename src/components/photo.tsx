'use client';

import { useState } from 'react';

type PhotoProps = { name: string; alt: string; className?: string; label?: string };
export function Photo({ name, alt, className = '', label }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo ${className}`}>
      {!failed ? (
        // Photos are locally supplied after production; do not imply a stock image is our actual food.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/images/${name}.webp`} alt={alt} onError={() => setFailed(true)} loading={name === 'hero' ? 'eager' : 'lazy'} />
      ) : <div className="photo-placeholder" role="img" aria-label={`Emplacement de photographie : ${alt}`}>
        <span className="placeholder-line" /><span className="placeholder-caption">MAISON LULU · {label ?? 'PHOTOGRAPHIE À VENIR'}</span>
      </div>}
    </div>
  );
}
