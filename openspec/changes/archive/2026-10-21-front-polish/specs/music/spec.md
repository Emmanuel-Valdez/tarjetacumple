## Purpose

Background theme player for the invitation: plays Cyndi Lauper's "Girls Just Want to Have Fun" as the party soundtrack, starting muted because browsers block unmuted autoplay, and giving the visitor an explicit on/off control.

## ADDED Requirements

### Requirement: Background theme player
The system SHALL play "Girls Just Want to Have Fun" by Cyndi Lauper as looping background audio on the landing page.

#### Scenario: Theme is loaded
- **WHEN** a visitor loads the landing page
- **THEN** the player loads the official "Girls Just Want to Have Fun" video as the background source

#### Scenario: Theme loops
- **WHEN** the track finishes playing
- **THEN** it starts again from the beginning

### Requirement: Muted autoplay
The system SHALL start the theme muted so it complies with browser autoplay policies, and SHALL unmute it once the visitor interacts with the page.

#### Scenario: Starts muted
- **WHEN** the page loads without any prior user interaction
- **THEN** the theme plays without sound

#### Scenario: Unmutes on first interaction
- **WHEN** the visitor clicks, taps or presses a key anywhere on the page
- **THEN** the theme becomes audible

### Requirement: Music control
The system SHALL expose a visible control that lets the visitor turn the background theme off and on again.

#### Scenario: Control visible
- **WHEN** a visitor views the page
- **THEN** a music control button is visible and reachable by keyboard

#### Scenario: Control pauses
- **WHEN** the visitor activates the music control
- **THEN** the audio stops and the control indicates the paused state

#### Scenario: Control resumes
- **WHEN** the visitor activates the music control again
- **THEN** the audio resumes and the control indicates the playing state

### Requirement: Player is unobtrusive
The system SHALL keep the player invisible in the page flow, and SHALL NOT stop the page or other content from being usable when the player fails to load.

#### Scenario: Player takes no layout space
- **WHEN** the page renders
- **THEN** the player occupies no visible space in the layout

#### Scenario: Failure is not fatal
- **WHEN** the player cannot load or is blocked by the browser
- **THEN** the rest of the page works normally and the control does not break
