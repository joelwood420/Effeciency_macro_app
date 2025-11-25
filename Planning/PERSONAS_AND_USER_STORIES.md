# Personas and User Stories - Effeciency Macro App

## Persona 1: Alex – The Competitive Weightlifter

**Age:** 27  
**Profession:** Semi-professional Weightlifter  
**Goal:** Optimize nutrition and performance for competitions

### Bio
Alex is a competitive weightlifter preparing for competitions. They are highly focused on optimizing nutrition and performance, diligently tracking protein, carbs, fats, and strength progress (bench press max).

### User Stories

#### Macro Logging

- **US1.1:** As Alex, I want to input individual macro values (protein, carbs, fats) for a breakfast item so that I can track macros with precision.
  - **Acceptance Criteria:** Form accepts inputs for each macro separately; values display with correct units (grams)

- **US1.2:** As Alex, I want to see a total macro summary after logging breakfast so that I can verify my totals match my targets.
  - **Acceptance Criteria:** Summary shows total protein, carbs, fats for the meal; includes visual comparison to daily targets

- **US1.3:** As Alex, I want to quickly add a pre-saved breakfast template so that I don't re-enter the same foods repeatedly.
  - **Acceptance Criteria:** Can save/load templates; selecting a template auto-fills the form with saved values

- **US1.4:** As Alex, I want to search a food database to find macro values so that I don't have to calculate them manually.
  - **Acceptance Criteria:** Search returns food items with pre-filled macro values; can select from results to add to log

#### Strength Tracking

- **US1.5:** As Alex, I want to record my max bench press weight for the week so that I can track weekly strength progress.
  - **Acceptance Criteria:** Date field captures the week/date; weight input accepts numbers with unit selection (kg/lbs)

- **US1.6:** As Alex, I want to compare my current max to my previous max so that I can see if I've improved.
  - **Acceptance Criteria:** Display shows current max vs. previous max with percentage change; highlights gains

- **US1.7:** As Alex, I want to log multiple lift types (not just bench press) so that I can track my overall strength progression.
  - **Acceptance Criteria:** Dropdown or input for lift type; system supports bench press, squat, deadlift, and custom lifts

#### Data Analysis

- **US1.8:** As Alex, I want to view my macro logs for the past 30 days in a table so that I can see all my entries at once.
  - **Acceptance Criteria:** Table shows date, meal macros, daily totals; sortable by date or macro type

- **US1.9:** As Alex, I want to see a chart of my protein intake over time so that I can identify trends and patterns.
  - **Acceptance Criteria:** Line or bar chart displays weekly/monthly averages; includes target line for comparison

- **US1.10:** As Alex, I want to correlate my macro intake with strength gains so that I can understand the relationship between nutrition and performance.
  - **Acceptance Criteria:** Combined view shows macro data and corresponding lift maxes on same timeline; includes visual correlation

- **US1.11:** As Alex, I want to export my logs as a CSV file so that I can analyze the data in a spreadsheet.
  - **Acceptance Criteria:** Export button generates downloadable CSV with all logged data; includes date, macros, lifts

---

## Persona 2: Casey – The Busy Parent with Fitness Goals

**Age:** 34  
**Profession:** Full-time employee / Parent  
**Goal:** Eat healthier and get stronger despite a busy schedule

### Bio
Casey is a parent with a full-time job and young kids. They want to eat healthier and get stronger but have limited time. Simplicity and quick access are essential.

### User Stories

#### Quick Logging

- **US2.1:** As Casey, I want a single input field where I can type "eggs, toast, coffee" and have the app auto-fill macros so that I can log breakfast in 30 seconds.
  - **Acceptance Criteria:** Natural language input recognized; system parses items and estimates macros; user can adjust if needed

- **US2.2:** As Casey, I want to use voice input to log my breakfast so that I don't have to stop what I'm doing to type.
  - **Acceptance Criteria:** Microphone button initiates voice recording; transcribes to text and auto-fills macros

- **US2.3:** As Casey, I want to see my today's macro total on the home screen at a glance so that I know if I'm on track without clicking around.
  - **Acceptance Criteria:** Dashboard displays current day's macro totals prominently; shows progress bars toward targets

- **US2.4:** As Casey, I want one-click logging for my go-to breakfasts so that I can log in literally one tap.
  - **Acceptance Criteria:** Quick-add buttons for top 3 breakfast presets; each button logs a complete meal

#### Weight Tracking (Simplified)

- **US2.5:** As Casey, I want a simple weight input form where I just enter a number for my max lift so that I don't need to remember multiple details.
  - **Acceptance Criteria:** Single number input for weight; auto-selects default lift type (e.g., general strength)

- **US2.6:** As Casey, I want to see an emoji or simple icon showing if I improved from last week so that I get quick motivation.
  - **Acceptance Criteria:** Display shows 📈 (gain) or → (same) or 📉 (decline) with number next to it

- **US2.7:** As Casey, I want reminders to log my max weight so that I remember to track my progress.
  - **Acceptance Criteria:** Push notification or in-app reminder on set day (e.g., Friday); dismissible

#### Ease of Use

- **US2.8:** As Casey, I want the app to require minimal setup/configuration so that I can start logging immediately.
  - **Acceptance Criteria:** App launches with functional default settings; no required configuration steps on first load

- **US2.9:** As Casey, I want to access my logs from my phone anywhere so that I can check my progress during my lunch break.
  - **Acceptance Criteria:** App works offline with local storage; syncs when online; responsive mobile design

- **US2.10:** As Casey, I want a simple motivation message or progress summary when I open the app so that I feel encouraged to stay consistent.
  - **Acceptance Criteria:** Dashboard shows weekly summary (total days logged, average macros, progress on lift); includes motivational text

- **US2.11:** As Casey, I want to set daily macro targets easily so that I have a clear goal to aim for each day.
  - **Acceptance Criteria:** Quick settings panel with input fields for daily protein/carbs/fat targets; saved automatically

---

## Summary

**Alex (Competitive Athlete)** - 11 User Stories
- Focus: Precision, data analysis, trend correlation, export capabilities
- 4 stories on macro logging with detail and flexibility
- 3 stories on strength tracking across multiple lifts
- 4 stories on data visualization and insights

**Casey (Busy Parent)** - 11 User Stories
- Focus: Speed, simplicity, motivation, accessibility
- 4 stories on quick/effortless logging (voice, one-click, natural language)
- 3 stories on simplified strength tracking with motivation
- 4 stories on ease of use and mobile accessibility
