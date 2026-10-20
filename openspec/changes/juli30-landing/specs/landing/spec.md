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