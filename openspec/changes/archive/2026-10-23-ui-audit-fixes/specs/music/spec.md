## MODIFIED Requirements

### Requirement: Music control
The system SHALL expose a visible control that lets the visitor turn the background theme off and on again. The control SHALL report the real state of the player, including that the theme starts muted, so that its pressed state and its visible hint never claim that sound is playing when it is not.

#### Scenario: Control visible
- **WHEN** a visitor views the page
- **THEN** a music control button is visible and reachable by keyboard

#### Scenario: Control pauses
- **WHEN** a visitor activates the music control
- **THEN** the audio stops and the control indicates the paused state

#### Scenario: Control resumes
- **WHEN** a visitor activates the music control again
- **THEN** the audio resumes and the control indicates the playing state

#### Scenario: Muted start is reported
- **WHEN** the page has loaded and the theme is playing without sound
- **THEN** the control does not report that sound is playing and invites the visitor to unmute it

#### Scenario: Unavailable player
- **WHEN** the player cannot be loaded
- **THEN** the control reports that the music is unavailable and no longer claims to be playing
