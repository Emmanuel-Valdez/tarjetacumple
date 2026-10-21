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
The system SHALL show the background image sharp and fully visible when the page loads, and SHALL fade in a second, blurred party background as the visitor scrolls down.

#### Scenario: Background sharp on entry
- **WHEN** the visitor lands on the page
- **THEN** the background image is shown sharp, not blurred, and entirely within the viewport

#### Scenario: Blurred background on scroll
- **WHEN** the visitor scrolls down past the hero
- **THEN** a blurred party photo fades in as the background and the sharp image stops being the dominant layer

#### Scenario: Reduced motion respected
- **WHEN** the visitor prefers reduced motion
- **THEN** the background layers switch without a transition

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

### Requirement: Costume ideas carousel
The system SHALL present 18 costume references from iconic movies/series in a carousel, of which 8 include a photo.

#### Scenario: Carousel navigable
- **WHEN** a visitor interacts with the carousel
- **THEN** they can move between costume cards

#### Scenario: Each card shows characteristic item
- **WHEN** a costume card is displayed
- **THEN** it shows the title, a caricatured characteristic item and why it works

#### Scenario: Reference list is curated
- **WHEN** the costume list is displayed
- **THEN** it contains Chavo del 8 and ¿...y dónde están las rubias? and does not contain Clueless, El Quinto Elemento, Midsommar, Legalmente Rubia, El Gran Lebowski or La Casa de Papel

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
The system SHALL use "Juli: De repente 30" as the browser tab title and a Michael Jackson zombie themed icon as the favicon.

#### Scenario: Tab title
- **WHEN** a visitor looks at the browser tab
- **THEN** it reads "Juli: De repente 30"

#### Scenario: Favicon present
- **WHEN** a visitor loads the page
- **THEN** the browser shows a zombie Michael Jackson icon

### Requirement: No horizontal overflow
The system SHALL NOT produce a horizontal scrollbar at any viewport width.

#### Scenario: No lateral scroll on mobile
- **WHEN** a visitor views the page on a 390px wide screen
- **THEN** the document width equals the viewport width and no horizontal scrollbar appears
