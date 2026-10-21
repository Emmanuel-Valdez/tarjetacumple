## Purpose

Landing page for Juli's 30th birthday invitation, themed as a night at the cinema, presenting event info, countdown, location, dress code and costume inspiration.

## ADDED Requirements

### Requirement: Hero section
The system SHALL display a hero section with the birthday person's name, an inviting phrase and a countdown to the event date.

#### Scenario: Hero renders
- **WHEN** a visitor loads the page
- **THEN** the hero shows "Juli" and an inviting phrase

#### Scenario: Countdown present
- **WHEN** the page loads before the event date
- **THEN** the countdown displays days, hours, minutes and seconds remaining

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
The system SHALL show a cinematic background image on the hero that blurs once the page settles.

#### Scenario: Background blurs
- **WHEN** the page finishes loading
- **THEN** the hero background becomes blurred so the content stays readable

#### Scenario: Reduced motion respected
- **WHEN** the visitor prefers reduced motion
- **THEN** the background is shown already blurred, without the transition

### Requirement: Awards teaser
The system SHALL announce the costume awards without revealing the categories.

#### Scenario: Categories hidden
- **WHEN** a visitor views the awards section
- **THEN** the categories are shown as teasers to be announced on the night

### Requirement: Event data is centralized
The system SHALL read the date, time, venue, address and map link from a single data module.

#### Scenario: Data change propagates
- **WHEN** the event data is edited
- **THEN** the landing page reflects it without touching the components

### Requirement: Dress code section
The system SHALL display a dress code with a playful message encouraging costumes.

#### Scenario: Dress code shown
- **WHEN** a visitor views the dress code section
- **THEN** a playful message about wearing a costume is displayed

### Requirement: Costume ideas carousel
The system SHALL present at least 22 costume references from iconic movies/series in a carousel.

#### Scenario: Carousel navigable
- **WHEN** a visitor interacts with the carousel
- **THEN** they can move between costume cards

#### Scenario: Each card shows characteristic item
- **WHEN** a costume card is displayed
- **THEN** it shows the title, a caricatured characteristic item and why it works