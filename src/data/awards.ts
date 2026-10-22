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
    slug: 'premio-casa-de-los-espellos',
    title: 'Premio de la Casa de los Espellos',
    teaser: 'El mejor reflejo de la pista',
    emoji: '🪞',
  },
  {
    slug: 'premio-esfuerzo-heroico',
    title: 'Premio al Esfuerzo Heroico',
    teaser: 'Hecho a mano, con dedicación y maquillaje',
    emoji: '🎖️',
  },
];

export const AWARDS_INTRO =
  'La gente se esfuerza muchísimo con los disfraces temáticos. Los premios se entregan en la noche, así que venite con el disfraz resuelto y a punto.';
