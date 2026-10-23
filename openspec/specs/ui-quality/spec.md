## Purpose

Reglas transversales de calidad de interfaz para las superficies públicas de la invitación: legibilidad garantizada del texto y de los límites de los controles, tamaño táctil mínimo, control del movimiento continuo, ausencia de markup muerto y disciplina de paleta.

## Requirements

### Requirement: Text contrast is guaranteed
The system SHALL present body text and headings at a contrast ratio of at least 4.5:1 against their effective background, and SHALL place text over photographic backgrounds on a scrim that guarantees the same ratio regardless of the area of the image behind it.

#### Scenario: Text over the photographic background
- **WHEN** a visitor reads the hero, a section heading or a card over the cinema background image
- **THEN** the text keeps a contrast ratio of at least 4.5:1 independently of the bright or dark area of the photo behind it

#### Scenario: Secondary text inside cards
- **WHEN** a visitor reads the descriptive text of a card with a translucent background
- **THEN** the text keeps a contrast ratio of at least 4.5:1 over the card background, including over the brightest area of the underlying photo

#### Scenario: Low emphasis text
- **WHEN** a visitor reads the artist of a listed track
- **THEN** that text keeps a contrast ratio of at least 4.5:1 against the page background

### Requirement: Control boundaries meet non-text contrast
The system SHALL render the boundaries of form controls with a contrast ratio of at least 3:1 against the adjacent background.

#### Scenario: Input borders
- **WHEN** a visitor sees a text input, number input or textarea in its resting state
- **THEN** its border keeps a contrast ratio of at least 3:1 against the field background

### Requirement: Touch targets are at least 44 pixels
The system SHALL render every interactive control with a hit area of at least 44 by 44 CSS pixels.

#### Scenario: Floating music control
- **WHEN** a visitor views the page on a touch device
- **THEN** the floating music control can be activated with a hit area of at least 44 pixels tall

#### Scenario: Form controls
- **WHEN** a visitor fills the playlist or RSVP forms
- **THEN** inputs, buttons and links offer a hit area of at least 44 pixels

### Requirement: Continuous motion is pausable
The system SHALL stop any continuous motion while the pointer is over it or while it holds keyboard focus, and SHALL keep such motion static for visitors who prefer reduced motion.

#### Scenario: Motion pauses on interaction
- **WHEN** a visitor hovers the movie rows or the hero marquee, or moves keyboard focus into them
- **THEN** the motion stops until the pointer leaves and the focus leaves

#### Scenario: Reduced motion
- **WHEN** the visitor prefers reduced motion
- **THEN** the marquee, the movie rows, the background change and the decoration stay static

### Requirement: No dead markup
The system SHALL NOT render text that is invisible to sighted visitors while remaining exposed to assistive technology, and SHALL NOT repeat the same label inside a single heading.

#### Scenario: Card headings
- **WHEN** a visitor reads the "Qué hay que traer" cards with a screen reader
- **THEN** each card heading is announced once and no silent duplicate label is exposed

#### Scenario: Decorative emoji
- **WHEN** a visitor reads the "Qué hay que traer" cards with a screen reader
- **THEN** the decorative emoji are not announced

### Requirement: Neon glow is reserved
The system SHALL apply the neon glow effect only to the page title and the primary call to action, and SHALL render section headings, card headings and other supporting text without a colored halo.

#### Scenario: Section headings
- **WHEN** a visitor views the section headings of the invitation
- **THEN** they are rendered in the cinema gold or in a light text color without a colored halo

#### Scenario: Primary call to action
- **WHEN** a visitor views the page title and the "Confirmar asistencia" button
- **THEN** they keep the neon treatment that identifies the primary action

### Requirement: Typography has distinct roles
The system SHALL use two type families with distinct roles: a sans-serif family for information, navigation and body copy, and an editorial serif family for section headings and personal messages. Both SHALL come from system font stacks, and the system SHALL NOT request fonts over the network.

#### Scenario: Section headings are editorial
- **WHEN** a visitor reads a section heading on the landing page
- **THEN** it is rendered in the editorial serif family while body copy stays in the sans-serif family

#### Scenario: No network font request
- **WHEN** the page is served
- **THEN** no font file is requested from a third-party origin

#### Scenario: Accented characters render correctly
- **WHEN** a heading contains accented characters or the "ñ"
- **THEN** the chosen stacks render them without falling back to a mismatched face
### Requirement: Type scale is explicit
The system SHALL assign a distinct size, weight and line-height to each typographic level (page title, section heading, subtitle, body, metadata), and SHALL NOT render every section heading at the same size.

#### Scenario: Hierarchy is visible
- **WHEN** a visitor scans the landing page
- **THEN** the page title, the section headings and the supporting copy are visually distinguishable from each other

#### Scenario: Body copy is readable
- **WHEN** a visitor reads an explanatory paragraph or a card description
- **THEN** it is rendered at body size rather than at metadata size, with a line-height of at least 1.5

#### Scenario: Metadata is reserved
- **WHEN** a visitor reads dates, counts or helper text
- **THEN** that text uses the smaller metadata level instead of competing with body copy
### Requirement: Hashtag is set as a display element
The system SHALL render the night hashtag as a display element inside its section, using the editorial serif family and at a size clearly larger than body copy, without turning it into a button or a copy control.

#### Scenario: Hashtag hierarchy
- **WHEN** a visitor reaches the hashtag section
- **THEN** the hashtag is the largest text in the section after the heading

#### Scenario: Hashtag is not a control
- **WHEN** a keyboard visitor tabs through the landing page
- **THEN** the hashtag is not part of the tab order
### Requirement: Text is not clipped by its own box
The system SHALL size text containers so that ascenders and descenders of the rendered font fit inside the visible area, including inside overflow-clipped elements.

#### Scenario: Descenders in the marquee
- **WHEN** a visitor reads a marquee phrase that contains a "g", "j" or "y"
- **THEN** the descender is fully visible and not cut by the container edge

#### Scenario: Accented caps fit
- **WHEN** a heading renders accented uppercase characters
- **THEN** no accent is cut by the line box
