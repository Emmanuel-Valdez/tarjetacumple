## MODIFIED Requirements

### Requirement: Photo upload
The system SHALL let admins upload photos with validation of type and size, and SHALL let them choose whether the photo is a strip photo or a contest candidate.

#### Scenario: Valid upload
- **WHEN** an admin uploads a valid image
- **THEN** it is stored and appears in the photo strips

#### Scenario: Invalid upload rejected
- **WHEN** an admin uploads an invalid file
- **THEN** the upload is rejected with an error

#### Scenario: Upload is resized
- **WHEN** an admin uploads an image larger than 1440px
- **THEN** it is resized and converted to WebP before being stored

#### Scenario: Destination is recorded
- **WHEN** an admin uploads a photo as a contest candidate
- **THEN** the photo is recorded as a candidate and does not appear in the photo strips while the contest is open

## ADDED Requirements

### Requirement: Contest controls
The system SHALL let admins open and close the award contest from the admin panel.

#### Scenario: Open the contest
- **WHEN** an admin opens the contest
- **THEN** voting is enabled for visitors and the award categories are frozen

#### Scenario: Close the contest
- **WHEN** an admin closes the contest
- **THEN** voting is disabled and the winners are calculated and frozen

#### Scenario: Closed contest cannot be reopened
- **WHEN** an admin tries to open a contest that was already closed
- **THEN** the request is rejected and the winners stay frozen

#### Scenario: Closing asks for confirmation
- **WHEN** an admin triggers the close action
- **THEN** a confirmation is shown explaining that the contest cannot be reopened, and the contest stays open until the admin confirms

### Requirement: Contest reset
The system SHALL let admins reset the contest from the admin panel, discarding the votes and the winners, so the flow can be rehearsed before the event.

#### Scenario: Reset asks for a confirmation word
- **WHEN** an admin tries to reset the contest
- **THEN** the reset only runs after the admin types the confirmation word

#### Scenario: Reset returns the contest to the unopened state
- **WHEN** an admin resets the contest
- **THEN** the votes and the winners are discarded and the contest can be opened again

#### Scenario: Reset warning is visible
- **WHEN** the admin panel shows the reset action
- **THEN** it states that the action discards the votes and must not be used during the event

### Requirement: Contest tally
The system SHALL let admins see, per category, how many votes each candidate photo has.

#### Scenario: Tally per category
- **WHEN** an admin opens the contest panel
- **THEN** each category is listed with its candidates and their vote counts

#### Scenario: Tally is current
- **WHEN** the admin reloads the contest panel while the contest is open
- **THEN** the vote counts reflect the votes cast so far
