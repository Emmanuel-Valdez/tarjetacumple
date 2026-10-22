## MODIFIED Requirements

### Requirement: Hero section
The system SHALL display a hero section with Juli's name, the heading “Juli protagoniza:”, the marquee text “legalmente 30” and a countdown to the event date.

#### Scenario: Hero renders
- **WHEN** a visitor loads the page
- **THEN** the hero shows Juli, “Juli protagoniza:”, “legalmente 30” as an inviting marquee, and an invitation to join the celebration

#### Scenario: Countdown present
- **WHEN** the page loads before the event date
- **THEN** the countdown displays days, hours, minutes and seconds remaining

#### Scenario: Countdown targets the real date
- **WHEN** the countdown is calculated
- **THEN** it counts down to the event date and time declared in the event data module

### Requirement: Awards teaser
The system SHALL show only two preview categories and the message “y varias categorías más” before voting opens, reveal the complete list of ten categories when voting opens, and SHALL show each winner in its category card after the winners have been revealed.

#### Scenario: Preview before voting opens
- **WHEN** a visitor views the awards section while the contest is idle
- **THEN** only “Mejor Disfraz Masculino” and “Mejor Disfraz Femenino” are shown, followed by “y varias categorías más”

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
- **THEN** its categories are “Mejor Disfraz Masculino”, “Mejor Disfraz Femenino”, “Mejor Disfraz de Pareja o Grupo”, “Premio a la Nostalgia Milenial”, “Premio a la Mejor Frase Icónica”, “Premio ‘No Entendí Quién Eras’”, “Premio Éxito de Taquilla”, “Mejor Presupuesto Mínimo”, “Alma de la Fiesta” and “Mejor Paso Prohibido”

#### Scenario: Category descriptions
- **WHEN** the complete award list is shown
- **THEN** the new categories describe iconic character lines, mysterious or hard-to-guess costumes, costumes that attract photo requests, ingenious low-budget costumes, guests who energize the party and the most ridiculous but fun dance

#### Scenario: No winner before the reveal
- **WHEN** the contest has not been closed and its winners revealed
- **THEN** category cards show no winner

#### Scenario: Winner shown in the card
- **WHEN** the winners have been revealed
- **THEN** each category card shows its winning photo when a winner exists

### Requirement: Access to the contest
The system SHALL provide a link from the awards section to the separate `/votar` view only while voting is open.

#### Scenario: No link before voting opens
- **WHEN** a visitor views the awards section while the contest is idle
- **THEN** no link or button to vote is displayed

#### Scenario: Button is visible
- **WHEN** an organizer or Juli has opened voting
- **THEN** the awards section displays a button that opens `/votar`

#### Scenario: Button navigates
- **WHEN** a visitor activates the vote button while voting is open
- **THEN** the `/votar` view is opened

#### Scenario: Link disappears after voting closes
- **WHEN** the contest is closed
- **THEN** the public vote button is no longer displayed and the awards section can reveal the winners

### Requirement: Voting view
The system SHALL keep the voting flow on the separate `/votar` view and guide each visitor through one pending category at a time.

#### Scenario: Category and candidates shown
- **WHEN** the contest is open and a visitor opens `/votar`
- **THEN** the pending category is shown with its candidate photos and no vote counts

#### Scenario: Confirmation is required
- **WHEN** the visitor has not selected a candidate
- **THEN** the confirmation control is disabled

#### Scenario: Next category after confirming
- **WHEN** the visitor confirms a vote
- **THEN** the next pending category is shown

#### Scenario: All categories voted
- **WHEN** the visitor has voted in every category
- **THEN** the view states that all votes are complete

#### Scenario: Direct access while voting is unavailable
- **WHEN** a visitor opens `/votar` before voting opens or after it closes
- **THEN** no candidate photos or voting controls are shown and the view explains that voting is unavailable

## ADDED Requirements

### Requirement: Event details grouped as compact cards
The system SHALL present dress code, adults-only guidance and what guests should bring together under “Qué hay que traer” as compact cards with clear copy addressed to adult invitees.

#### Scenario: Required costume and special awards
- **WHEN** a visitor views “Qué hay que traer”
- **THEN** a card states that a costume is mandatory and that special prizes will be awarded during the night

#### Scenario: Adults-only guidance addresses invitees
- **WHEN** a visitor views “Qué hay que traer”
- **THEN** a card clearly states that the invitation is for adults and asks guests not to bring children, without addressing minors directly

#### Scenario: Presence and drinks
- **WHEN** a visitor views “Qué hay que traer”
- **THEN** cards state that their presence is welcome and that each guest should bring their own alcoholic drink

### Requirement: Featured Juli photos and commitment message
The system SHALL show the julifiesta photo directly below the location section as a single prominent image, and SHALL show the julilogramos photo with an inviting commitment message before the playlist.

#### Scenario: Juli fiesta photo placement
- **WHEN** a visitor scrolls below the location section
- **THEN** they see one prominent julifiesta image instead of interleaved photo grids

#### Scenario: Julilogramos before the playlist
- **WHEN** a visitor reaches the playlist area
- **THEN** the “Te espero, no me falles” message and julilogramos photo appear before the playlist

### Requirement: Gift transfer information
The system SHALL show a “Regalos” section with a placeholder for transfer information until real details are configured, and SHALL display configured transfer details from server-side environment configuration when available.

#### Scenario: Placeholder while transfer details are not configured
- **WHEN** a visitor views “Regalos” and transfer information is not configured
- **THEN** a clear placeholder is shown instead of invented recipient or account information

#### Scenario: Configured transfer details
- **WHEN** transfer information is configured on the server
- **THEN** “Regalos” displays the configured alias and recipient/account details

## REMOVED Requirements

### Requirement: Dress code section
**Reason**: Dress code is being consolidated with the adults-only guidance and guest contributions in one compact “Qué hay que traer” section.
**Migration**: Keep the mandatory-costume instruction and special-prizes copy in the new grouped section.

### Requirement: Adults only notice
**Reason**: The separate notice addresses minors directly and is replaced by clear copy for adult invitees.
**Migration**: Move the +18 restriction and request not to bring children into a card under “Qué hay que traer”.

### Requirement: What to bring section
**Reason**: Its two items are being presented alongside dress code and age guidance in one grouped section.
**Migration**: Preserve the presence and alcoholic-drink information as cards in “Qué hay que traer”.
