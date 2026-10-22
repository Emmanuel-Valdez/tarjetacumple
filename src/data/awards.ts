export type Award = {
  slug: string;
  title: string;
  teaser: string;
  emoji: string;
};

export const AWARDS: Award[] = [
  {
    slug: 'mejor-disfraz-masculino',
    title: 'Mejor Disfraz Masculino',
    teaser: 'El que mejor resuelve su personaje',
    emoji: '🏆',
  },
  {
    slug: 'mejor-disfraz-femenino',
    title: 'Mejor Disfraz Femenino',
    teaser: 'El look más icónico de la noche',
    emoji: '🌟',
  },
  {
    slug: 'mejor-disfraz-pareja-o-grupo',
    title: 'Mejor Disfraz de Pareja o Grupo',
    teaser: 'Los que se coordinan de punta a punta',
    emoji: '👯',
  },
  {
    slug: 'premio-nostalgia-milenial',
    title: 'Premio a la Nostalgia Milenial',
    teaser: 'El que te teletransporta a los 2000',
    emoji: '📼',
  },
  {
    slug: 'premio-mejor-frase-iconica',
    title: 'Premio a la Mejor Frase Icónica',
    teaser: 'La frase del personaje que todos repetimos toda la noche',
    emoji: '💬',
  },
  {
    slug: 'premio-no-entendi-quien-eras',
    title: 'Premio ‘No Entendí Quién Eras’',
    teaser: 'El disfraz tan enigmático que nadie adivinó qué era',
    emoji: '🕵️',
  },
  {
    slug: 'premio-exito-de-taquilla',
    title: 'Premio Éxito de Taquilla',
    teaser: 'El disfraz que todos quieren fotografiar',
    emoji: '🎟️',
  },
  {
    slug: 'mejor-presupuesto-minimo',
    title: 'Mejor Presupuesto Mínimo',
    teaser: 'El disfraz más ingenioso con menos plata',
    emoji: '🪙',
  },
  {
    slug: 'alma-de-la-fiesta',
    title: 'Alma de la Fiesta',
    teaser: 'El que prende la pista y contagia las ganas',
    emoji: '🔥',
  },
  {
    slug: 'mejor-paso-prohibido',
    title: 'Mejor Paso Prohibido',
    teaser: 'El baile más ridículo y divertido de la noche',
    emoji: '🕺',
  },
];

export const AWARDS_INTRO =
  'La gente se esfuerza muchísimo con los disfraces temáticos. Los premios se entregan en la noche, así que venite con el disfraz resuelto y a punto.';
