## MODIFIED Requirements

### Requirement: Admin opens the contest
The system SHALL let Juli open the award contest from the admin panel, freezing the managed award categories at that moment and making the public `/votar` view available.

#### Scenario: Opening enables voting
- **WHEN** Juli opens the contest
- **THEN** the landing page exposes the vote button and visitors can vote in `/votar`

#### Scenario: Categories are frozen
- **WHEN** the contest is opened
- **THEN** its categories are the managed categories at that moment and do not change afterwards

#### Scenario: Opening requires managed categories
- **WHEN** the contest is idle and no managed categories exist
- **THEN** opening is rejected and the contest stays idle

#### Scenario: Opening twice keeps the frozen list
- **WHEN** an admin opens a contest that is already open
- **THEN** the previously frozen categories are kept unchanged

### Requirement: Organizer can reset the contest
The system SHALL let an admin reset the contest, discarding the votes and the frozen winners, restoring the default award categories, and returning the contest to the unopened state, so the whole flow can be rehearsed.

#### Scenario: Reset discards the votes
- **WHEN** an admin resets the contest
- **THEN** every vote and every frozen winner is discarded and the contest returns to the unopened state

#### Scenario: Reset requires an explicit confirmation
- **WHEN** an admin triggers the reset
- **THEN** the reset is only performed after the admin types the confirmation word

#### Scenario: Reset restores default categories
- **WHEN** an admin resets the contest
- **THEN** the managed categories are restored to the default award categories

#### Scenario: Categories are frozen again on the next opening
- **WHEN** an admin resets the contest and opens it again
- **THEN** the categories are frozen again from the current managed categories

#### Scenario: Candidate photos survive a reset
- **WHEN** an admin resets the contest
- **THEN** the uploaded candidate photos are kept and are not deleted
