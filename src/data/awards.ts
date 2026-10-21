export type Award = {
  title: string;
  teaser: string;
  emoji: string;
};

// revealed: false muestra solo el teaser. La organizadora lo cambia a true
// cuando quiera destapar las categorias en la web.
export const AWARDS: (Award & { revealed: boolean })[] = [
  {
    title: 'Mejor Disfraz Masculino',
    teaser: 'Se anuncia en la noche',
    emoji: '🏆',
    revealed: false,
  },
  {
    title: 'Mejor Disfraz Femenino',
    teaser: 'Se anuncia en la noche',
    emoji: '🌟',
    revealed: false,
  },
  {
    title: 'Mejor Disfraz de Pareja o Grupo',
    teaser: 'Se anuncia en la noche',
    emoji: '👯',
    revealed: false,
  },
  {
    title: 'Premio a la Nostalgia Milenial',
    teaser: 'Se anuncia en la noche',
    emoji: '📼',
    revealed: false,
  },
  {
    title: 'Premio de la Casa de los Espellos',
    teaser: 'Se anuncia en la noche',
    emoji: '🪞',
    revealed: false,
  },
  {
    title: 'Premio al Esfuerzo Heroico',
    teaser: 'Se anuncia en la noche',
    emoji: '🎖️',
    revealed: false,
  },
];

export const AWARDS_INTRO =
  'La gente se esfuerza mucho con los disfraces temáticos. Organizá un concurso a mitad de la noche y entregá estatuillas similares a los Premios Oscar. Las categorías se anuncian en el momento, así que venite con el disfraz resuelto.';
