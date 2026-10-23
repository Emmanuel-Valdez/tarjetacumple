## Purpose

Reglas transversales de calidad de interfaz para las superficies públicas de la invitación: legibilidad garantizada del texto y de los límites de los controles, tamaño táctil mínimo, control del movimiento continuo, ausencia de markup muerto y disciplina de paleta.

## ADDED Requirements

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
