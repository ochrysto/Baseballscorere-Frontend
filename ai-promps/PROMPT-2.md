You are Senior JavaScript Angular Developer that know how to build robust and reusable frontend applications with Angular V17.
You know all best practices and write clean, well-documented code with SOLID, DRY and KISS principles in mind.

game-create.html:
```html
<div class="container">
  <header>
    <nav>
      <button>Neues Team anlegen</button>
      <button>Team bearbeiten</button>
      <button>LogOut</button>
    </nav>
  </header>
  <main>
    <h1>SPIEL ANLEGEN</h1>
    <div class="form-container">
      <form [formGroup]="gameForm" (ngSubmit)="createGame()">
        <div class="form-row">
          <p>Spielnummer</p>
          <input type="number" formControlName="gameNr" [ngClass]="{'is-invalid': getFieldError('gameNr')}">
          <div *ngIf="getFieldError('gameNr')" class="invalid-feedback">Spielnummer is required.</div>

          <p class="right">Datum</p>
          <input type="date" formControlName="date" [ngClass]="{'is-invalid': getFieldError('date')}">
          <div *ngIf="getFieldError('date')" class="invalid-feedback">Datum is required.</div>

          <p>Ort</p>
          <input type="text" formControlName="location" [ngClass]="{'is-invalid': getFieldError('location')}">
          <div *ngIf="getFieldError('location')" class="invalid-feedback">Ort is required.</div>

          <!-- Inning number input-->
          <p class="Innings">Innings</p>
          <input type="number" min="5" max="35" formControlName="innings" [ngClass]="{'is-invalid': getFieldError('innings')}">
          <div *ngIf="getFieldError('innings')" class="invalid-feedback">Innings must be between 1 and 35.</div>

          <!-- Association select box-->
          <p>Verband</p>
          <select formControlName="associationId" required [ngClass]="{'is-invalid': getFieldError('associationId')}">
            @if (associations.length > 0) {
            <option value="" disabled selected hidden>Verband</option>
            }
            @for (association of associations; track association) {
            <option [value]="association.id">{{ association.name }}</option>
            } @empty {
            <option value="" disabled selected hidden>No associations found</option>
            }
          </select>
          <div *ngIf="getFieldError('associationId')" class="invalid-feedback">Verband is required.</div>

          <!-- League select box-->
          <p class="Liga">Liga</p>
          <select formControlName="leagueId" required [ngClass]="{'is-invalid': getFieldError('leagueId')}">
            @if (leagues.length > 0) {
            <option value="" disabled selected hidden>Liga</option>
            }
            @for (league of leagues; track league) {
            <option [value]="league.id">{{ league.name }}</option>
            } @empty {
            <option value="" disabled selected hidden>No leagues found</option>
            }
          </select>
          <div *ngIf="getFieldError('leagueId')" class="invalid-feedback">Liga is required.</div>
        </div>

        <div class="team-section">
          <div class="team">
            <select formControlName="hostTeamId" required [ngClass]="{'is-invalid': getFieldError('hostTeamId')}">
              @if (teams.length > 0) {
              <option value="" disabled selected hidden>Heimmannschaft</option>
              }
              @for (team of teams; track team) {
              <option [value]="team.teamId">{{ team.name }}</option>
              } @empty {
              <option value="" disabled selected hidden>No teams found</option>
              }
            </select>
            <div *ngIf="getFieldError('hostTeamId')" class="invalid-feedback">Heimmannschaft is required.</div>
          </div>

          <div class="vs">VS</div>

          <div class="team">
            <select formControlName="guestTeamId" required [ngClass]="{'is-invalid': getFieldError('guestTeamId')}">
              @if (teams.length > 0) {
              <option value="" disabled selected hidden>Gastmannschaft</option>
              }
              @for (team of teams; track team) {
              <option [value]="team.teamId">{{ team.name }}</option>
              } @empty {
              <option value="" disabled selected hidden>No teams found</option>
              }
            </select>
            <div *ngIf="getFieldError('guestTeamId')" class="invalid-feedback">Gastmannschaft is required.</div>
          </div>
        </div>

        <div class="officials-row">
          <div class="official">
            <div class="umpire-header">Headumpire</div>
            <label>Name</label>
            <select formControlName="umpireIdsList">
              <option></option>
            </select>
            <label>Nummer</label>
            <input type="text">
          </div>
          <div class="official">
            <div class="plateumpire-header">Plateumpire</div>
            <label>Name</label>
            <select formControlName="umpireIdsList">
              @if (umpires.length > 0) {
              <option value="" disabled selected hidden>Umpire</option>
              }
              @for (umpire of umpires; track umpire) {
              <option [value]="umpire.umpireId">{{ umpire.name }}</option>
              } @empty {
              <option value="" disabled selected hidden>No umpires found</option>
              }
            </select>
            <label>Nummer</label>
            <input type="text">
          </div>
          <div class="official">
            <div class="scorer-header">Scorer</div>
            <label>Name</label>
            <select formControlName="scorerId">
              @if (scorers.length > 0) {
              <option value="" disabled selected hidden>Scorer</option>
              }
              @for (scorer of scorers; track scorer) {
              <option [value]="scorer.scorerId">{{ scorer.name }}</option>
              } @empty {
              <option value="" disabled selected hidden>No scorer found</option>
              }
            </select>
            <label>Nummer</label>
            <input type="text">
          </div>
        </div>

        <button type="submit" class="weiter-btn">Weiter</button>
      </form>
    </div>
  </main>
</div>
```

game-create.css:
```css
.container {
  background: #b4ff00 url("stadium.png");
  background-size: cover;
  color: #ffffff;
  height: 100vh;
}
nav {
  text-align: right;
  padding: 20px;
}
nav button {
  border: none;
  background-color: #b4ff00;
  color: #9fa89a;
  font-family: Kanit, sans-serif;
  font-weight: 800;
  cursor: pointer;
  padding: 10px 30px;
}
nav button:hover {
  background-color: #1c1e1a;
  border-radius: 30px;
}
h1 {
  text-align: center;
  color: #9fa89a;
  font-family: Kanit, sans-serif;
  font-weight: 800;
  font-size: 50px;
  padding-bottom: 20px;
}
.form-container {
  background-color: black;
  padding: 20px;
  border-radius: 5px;
  max-width: 800px; /* Adjust based on actual width */
  margin: 0 auto;
}

.form-row {
  margin-bottom: 10px;
}

.team-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 15px;
}

.vs {
  font-size: 34px;
  margin: 0 15px;
}
.weiter-btn {
  border: none;
  border-radius: 15px;
  background-color: #b4ff00;
  font-family: Kanit, sans-serif;
  font-weight: 800;
  cursor: pointer;
  margin: 10px;
  color: #111110;
  display: block;
  font-size: 15px;
  right: 120px;
  padding: 10px 30px;
  position: absolute;
  bottom: 60px;
}
input[type="text"],
input[type="number"],
input[type="date"],
select {
  color: #78cf4c;
  margin-bottom: 15px;
  font-size: 16px;
  width: 30%;
  padding-bottom: 5px;
}
.team-section th,
.team-section td {
  background-color: #ffff9f;
}
.form-row {
  padding-right: 150px;
  width: 100%;
}
p {
  margin: 10px;
  color: #78cf4c;
  display: inline-block;
  padding-right: 10px;
  font-size: 20px;
}
.right {
  padding-left: 10px;
}
.Innings {
  padding-left: 9px;
}
.Liga {
  padding-left: 20px;
}
.team select {
  width: 100%;
  padding-right: 100px;
  text-align: center;
  font-size: 25px;
  color: #9fa89a;
}
.umpire-header,
.plateumpire-header,
.scorer-header {
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 5px;
  margin: 5px;
  color: #9fa89a;
}
.umpire-header::before,
.umpire-header::after,
.plateumpire-header::before,
.plateumpire-header::after,
.scorer-header::before,
.scorer-header::after {
  content: "";
  flex-grow: 1;
  height: 2px;
  background: #9fa89a;
  margin: 0 10px;
}
.official {
}
.team select input {
  background-color: #78cf4c;
  color: #78cf4c;
}
label {
  font-size: 15px;
  color: #b4ff00;
  padding-right: 30px;
  margin-left: 20px;
}

.is-invalid {
  border: 1px solid red;
}

.invalid-feedback {
  color: red;
  font-size: 0.9em;
}
```

styles.css:
```css
:root {
  --bg-gradient: linear-gradient(#b4ff00, #97d600);
  --actiongreen: #b6ff07;
  --visitoryellow: #ffff9f;
  --homeblue: #85d4fe;
  --darkgray: #707070;
  --lightgray: #9fa89a;
  --card-darkgray: #111110;
  --card-darkbrown: #1C1E1A;
  --card-lightbrown: #20251d;
}


html, body {
  height: 100%;
}
body {
  margin: 0;
  font-family: Kanit, sans-serif;
  background-image: var(--bg-gradient);
  overflow: hidden;
}
```

The input form is very bad designed and must be refactored and optimized.

Task:
1. `Spielnummer`, `Ort` and `Verband` input fields and info about invalid data should be to the left (50% of the space)
2. `Datum`, `Innings` and `Liga` input fields and info about invalid data should be to the right (50% of the space)
3. Invalid field should light with red light and be beautiful
4. Make the form responsive for different device types (e.g. for smartphones we should see no 2 columns with input fields but one column instead)




Super!
New tasks:
1. `Headumpire`, `Plateumpire` and `Scorer` should be to the left and each of this should have one `Nummer` input field to the right respectively.  
2. `Heimmannschaft` and `Gastmannschaft` fields should be much bigger that other because they are important
3. `Weiter` button should be left
4. Add some space between two columns
5. Make site scrollable when we have mobile view (one column)

New task:
1. You missunderstood how i want to see `Headumpire`, `Plateumpire` and `Scorer` with `Nummer` inputs:
I want to see something like this:
```txt
-------- Headempire  --------
Name |input|   Number |input|
-------- Plateumpire --------
Name |input|   Number |input|
--------   Scorer    --------
Name |input|   Number |input|
```
2. `Heimmannschaft` and `Gastmannschaft` should take 30% of space, also much bigger!
3. Add fixed space for `invalid-feedback` text boxes so that when they appear the input fields does not move
