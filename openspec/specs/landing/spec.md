## Purpose

Landing page for Juli's 30th birthday invitation, themed as a night at the cinema, presenting event info, countdown, location, dress code and movie inspiration.

## Requirements

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

### Requirement: Countdown respects reduced motion
The system SHALL disable countdown animations when the user prefers reduced motion.

#### Scenario: Reduced motion enabled
- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** no animated transitions occur in the countdown

### Requirement: Location section
The system SHALL show the event address and a link to open it in Google Maps.

#### Scenario: Location visible
- **WHEN** a visitor views the location section
- **THEN** the address and a "Ver en mapa" link are displayed

#### Scenario: Map link opens externally
- **WHEN** a visitor clicks the map link
- **THEN** Google Maps opens in a new tab

### Requirement: Hero background
The system SHALL show a single background image, sharp on entry, and SHALL blur it once the visitor scrolls past the hero. The image SHALL be horizontal on landscape viewports and vertical on portrait viewports.

#### Scenario: Background sharp on entry
- **WHEN** the visitor lands on the page
- **THEN** the background image is shown sharp, not blurred

#### Scenario: Blurred background on scroll
- **WHEN** the visitor scrolls down past the hero
- **THEN** the background image blurs and darkens

#### Scenario: Responsive background
- **WHEN** the viewport is portrait
- **THEN** the vertical background is used
- **WHEN** the viewport is landscape
- **THEN** the horizontal background is used

#### Scenario: Reduced motion respected
- **WHEN** the visitor prefers reduced motion
- **THEN** the background switches between sharp and blurred without a transition

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

### Requirement: Event data is centralized
The system SHALL read the date, time, venue, address and map link from a single data module.

#### Scenario: Data change propagates
- **WHEN** the event data is edited
- **THEN** the landing page reflects it without touching the components

#### Scenario: Real schedule is displayed
- **WHEN** a visitor views the location section
- **THEN** it shows the date, time and timezone declared in the event data module

### Requirement: Movie inspiration carousel
The system SHALL replace the costume ideas grid with two auto-scrolling rows of movie/series images. Each row SHALL show a different half of the image set, loop seamlessly, and move slowly enough to read.

#### Scenario: Rows do not repeat each other
- **WHEN** the carousel is displayed
- **THEN** the top row shows the first half of the images and the bottom row the second half

#### Scenario: Carousel loops
- **WHEN** a row finishes its scroll cycle
- **THEN** it restarts without a visible jump

#### Scenario: Reduced motion respected
- **WHEN** the visitor prefers reduced motion
- **THEN** the rows stay static

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

### Requirement: Page title and favicon
The system SHALL use "Juli: capitulo 30, la pelicula" as the browser tab title and a Michael Jackson zombie themed icon as the favicon.

#### Scenario: Tab title
- **WHEN** a visitor looks at the browser tab
- **THEN** it reads "Juli: capitulo 30, la pelicula"

#### Scenario: Favicon present
- **WHEN** a visitor loads the page
- **THEN** the browser shows a zombie Michael Jackson icon

### Requirement: No horizontal overflow
The system SHALL NOT produce a horizontal scrollbar at any viewport width.

#### Scenario: No lateral scroll on mobile
- **WHEN** a visitor views the page on a 390px wide screen
- **THEN** the document width equals the viewport width and no horizontal scrollbar appears

### Requirement: Optimized image assets
The system SHALL serve every image from `public/img/`, sized for its rendered slot.

#### Scenario: Images are tracked and sized
- **WHEN** the site is built
- **THEN** backgrounds, icons, gallery photos and movie cards come from `public/img/` and no image is served above its display resolution

### Requirement: Parallax decoration
The system SHALL show a few static balloons and confetti that move upward only as the visitor scrolls, at different speeds, without any autonomous animation.

#### Scenario: No autonomous motion
- **WHEN** the page is idle
- **THEN** the decoration does not move

#### Scenario: Parallax on scroll
- **WHEN** the visitor scrolls down
- **THEN** the decoration moves up at a fraction of the scroll speed, with layers at different speeds to suggest depth

#### Scenario: Reduced motion respected
- **WHEN** the visitor prefers reduced motion
- **THEN** the decoration stays static

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

### Requirement: Suspense before the winners are shown
The system SHALL hold back the winners for a few seconds after the contest is closed and then show them, so the announcement builds suspense on the page.

#### Scenario: Nothing is shown right after closing
- **WHEN** the contest was just closed and the visitor loads the page
- **THEN** no winner is displayed yet and the suspense animation is running

#### Scenario: Winners are shown after the suspense
- **WHEN** the suspense animation finishes
- **THEN** the winners are displayed in the award cards

#### Scenario: Reduced motion respected
- **WHEN** the visitor prefers reduced motion
- **THEN** the winners are shown without the suspense animation
