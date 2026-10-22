## MODIFIED Requirements

### Requirement: Contest starts idle
The system SHALL keep the contest closed until Juli or the organizer opens it, hide the public vote button while it is idle, and show no candidates or voting controls on direct visits to `/votar`.

#### Scenario: Before the contest is opened
- **WHEN** a visitor opens the landing page or `/votar` before voting opens
- **THEN** no public vote button, candidate photos or voting controls are shown, and the vote view states that voting is unavailable

### Requirement: Organizer opens the contest
The system SHALL let Juli or the organizer open the award contest from the admin panel, freezing the list of award categories at that moment and making the public `/votar` view available.

#### Scenario: Opening enables voting
- **WHEN** Juli or the organizer opens the contest
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

### Requirement: Organizer closes the contest
The system SHALL let Juli or the organizer close the contest, which stops all voting and freezes the winner of each category.

#### Scenario: Closing stops voting
- **WHEN** Juli or the organizer closes the contest
- **THEN** `/votar` no longer accepts votes and the public vote button disappears from the landing page

#### Scenario: Winners are frozen
- **WHEN** an admin closes the contest
- **THEN** the winner of each category is calculated and stored, and later votes cannot change it

#### Scenario: Contest cannot be reopened
- **WHEN** an admin tries to open a contest that was already closed
- **THEN** the request is rejected and the winners stay frozen

## ADDED Requirements

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

## REMOVED Requirements

### Requirement: Contest photos stay out of the public strips until the contest ends
**Reason**: Public photo strips are removed, and candidate photos belong only in the separate voting view while voting is open.
**Migration**: Do not reintroduce contest candidates into the landing photo area after closing; show winners in the award cards instead.
