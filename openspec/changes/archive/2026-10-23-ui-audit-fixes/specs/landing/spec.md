## MODIFIED Requirements

### Requirement: No horizontal overflow
The system SHALL NOT produce a horizontal scrollbar at any viewport width, and the document scroll width SHALL equal the client width at every measured viewport width.

#### Scenario: No lateral scroll on mobile
- **WHEN** a visitor views the page on a 375 or 390 pixel wide screen
- **THEN** the document scroll width equals the client width and no horizontal scrollbar appears

#### Scenario: No overflow from card content
- **WHEN** the "Qué hay que traer" cards are rendered
- **THEN** no card content extends past the right edge of the document at a 375 pixel wide screen

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

## ADDED Requirements

### Requirement: Hero marquee is readable and pausable
The system SHALL keep the hero marquee text "legalmente 30" fully visible in its reading position, and SHALL stop its movement while the pointer is over it or while it holds keyboard focus.

#### Scenario: Text visible in the reading position
- **WHEN** a visitor reads the hero
- **THEN** the phrase "legalmente 30" is fully inside the marquee while it rests in the reading position

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
