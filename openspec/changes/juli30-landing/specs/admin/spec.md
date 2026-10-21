## Purpose

Admin panel with dual authentication for managing RSVPs, photos, likes and dedications.

## ADDED Requirements

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
The system SHALL let admins upload photos with validation of type and size.

#### Scenario: Valid upload
- **WHEN** an admin uploads a valid image
- **THEN** it is stored and appears in the gallery

#### Scenario: Invalid upload rejected
- **WHEN** an admin uploads an invalid file
- **THEN** the upload is rejected with an error

#### Scenario: Upload is resized
- **WHEN** an admin uploads an image larger than 1600px
- **THEN** it is resized and converted to WebP before being stored

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