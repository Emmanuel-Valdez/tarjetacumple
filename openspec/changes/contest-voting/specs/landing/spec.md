## MODIFIED Requirements

### Requirement: Awards teaser
The system SHALL list the award categories visibly on the page, without instructions addressed to the organizer, and SHALL show the winner of the category in its card once the winners have been revealed.

#### Scenario: Categories visible
- **WHEN** a visitor views the awards section
- **THEN** each award category is displayed with its title

#### Scenario: No organizer instructions
- **WHEN** the awards section is rendered
- **THEN** it contains no text instructing the reader to organize a contest or hand out statuettes

#### Scenario: Winner shown in the card
- **WHEN** the winners have been revealed
- **THEN** the card of each category shows the winning photo

#### Scenario: No winner before the reveal
- **WHEN** the contest was not closed yet
- **THEN** the category cards show no winner

## ADDED Requirements

### Requirement: Access to the contest
The system SHALL provide a button in the awards section that takes the visitor to the contest section.

#### Scenario: Button is visible
- **WHEN** a visitor views the awards section
- **THEN** a button to go to the voting section is displayed

#### Scenario: Button navigates
- **WHEN** the visitor activates the button
- **THEN** the contest section is shown

### Requirement: Voting section
The system SHALL display a voting section that shows the category to be voted, the candidate photos and a confirmation control, and that guides the visitor through one category after another.

#### Scenario: Category and candidates shown
- **WHEN** the contest is open and the visitor opens the voting section
- **THEN** the pending category is shown with its candidates and no vote count

#### Scenario: Confirmation is required
- **WHEN** the visitor has not selected a candidate
- **THEN** the confirmation control is disabled

#### Scenario: Next category after confirming
- **WHEN** the visitor confirms a vote
- **THEN** the next pending category is shown

#### Scenario: All categories voted
- **WHEN** the visitor has voted in every category
- **THEN** the section states that all the votes are complete

#### Scenario: Voting is not open
- **WHEN** the contest was not opened yet
- **THEN** the voting controls are not shown and the section states that voting is not open

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
