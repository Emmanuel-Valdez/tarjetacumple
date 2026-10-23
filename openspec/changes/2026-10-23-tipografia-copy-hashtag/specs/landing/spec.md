## ADDED Requirements

### Requirement: Night hashtag section
The system SHALL show a section titled "Compartí la noche" between the julilogramos photo and the playlist, inviting guests to share photos of the night with the hashtag read from the event data module. The section SHALL display the hashtag as its central element and SHALL NOT provide a copy-to-clipboard control.

#### Scenario: Section placement
- **WHEN** a visitor scrolls from the julilogramos photo toward the playlist
- **THEN** the "Compartí la noche" section appears between them

#### Scenario: Hashtag comes from content data
- **WHEN** the hashtag is edited in the event data module
- **THEN** the section shows the new hashtag without touching the markup

#### Scenario: No copy control
- **WHEN** a visitor views the hashtag section on a touch device
- **THEN** the hashtag is shown as text with no copy button underneath

#### Scenario: Hashtag stays selectable
- **WHEN** a visitor selects the hashtag text with the pointer or the keyboard
- **THEN** the text can be selected and copied with the native mechanism

### Requirement: Visible copy is consistent
The system SHALL present the landing copy in rioplatense Spanish with correct accents and sentence-case headings, and SHALL name controls and status messages after the action or object they affect.

#### Scenario: Accents and capitalization
- **WHEN** a visitor reads the section headings
- **THEN** no heading is missing an accent and no heading uses English title case

#### Scenario: Action labels
- **WHEN** a visitor reaches the RSVP submit button
- **THEN** the button reads "Confirmar asistencia" and not a generic "Enviar"

#### Scenario: Status messages name their object
- **WHEN** a visitor adds a song to the playlist
- **THEN** the confirmation message states that the song was added to the playlist

## MODIFIED Requirements

### Requirement: Hero section
The system SHALL display a hero section with Juli's name, the heading "Juli presenta:", the marquee text "Legalmente 30" and a countdown to the event date.

#### Scenario: Hero renders
- **WHEN** a visitor loads the page
- **THEN** the hero shows Juli, "Juli presenta:", "Legalmente 30" as an inviting marquee, and an invitation to join the celebration

#### Scenario: Countdown present
- **WHEN** the page loads before the event date
- **THEN** the countdown displays days, hours, minutes and seconds remaining

#### Scenario: Countdown targets the real date
- **WHEN** the countdown is calculated
- **THEN** it counts down to the event date and time declared in the event data module

### Requirement: Hero marquee is readable and pausable
The system SHALL keep the hero marquee text "Legalmente 30" fully visible in its reading position, including the descenders, and SHALL stop its movement while the pointer is over it or while it holds keyboard focus.

#### Scenario: Text visible in the reading position
- **WHEN** a visitor reads the hero
- **THEN** the phrase "Legalmente 30" is fully inside the marquee while it rests in the reading position, with the descender of the "g" visible

#### Scenario: Motion pauses on interaction
- **WHEN** a visitor hovers the marquee or moves keyboard focus into it
- **THEN** the marquee stops moving

### Requirement: Event details grouped as compact cards
The system SHALL present dress code, adults-only guidance and what guests should bring together under a heading with a clearer invitation tone than a bare list label, as compact cards with clear copy addressed to adult invitees.

#### Scenario: Required costume and special awards
- **WHEN** a visitor views the details cards
- **THEN** a card states that a costume is mandatory and that special prizes will be awarded during the night

#### Scenario: Adults-only guidance addresses invitees
- **WHEN** a visitor views the details cards
- **THEN** a card clearly states that the invitation is for adults and asks guests not to bring children, without addressing minors directly and without a brusque tone

#### Scenario: Presence and drinks
- **WHEN** a visitor views the details cards
- **THEN** cards state that their presence is welcome and that each guest should bring their own alcoholic drink

### Requirement: Awards teaser
The system SHALL show only two preview categories and a sentence stating that more categories are still to come before voting opens, reveal the complete list of ten categories when voting opens, and SHALL show each winner in its category card after the winners have been revealed.

#### Scenario: Preview before voting opens
- **WHEN** a visitor views the awards section while the contest is idle
- **THEN** only "Mejor Disfraz Masculino" and "Mejor Disfraz Femenino" are shown, followed by a complete sentence announcing that more categories are still to come

#### Scenario: Categories visible
- **WHEN** a visitor views the awards section
- **THEN** the two preview categories are visible before voting opens and all ten categories are visible once voting opens

#### Scenario: Full categories revealed when voting opens
- **WHEN** an organizer or Juli opens voting
- **THEN** the awards section shows all ten categories and the public vote button

#### Scenario: No organizer instructions
- **WHEN** the awards section is rendered
- **THEN** it contains no text instructing visitors to organize the contest or hand out prizes

#### Scenario: Final categories
- **WHEN** the complete award list is shown
- **THEN** its categories are "Mejor Disfraz Masculino", "Mejor Disfraz Femenino", "Mejor Disfraz de Pareja o Grupo", "Premio a la Nostalgia Milenial", "Premio a la Mejor Frase Icónica", "Premio 'No Entendí Quién Eras'", "Premio Éxito de Taquilla", "Mejor Presupuesto Mínimo", "Alma de la Fiesta" and "Mejor Paso Prohibido"

#### Scenario: Category descriptions
- **WHEN** the complete award list is shown
- **THEN** the new categories describe iconic character lines, mysterious or hard-to-guess costumes, costumes that attract photo requests, ingenious low-budget costumes, guests who energize the party and the most ridiculous but fun dance

#### Scenario: No winner before the reveal
- **WHEN** the contest has not been closed and its winners revealed
- **THEN** category cards show no winner

#### Scenario: Winner shown in the card
- **WHEN** the winners have been revealed
- **THEN** each category card shows its winning photo when a winner exists
