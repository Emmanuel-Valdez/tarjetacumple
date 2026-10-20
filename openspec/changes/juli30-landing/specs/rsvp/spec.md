## Purpose

RSVP flow letting guests confirm attendance, leave dedications, and see a live counter of confirmations.

## ADDED Requirements

### Requirement: RSVP modal opens
The system SHALL open an RSVP modal when the confirm button is clicked.

#### Scenario: Modal opens
- **WHEN** a visitor clicks "Confirmar asistencia"
- **THEN** the modal appears with focus trapped inside

#### Scenario: Modal closes with ESC
- **WHEN** a visitor presses ESC inside the modal
- **THEN** the modal closes and focus returns to the trigger button

### Requirement: RSVP form fields
The system SHALL collect guest name, number of companions and an optional dedication message.

#### Scenario: Required fields
- **WHEN** a visitor submits without name
- **THEN** a validation error is shown and submission is blocked

#### Scenario: Submission succeeds
- **WHEN** a visitor submits valid data
- **THEN** the RSVP is persisted and a success confirmation is shown

### Requirement: Live confirmation counter
The system SHALL display the number of confirmed guests and update it at least every 15 seconds.

#### Scenario: Counter visible
- **WHEN** a visitor loads the page
- **THEN** the confirmation counter is displayed

#### Scenario: Counter updates
- **WHEN** 15 seconds pass after load
- **THEN** the counter refreshes from the server

### Requirement: Dedication privacy
The system SHALL store dedications but SHALL NOT display them to Juli's account.

#### Scenario: Organizer sees dedications
- **WHEN** the organizer logs in
- **THEN** dedications are visible

#### Scenario: Juli does not see dedications
- **WHEN** Juli logs in
- **THEN** dedications are not visible