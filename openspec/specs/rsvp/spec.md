## Purpose

RSVP flow letting guests confirm attendance, leave dedications, and see a live counter of confirmations.

## Requirements

### Requirement: RSVP modal opens
The system SHALL open an RSVP modal when the confirm button is clicked.

#### Scenario: Modal opens
- **WHEN** a visitor clicks "Confirmar asistencia"
- **THEN** the modal appears with focus trapped inside

#### Scenario: Modal closes with ESC
- **WHEN** a visitor presses ESC inside the modal
- **THEN** the modal closes and focus returns to the trigger button

### Requirement: RSVP form fields
The system SHALL collect guest name, number of companions and an optional dedication message. It SHALL report a failed submission to the visitor instead of leaving the form without an answer, and SHALL record at most one RSVP per submission attempt.

#### Scenario: Required fields
- **WHEN** a visitor submits without name
- **THEN** a validation error is shown and submission is blocked

#### Scenario: Submission succeeds
- **WHEN** a visitor submits valid data
- **THEN** the RSVP is persisted and a success confirmation is shown

#### Scenario: Submission fails
- **WHEN** the request cannot reach the server or the server rejects the data
- **THEN** a visible message tells the visitor that the confirmation could not be sent, and no success confirmation is shown

#### Scenario: One confirmation per press
- **WHEN** a visitor presses the submit button more than once while the first request is in flight
- **THEN** the submit button stays disabled until the request settles and only one RSVP is recorded

### Requirement: Live confirmation counter
The system SHALL display the number of confirmed people and update it at least every 15 seconds. When the count cannot be retrieved, the system SHALL show that the count is unavailable instead of a number.

#### Scenario: Counter visible
- **WHEN** a visitor loads the page
- **THEN** the confirmation counter is displayed

#### Scenario: Counter updates
- **WHEN** 15 seconds pass after load
- **THEN** the counter refreshes from the server

#### Scenario: Counter counts people
- **WHEN** an RSVP includes companions
- **THEN** the counter adds the companions to the confirmed guest

#### Scenario: Counter does not report a false zero
- **WHEN** the counter request fails
- **THEN** the counter shows that the number of confirmations is unavailable and not "0"

### Requirement: RSVP modal is named
The system SHALL give the RSVP modal an accessible name that identifies it as the attendance confirmation, so that assistive technology announces what the dialog is.

#### Scenario: Dialog is announced
- **WHEN** a screen reader opens the RSVP modal
- **THEN** the dialog is announced with a name that identifies it as the attendance confirmation

#### Scenario: Focus returns after closing
- **WHEN** the visitor closes the modal
- **THEN** the focus returns to the control that opened it

### Requirement: Dedication privacy
The system SHALL store dedications but SHALL NOT display them to Juli's account.

#### Scenario: Organizer sees dedications
- **WHEN** the organizer logs in
- **THEN** dedications are visible

#### Scenario: Juli does not see dedications
- **WHEN** Juli logs in
- **THEN** dedications are not visible
