## MODIFIED Requirements

### Requirement: Hero section
The system SHALL display a hero section with the birthday person's name, the tagline "Juli: tener 30, ser coqueta y prospera" and a countdown to the event date.

#### Scenario: Hero renders
- **WHEN** a visitor loads the page
- **THEN** the hero shows "Juli", the tagline "Juli: tener 30, ser coqueta y prospera" and an inviting phrase

#### Scenario: Countdown present
- **WHEN** the page loads before the event date
- **THEN** the countdown displays days, hours, minutes and seconds remaining

#### Scenario: Countdown targets the real date
- **WHEN** the countdown is calculated
- **THEN** it counts down to the event date and time declared in the event data module

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
The system SHALL list the award categories visibly on the page, without instructions addressed to the organizer.

#### Scenario: Categories visible
- **WHEN** a visitor views the awards section
- **THEN** each award category is displayed with its title

#### Scenario: No organizer instructions
- **WHEN** the awards section is rendered
- **THEN** it contains no text instructing the reader to organize a contest or hand out statuettes

### Requirement: Event data is centralized
The system SHALL read the date, time, venue, address and map link from a single data module.

#### Scenario: Data change propagates
- **WHEN** the event data is edited
- **THEN** the landing page reflects it without touching the components

#### Scenario: Real schedule is displayed
- **WHEN** a visitor views the location section
- **THEN** it shows Saturday January 9th 2027 at 22:00, Argentina time

## ADDED Requirements

### Requirement: Adults only notice
The system SHALL display a notice stating that the party is for adults only, phrased in a playful way that matches the costume theme.

#### Scenario: Notice visible
- **WHEN** a visitor views the page
- **THEN** a section states that the party is only for adults and that minors are not admitted

#### Scenario: Tone matches the theme
- **WHEN** the notice is displayed
- **THEN** it is written playfully with costume references rather than as a formal policy statement

### Requirement: What to bring section
The system SHALL display a section presenting the guests' contribution as their presence plus the alcoholic drinks they plan to bring.

#### Scenario: Section visible
- **WHEN** a visitor views the page
- **THEN** a section lists two items: their presence and the drinks they will bring

#### Scenario: Drinks are explicitly alcoholic
- **WHEN** the section is displayed
- **THEN** it states that guests bring their own alcoholic drinks

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
