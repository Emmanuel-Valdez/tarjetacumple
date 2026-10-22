## Purpose

Admin panel with dual authentication for managing RSVPs, photos and dedications.

## Requirements

### Requirement: Dual login
The system SHALL support two admin accounts: one for Juli and one for the organizer.

#### Scenario: Juli login
- **WHEN** Juli logs in with her credentials
- **THEN** she accesses the admin panel

#### Scenario: Organizer login
- **WHEN** the organizer logs in with her credentials
- **THEN** she accesses the admin panel

### Requirement: RSVP management
The system SHALL let admins view and delete RSVP entries.

#### Scenario: View RSVPs
- **WHEN** an admin opens the RSVP list
- **THEN** all RSVPs are listed

#### Scenario: Delete RSVP
- **WHEN** an admin deletes an RSVP
- **THEN** it is removed from the list

### Requirement: Export RSVP list
The system SHALL let admins copy or export the RSVP list.

#### Scenario: Copy list
- **WHEN** an admin clicks copy
- **THEN** the RSVP list is copied to the clipboard

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

### Requirement: Song management
The system SHALL let admins list and delete the songs guests added to the playlist.

#### Scenario: Delete a song
- **WHEN** an admin deletes a song
- **THEN** it no longer appears in the public playlist

### Requirement: Dedication visibility by role
The system SHALL show dedications only to the organizer, not to Juli.

#### Scenario: Organizer sees dedications
- **WHEN** the organizer views RSVPs
- **THEN** dedications are displayed

#### Scenario: Juli cannot see dedications
- **WHEN** Juli views RSVPs
- **THEN** dedications are hidden

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

### Requirement: Return to the invitation
The system SHALL provide a visible “Volver a la invitación” link from both the admin panel and the admin login page.

#### Scenario: Return from admin panel
- **WHEN** an authenticated admin is in the admin panel
- **THEN** they can navigate to the public invitation

#### Scenario: Return from login
- **WHEN** a visitor is on the admin login page
- **THEN** they can navigate to the public invitation without logging in
