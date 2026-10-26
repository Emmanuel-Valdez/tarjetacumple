# contest Specification

## Purpose
Night-time award contest where guests vote from their own phones for the best costumes. The admin opens and closes the contest from the admin panel, the winners are frozen when voting ends and the public page reveals them with suspense.

## Requirements

### Requirement: Contest starts idle
The system SHALL keep the contest closed until Juli opens it, hide the public vote button while it is idle, and show no candidates or voting controls on direct visits to `/votar`.

#### Scenario: Before the contest is opened
- **WHEN** a visitor opens the landing page or `/votar` before voting opens
- **THEN** no public vote button, candidate photos or voting controls are shown, and the vote view states that voting is unavailable

### Requirement: Admin opens the contest
The system SHALL let Juli open the award contest from the admin panel, freezing the list of award categories at that moment and making the public `/votar` view available.

#### Scenario: Opening enables voting
- **WHEN** Juli opens the contest
- **THEN** the landing page exposes the vote button and visitors can vote in `/votar`

#### Scenario: Categories are frozen
- **WHEN** the contest is opened
- **THEN** its categories are the ten award categories declared at that moment and do not change afterwards

#### Scenario: Opening twice keeps the frozen list
- **WHEN** an admin opens a contest that is already open
- **THEN** the previously frozen categories are kept unchanged

### Requirement: Visitor votes for a category
The system SHALL let a visitor vote for one photo per category on the separate same-site `/votar` view, from their own device identified by the anonymous visitor cookie.

#### Scenario: Voting for a photo
- **WHEN** a visitor selects a candidate photo for the category shown on `/votar` and confirms
- **THEN** the vote is recorded and the visitor moves to the next pending category

#### Scenario: One vote per category
- **WHEN** a visitor who already voted in a category tries to vote again in it
- **THEN** the vote is rejected and the previous vote is kept

#### Scenario: Only contest candidates can be voted
- **WHEN** a visitor tries to vote for a photo that is not a contest candidate
- **THEN** the vote is rejected

#### Scenario: Voting rejected while the contest is closed
- **WHEN** a visitor tries to vote before the contest opens or after it closes
- **THEN** the vote is rejected and no vote is recorded

#### Scenario: Vote is tied to the visitor cookie
- **WHEN** a visitor votes from the landing page and then continues on `/votar`
- **THEN** the same visitor identity is used and the visitor cannot vote twice in the same category

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

### Requirement: Admin closes the contest
The system SHALL let Juli close the contest, which stops all voting and freezes the winner of each category.

#### Scenario: Closing stops voting
- **WHEN** Juli closes the contest
- **THEN** `/votar` no longer accepts votes and the public vote button disappears from the landing page

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

### Requirement: Candidate photos are isolated to the voting view
The system SHALL load contest candidate photos only in the public `/votar` view while voting is open; the landing page SHALL NOT render the candidate-photo collection.

#### Scenario: Candidates are not loaded on the landing page
- **WHEN** a visitor loads the landing page while the contest is open
- **THEN** the page shows the vote button but does not load the candidate-photo collection

#### Scenario: Candidate photos appear in the voting view
- **WHEN** a visitor opens `/votar` while voting is open
- **THEN** candidate photos are available for the current category without displaying vote totals

#### Scenario: Closed view does not expose candidates
- **WHEN** a visitor opens `/votar` while the contest is idle or closed
- **THEN** candidate photos and voting controls are not returned for public display
