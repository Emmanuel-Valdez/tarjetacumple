## Purpose

Landing page for Juli's 30th birthday invitation, themed as a night at the cinema, presenting event info, countdown, location, dress code and movie inspiration.

## Requirements

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
### Requirement: Countdown respects reduced motion
The system SHALL keep the countdown free of animated transitions, SHALL stop its update interval once the event date has passed, and SHALL NOT expose the countdown as a live region.

#### Scenario: Reduced motion enabled
- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** no animated transitions occur in the countdown

#### Scenario: Countdown is not announced on every tick
- **WHEN** a screen reader visits the countdown
- **THEN** the remaining time is not announced on every tick

#### Scenario: Event date has passed
- **WHEN** the event date and time have passed
- **THEN** the countdown shows the closing message and stops updating

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
The system SHALL show only two preview categories and a sentence stating that more categories are still to come before voting opens, reveal the complete list of ten categories when voting opens, and SHALL show each winner in its category card after the winners have been revealed.

#### Scenario: Preview before voting opens
- **WHEN** a visitor views the awards section while the contest is idle
- **THEN** only "Mejor Disfraz Masculino" and "Mejor Disfraz Femenino" are shown, followed by a complete sentence announcing that more categories are still to come

#### Scenario: Categories visible
- **WHEN** a visitor views the awards section
- **THEN** the two preview categories are visible before voting opens and all ten categories are visible once voting opens

#### Scenario: Full categories revealed when voting opens
- **WHEN** Juli opens voting
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
### Requirement: Event data is centralized
The system SHALL read the date, time, venue, address and map link from a single data module.

#### Scenario: Data change propagates
- **WHEN** the event data is edited
- **THEN** the landing page reflects it without touching the components

#### Scenario: Real schedule is displayed
- **WHEN** a visitor views the location section
- **THEN** it shows the date, time and timezone declared in the event data module

### Requirement: Movie inspiration carousel
The system SHALL present the movie inspiration as two rows of images, each row showing a different half of the image set. On pointer devices the rows SHALL scroll automatically and loop seamlessly, moving slowly enough to read; on touch devices the rows SHALL be swipeable and scroll-snapped, with every poster reachable by touch. The system SHALL NOT duplicate images on touch devices.

#### Scenario: Rows do not repeat each other
- **WHEN** the carousel is displayed
- **THEN** the top row shows the first half of the images and the bottom row the second half

#### Scenario: Carousel loops
- **WHEN** a row finishes its scroll cycle on a pointer device
- **THEN** it restarts without a visible jump

#### Scenario: Every poster is reachable by touch
- **WHEN** a visitor swipes a row on a touch device
- **THEN** each poster of that row can be brought into view, one at a time, without the row moving on its own

#### Scenario: Reduced motion respected
- **WHEN** the visitor prefers reduced motion
- **THEN** the rows stay static

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
The system SHALL NOT produce a horizontal scrollbar at any viewport width, and the document scroll width SHALL equal the client width at every measured viewport width.

#### Scenario: No lateral scroll on mobile
- **WHEN** a visitor views the page on a 375 or 390 pixel wide screen
- **THEN** the document scroll width equals the client width and no horizontal scrollbar appears

#### Scenario: No overflow from card content
- **WHEN** the "Qué hay que traer" cards are rendered
- **THEN** no card content extends past the right edge of the document at a 375 pixel wide screen

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
- **WHEN** Juli has opened voting
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

### Requirement: Hero marquee is readable and pausable
The system SHALL keep the hero marquee text "Legalmente 30" fully visible in its reading position, including the descenders, and SHALL stop its movement while the pointer is over it or while it holds keyboard focus.

#### Scenario: Text visible in the reading position
- **WHEN** a visitor reads the hero
- **THEN** the phrase "Legalmente 30" is fully inside the marquee while it rests in the reading position, with the descender of the "g" visible

#### Scenario: Motion pauses on interaction
- **WHEN** a visitor hovers the marquee or moves keyboard focus into it
- **THEN** the marquee stops moving
### Requirement: Shared link preview
The system SHALL provide a description and Open Graph metadata for the public page, so that a shared link renders a title, a summary and an image in messaging apps.

#### Scenario: Metadata is present
- **WHEN** the page is served
- **THEN** the document head contains a meta description and the Open Graph title, description and image tags

#### Scenario: Link preview in a messaging app
- **WHEN** the public page URL is shared in a messaging app
- **THEN** the preview shows the page title, its description and a preview image

### Requirement: Contest state refresh is not busy polling
The system SHALL refresh the contest state at most once every 10 seconds, SHALL stop refreshing while the page is hidden, and SHALL stop refreshing once the contest is closed and the winners have been revealed.

#### Scenario: Refresh rate
- **WHEN** a visitor keeps the page open
- **THEN** the contest state is requested at most once every 10 seconds

#### Scenario: Page hidden
- **WHEN** the visitor switches to another tab
- **THEN** the page stops requesting the contest state until the page becomes visible again

#### Scenario: Contest closed
- **WHEN** the contest is closed and the winners have been revealed
- **THEN** the page stops requesting the contest state

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
