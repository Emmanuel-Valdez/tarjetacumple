## MODIFIED Requirements

### Requirement: Photo upload
The system SHALL let admins upload photos with validation of type and size as contest candidates only; it SHALL NOT offer a strip-photo destination.

#### Scenario: Valid upload
- **WHEN** an admin uploads a valid image
- **THEN** it is stored as a contest candidate and is available to the contest

#### Scenario: Invalid upload rejected
- **WHEN** an admin uploads an invalid file
- **THEN** the upload is rejected with an error

#### Scenario: Upload is resized
- **WHEN** an admin uploads an image larger than 1440px
- **THEN** it is resized and converted to WebP before being stored

#### Scenario: Only contest candidates are managed
- **WHEN** an admin views or uploads photos
- **THEN** the photo list and upload action manage contest candidates only and provide no strip destination

#### Scenario: Destination is recorded
- **WHEN** an admin uploads a photo as a contest candidate
- **THEN** the photo is recorded as a candidate and is available only to the contest flow, not to public strips

### Requirement: Contest controls
The system SHALL let Juli and the organizer open and close the award contest from their authenticated admin panel sessions.

#### Scenario: Juli opens the contest
- **WHEN** Juli opens the contest
- **THEN** voting is enabled for visitors and the award categories are frozen

#### Scenario: Organizer opens the contest
- **WHEN** the organizer opens the contest
- **THEN** voting is enabled for visitors and the award categories are frozen

#### Scenario: Open the contest
- **WHEN** either admin role opens the contest
- **THEN** voting is enabled for visitors and the award categories are frozen

#### Scenario: Close the contest
- **WHEN** either admin role closes the contest
- **THEN** voting is disabled and the winners are calculated and frozen

#### Scenario: Closed contest cannot be reopened
- **WHEN** either role tries to open a contest that was already closed
- **THEN** the request is rejected and the winners stay frozen

#### Scenario: Closing asks for confirmation
- **WHEN** either role triggers the close action
- **THEN** a confirmation is shown explaining that the contest cannot be reopened, and the contest stays open until confirmed

## ADDED Requirements

### Requirement: Return to the invitation
The system SHALL provide a visible “Volver a la invitación” link from both the admin panel and the admin login page.

#### Scenario: Return from admin panel
- **WHEN** an authenticated admin is in the admin panel
- **THEN** they can navigate to the public invitation

#### Scenario: Return from login
- **WHEN** a visitor is on the admin login page
- **THEN** they can navigate to the public invitation without logging in
