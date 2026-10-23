## ADDED Requirements

### Requirement: Typography has distinct roles
The system SHALL use two type families with distinct roles: a sans-serif family for information, navigation and body copy, and an editorial serif family for section headings and personal messages. Both SHALL come from system font stacks, and the system SHALL NOT request fonts over the network.

#### Scenario: Section headings are editorial
- **WHEN** a visitor reads a section heading on the landing page
- **THEN** it is rendered in the editorial serif family while body copy stays in the sans-serif family

#### Scenario: No network font request
- **WHEN** the page is served
- **THEN** no font file is requested from a third-party origin

#### Scenario: Accented characters render correctly
- **WHEN** a heading contains accented characters or the "ñ"
- **THEN** the chosen stacks render them without falling back to a mismatched face

### Requirement: Type scale is explicit
The system SHALL assign a distinct size, weight and line-height to each typographic level (page title, section heading, subtitle, body, metadata), and SHALL NOT render every section heading at the same size.

#### Scenario: Hierarchy is visible
- **WHEN** a visitor scans the landing page
- **THEN** the page title, the section headings and the supporting copy are visually distinguishable from each other

#### Scenario: Body copy is readable
- **WHEN** a visitor reads an explanatory paragraph or a card description
- **THEN** it is rendered at body size rather than at metadata size, with a line-height of at least 1.5

#### Scenario: Metadata is reserved
- **WHEN** a visitor reads dates, counts or helper text
- **THEN** that text uses the smaller metadata level instead of competing with body copy

### Requirement: Hashtag is set as a display element
The system SHALL render the night hashtag as a display element inside its section, using the editorial serif family and at a size clearly larger than body copy, without turning it into a button or a copy control.

#### Scenario: Hashtag hierarchy
- **WHEN** a visitor reaches the hashtag section
- **THEN** the hashtag is the largest text in the section after the heading

#### Scenario: Hashtag is not a control
- **WHEN** a keyboard visitor tabs through the landing page
- **THEN** the hashtag is not part of the tab order

### Requirement: Text is not clipped by its own box
The system SHALL size text containers so that ascenders and descenders of the rendered font fit inside the visible area, including inside overflow-clipped elements.

#### Scenario: Descenders in the marquee
- **WHEN** a visitor reads a marquee phrase that contains a "g", "j" or "y"
- **THEN** the descender is fully visible and not cut by the container edge

#### Scenario: Accented caps fit
- **WHEN** a heading renders accented uppercase characters
- **THEN** no accent is cut by the line box
