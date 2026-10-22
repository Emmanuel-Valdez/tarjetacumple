# contest Specification

## Purpose
Night-time award contest where guests vote from their own phones for the best costumes. The organizer opens and closes the contest from the admin panel, the winners are frozen when voting ends and the public page reveals them with suspense.

## Requirements

### Requirement: Contest starts idle
The system SHALL keep the contest closed until an admin opens it, and SHALL show visitors a neutral message instead of the voting controls.

#### Scenario: Before the contest is opened
- **WHEN** a visitor opens the voting section before an admin opens the contest
- **THEN** no voting controls are shown and the section states that voting is not open

### Requirement: Organizer opens the contest
The system SHALL let an admin open the award contest from the admin panel, freezing the list of award categories at that moment.

#### Scenario: Opening enables voting
- **WHEN** an admin opens the contest
- **THEN** the voting section becomes available to visitors

#### Scenario: Categories are frozen
- **WHEN** an admin opens the contest
- **THEN** the categories of that contest are the award categories declared at that moment and do not change afterwards

#### Scenario: Opening twice keeps the frozen list
- **WHEN** an admin opens a contest that is already open
- **THEN** the previously frozen categories are kept unchanged

### Requirement: Visitor votes for a category
The system SHALL let a visitor vote for one photo per category from their own device, identified by the anonymous visitor cookie that already powers the like counters.

#### Scenario: Voting for a photo
- **WHEN** a visitor selects a candidate photo for the category shown and confirms
- **THEN** the vote is recorded and the visitor moves to the next pending category

#### Scenario: One vote per category
- **WHEN** a visitor who already voted in a category tries to vote again in it
- **THEN** the vote is rejected and the previous vote is kept

#### Scenario: Only contest candidates can be voted
- **WHEN** a visitor tries to vote for a photo that is not a contest candidate
- **THEN** the vote is rejected

#### Scenario: Voting rejected while the contest is closed
- **WHEN** a visitor tries to vote after the contest was closed
- **THEN** the vote is rejected and no vote is recorded

#### Scenario: Vote is tied to the visitor cookie
- **WHEN** a visitor votes from a device
- **THEN** the vote is counted for the visitor identified by the anonymous cookie, and the same visitor cannot vote twice in the same category

### Requirement: Categories are presented in random order
The system SHALL present the pending categories to each visitor in a random order, so the same category is not always voted first.

#### Scenario: Order is not fixed
- **WHEN** two different visitors open the voting section
- **THEN** they are not guaranteed to see the same category first

### Requirement: Tally is hidden while voting is open
The system SHALL NOT show the per-photo vote tally to visitors while the contest is open.

#### Scenario: No live tally
- **WHEN** a visitor views the candidate photos while the contest is open
- **THEN** no vote count is displayed for any candidate

### Requirement: Organizer closes the contest
The system SHALL let an admin close the contest, which stops all voting and freezes the winner of each category.

#### Scenario: Closing stops voting
- **WHEN** an admin closes the contest
- **THEN** the voting section no longer accepts votes and the voting controls disappear

#### Scenario: Winners are frozen
- **WHEN** an admin closes the contest
- **THEN** the winner of each category is calculated and stored, and later votes cannot change it

#### Scenario: Contest cannot be reopened
- **WHEN** an admin tries to open a contest that was already closed
- **THEN** the request is rejected and the winners stay frozen

### Requirement: Organizer can reset the contest
The system SHALL let an admin reset the contest, discarding the votes and the frozen winners and returning the contest to the unopened state, so the whole flow can be rehearsed.

#### Scenario: Reset discards the votes
- **WHEN** an admin resets the contest
- **THEN** every vote and every frozen winner is discarded and the contest returns to the unopened state

#### Scenario: Reset requires an explicit confirmation
- **WHEN** an admin triggers the reset
- **THEN** the reset is only performed after the admin types the confirmation word

#### Scenario: Categories are frozen again on the next opening
- **WHEN** an admin resets the contest and opens it again
- **THEN** the categories are frozen again from the current award categories

#### Scenario: Candidate photos survive a reset
- **WHEN** an admin resets the contest
- **THEN** the uploaded candidate photos are kept and are not deleted

### Requirement: Closing the contest asks for confirmation
The system SHALL require an explicit confirmation before the contest is closed, stating that the contest cannot be reopened afterwards.

#### Scenario: Confirmation required
- **WHEN** an admin triggers the close action
- **THEN** the contest stays open until the admin confirms, and the confirmation states that the contest cannot be reopened

### Requirement: Winners are revealed with suspense
The system SHALL reveal the winners a few seconds after the contest is closed, so the announcement builds suspense on the page.

#### Scenario: Suspense before the reveal
- **WHEN** a visitor loads the page after the contest was closed
- **THEN** the winners are not shown immediately and a suspense animation of 3 to 5 seconds plays first

#### Scenario: Winners appear after the suspense
- **WHEN** the suspense animation finishes
- **THEN** the winner of each category is displayed with its photo

#### Scenario: Reduced motion respected
- **WHEN** the visitor prefers reduced motion
- **THEN** the winners are revealed without the suspense animation

### Requirement: Contest photos stay out of the public strips until the contest ends
The system SHALL NOT include the contest candidate photos in the public photo strips while the contest is open, and SHALL include them once the contest is closed.

#### Scenario: Candidates hidden during the contest
- **WHEN** the contest is open and a visitor browses the photo strips
- **THEN** no contest candidate photo is included in them

#### Scenario: Candidates visible after the contest
- **WHEN** a visitor browses the photo strips after the contest was closed
- **THEN** the contest candidate photos are included
