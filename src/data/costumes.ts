export type Costume = {
  title: string;
  item: string;
  why: string;
  emoji: string;
  photo?: string;
};

// Fotos de ejemplo (ver scripts/prepare-photos.mjs). Solo las referencias con
// equivalente claro llevan foto; el resto se muestra con emoji + texto.
const PHOTO: Record<string, string | undefined> = {
  'El Extraño Mundo de Jack': '/photos/igexport-DeKGYHinI3F-2.webp',
  Beetlejuice: '/photos/igexport-DeKGYHinI3F-3.webp',
  'El Cisne Negro': '/photos/igexport-DeKGYHinI3F-6.webp',
  'El Caballero de la Noche': '/photos/igexport-DeKGYHinI3F-7.webp',
  Joker: '/photos/igexport-DeKGYHinI3F-8.webp',
  It: '/photos/IT-PENNYWISE.webp',
  'Harry Potter': '/photos/HARRY-POTTER.webp',
  'La Familia Addams': '/photos/WEDNESDAY.webp',
};

export const COSTUMES: Costume[] = [
  {
    title: 'Pulp Fiction',
    photo: PHOTO['Pulp Fiction'],
    item: 'Camisa blanca con los brazos arrollados y un bob negro',
    why: 'Es el look de Mia Wallace: parece simple pero es inconfundible. Con la camisa y el pelo alcanza.',
    emoji: '🎬',
  },
  {
    title: 'Beetlejuice',
    photo: PHOTO['Beetlejuice'],
    item: 'Traje a rayas negro y blanco y pelo verde en dos moños',
    why: 'El traje a rayas es de los más fáciles de la lista y con dos moños se reconoce al toque.',
    emoji: '🪲',
  },
  {
    title: 'Clueless',
    photo: PHOTO['Clueless'],
    item: 'Top y pollera tartán amarillo',
    why: 'Cher Horowitz de amarillo: un color inconfundible a un metro de distancia.',
    emoji: '💅',
  },
  {
    title: 'The Matrix',
    photo: PHOTO['The Matrix'],
    item: 'Gabardina de cuero negra y lentes de sol',
    why: 'Con gabardina y lentes sos Neo o Trinity. Y el pelo teñido de verde suma.',
    emoji: '💊',
  },
  {
    title: 'Barbie',
    photo: PHOTO['Barbie'],
    item: 'Vestido rosa fucsia y botas altas',
    why: 'El rosa Barbie o el de Ken: todo el mundo lo reconoce de una.',
    emoji: '💖',
  },
  {
    title: 'El Extraño Mundo de Jack',
    photo: PHOTO['El Extraño Mundo de Jack'],
    item: 'Traje de esqueleto con costuras y cara de calavera',
    why: 'El traje de Jack se hace en dos horas con cartulina. Y mete el miedo justo.',
    emoji: '🎃',
  },
  {
    title: 'Kill Bill',
    photo: PHOTO['Kill Bill'],
    item: 'Chándal amarillo y katana',
    why: 'El chándal amarillo con katana es el look de Kill Bill. Silenciosa y letal.',
    emoji: '⚔️',
  },
  {
    title: 'La Familia Addams',
    photo: PHOTO['La Familia Addams'],
    item: 'Vestido gótico negro, coletas y cara pálida',
    why: 'Wednesday es tendencia y el look Addams se logra solo con dos coletas y pintura clara.',
    emoji: '🕷️',
  },
  {
    title: 'El Caballero de la Noche',
    photo: PHOTO['El Caballero de la Noche'],
    item: 'Maquillaje verde de Joker y traje de colores',
    why: 'El Joker de Heath Ledger con la sonrisa y el pelo verde: el efecto es instantáneo.',
    emoji: '🃏',
  },
  {
    title: 'El Diario de la Princesa',
    photo: PHOTO['El Diario de la Princesa'],
    item: 'Tiara, audífonos y top de los 90',
    why: 'La realeza pop de los 90. La tiara hace todo el trabajo.',
    emoji: '👑',
  },
  {
    title: 'It',
    photo: PHOTO['It'],
    item: 'Globo rojo y maquillaje de payaso con los ojos rojos',
    why: 'Pennywise se reconoce sin la cara completa. Y el globo es un imán de fotos.',
    emoji: '🎈',
  },
  {
    title: 'Scream',
    photo: PHOTO['Scream'],
    item: 'Máscara blanca de Ghostface',
    why: 'La más fácil de hacer y la que más miedo mete en la pista. Careta blanca y listo.',
    emoji: '😱',
  },
  {
    title: 'El Quinto Elemento',
    photo: PHOTO['El Quinto Elemento'],
    item: 'Arnés blanco y peluca naranja de Leeloo',
    why: 'El arnés de Leeloo es un look único y muy de foto. Nadie llega vestida igual.',
    emoji: '🧡',
  },
  {
    title: 'El Cisne Negro',
    photo: PHOTO['El Cisne Negro'],
    item: 'Tutú negro, Alas y maquillaje oscuro',
    why: 'Nina con tutú negro es un clásico de la pista y se ve espectacular en fotos.',
    emoji: '🩰',
  },
  {
    title: 'Legalmente Rubia',
    photo: PHOTO['Legalmente Rubia'],
    item: 'Todo rosa, rubia y labial fucsia',
    why: 'Elle Woods de punta a punta. El rosa no falla.',
    emoji: '🌸',
  },
  {
    title: 'La Casa de Papel',
    photo: PHOTO['La Casa de Papel'],
    item: 'Mono rojo y máscara de Dalí',
    why: 'El mono y la máscara de Dalí se hacen rápido y el efecto en la pista es brutal.',
    emoji: '🧤',
  },
  {
    title: 'Bastardos Sin Gloria',
    photo: PHOTO['Bastardos Sin Gloria'],
    item: 'Vestido rojo, velo de novia y un ojo vendado',
    why: 'Shosanna es un boom de la lista. Con el velo alcanza para que todos la ubiquen.',
    emoji: '🔥',
  },
  {
    title: 'Midsommar',
    photo: PHOTO['Midsommar'],
    item: 'Corona de flores y vestido de campo',
    why: 'Dani y su ritual: veinte minutos de corona y ya estás distinto al resto.',
    emoji: '🌺',
  },
  {
    title: 'El Gran Lebowski',
    photo: PHOTO['El Gran Lebowski'],
    item: 'Bata, pantuflas y look de The Dude',
    why: 'The Dude en bata con una cerveza. Cero esfuerzo, máxima gracia.',
    emoji: '🧘',
  },
  {
    title: 'Joker',
    photo: PHOTO['Joker'],
    item: 'Traje rojo, chaleco amarillo y maquillaje de payaso',
    why: 'El Joker de 2019 es el más icónico de la lista y el traje rojo se ve desde la puerta.',
    emoji: '🖤',
  },
  {
    title: 'Harry Potter',
    photo: PHOTO['Harry Potter'],
    item: 'Capa, bufanda de casa y varita',
    why: 'Las cuatro casas, cuatro colores. Con la capa y la varita el resto es detalle.',
    emoji: '🧙',
  },
  {
    title: 'El Señor de los Anillos',
    photo: PHOTO['El Señor de los Anillos'],
    item: 'Capa élfica, espada y orejas',
    why: 'El hobbit es un disfraz de cuento: orejas, capa y una expresión muy seria.',
    emoji: '🗡️',
  },
];
