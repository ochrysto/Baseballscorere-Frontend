You are Senior JavaScript Angular Developer that know how to build robust and reusable frontend applications with Angular V17.
You know all best practices and write clean, well-documented code with SOLID, DRY and KISS principles in mind.
You are super designer and UI/UX expert.

line-up.component.html
```html
<div class="line-up-container">
  <h1>LINE UP</h1>
  <div class="container border">
    <div class="teams-header">
      <div class="tabs">
        <button class="tab" [ngClass]="{'active': activeTab === 'HEIM'}" (click)="switchTab('HEIM')">HEIM</button>
        <button class="tab" [ngClass]="{'active': activeTab === 'GAST'}" (click)="switchTab('GAST')">GAST</button>
      </div>
      <div [ngClass]="{'team_heim': true, 'active': activeTab === 'HEIM'}">
        <div [class.hidden]="activeTab !== 'HEIM'" id="HEIM" class="team home">
          <p>Bremen Dockers</p>
          <form [formGroup]="lineUpForm" (ngSubmit)="onSubmit()">
            <div formArrayName="homeLineUp" class="line-up-table">
              <table>
                <tr>
                  <th>Nr.</th>
                  <th>Name</th>
                  <th>Passnummer</th>
                  <th>Position</th>
                </tr>
                <tr *ngFor="let player of homeLineUp.controls; let i = index" [formGroupName]="i">
                  <td>{{ i + 1 }}</td>
                  <td>
                    <select formControlName="playerId">
                      <option *ngFor="let player of homePlayers" [value]="player.id">{{ player.firstName }}</option>
                    </select>
                  </td>
                  <td>
                    <input type="number" placeholder="Passnummer" formControlName="passNumber">
                  </td>
                  <td>
                    <select formControlName="position">
                      <option value="" disabled hidden selected>Wählen...</option>
                      <option *ngFor="let position of positions" [value]="position.id">{{ position.description }}</option>
                    </select>
                  </td>
                </tr>
              </table>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div [ngClass]="{'team_away': true, 'active': activeTab === 'GAST'}">
        <div [class.hidden]="activeTab !== 'GAST'" id="GAST" class="team away">
          <p>Braunschweig 89ers</p>
          <form [formGroup]="lineUpForm" (ngSubmit)="onSubmit()">
            <div formArrayName="awayLineUp" class="line-up-table">
              <table>
                <tr>
                  <th>Nr.</th>
                  <th>Name</th>
                  <th>Passnummer</th>
                  <th>Position</th>
                </tr>
                <tr *ngFor="let player of awayLineUp.controls; let i = index" [formGroupName]="i">
                  <td>{{ i + 1 }}</td>
                  <td>
                    <select formControlName="playerId">
                      <option *ngFor="let player of awayPlayers" [value]="player.id">{{ player.firstName }}</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" placeholder="Passnummer" formControlName="passNumber">
                  </td>
                  <td>
                    <select formControlName="position">
                      <option value="" disabled hidden selected>Wählen...</option>
                      <option *ngFor="let position of positions" [value]="position.id">{{ position.description }}</option>
                    </select>
                  </td>
                </tr>
              </table>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

```

line-up.component.css
```css
.line-up-container {
  height: 100vh;
  background-color: #B4FF00;
  background-image: url("Plateconference.png");
  background-repeat: no-repeat;
}

.container {
  background-color: black;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
  border: 5px solid black;
}

.line-up-container h1 {
  text-align: center;
  font-family: Kanit, sans-serif;
  font-weight: 800;
  color: var(--actiongreen);
  padding: 30px;
  font-size: 70px;
}

.teams-header {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  border-bottom: 5px solid black;
}

.tab {
  flex: 1;
  padding: 10px;
  font-size: 24px;
  background-color: black;
  color: var(--actiongreen);
  border: none;
  cursor: pointer;
  outline: none;
}

.tab.active {
  border-bottom: 5px solid black;
  background-color: var(--actiongreen);
  color: black;
}

.team_heim .team p,
.team_away .team p {
  color: black;
}

.line-up-table {
  background-color: black;
  color: white;
  width: 100%;
}

.team_heim .line-up-table td,
.team_away .line-up-table td {
  padding: 10px;
  border: 1px solid white;
}

.line-up-table input,
.line-up-table select {
  border: none;
}

.hidden {
  display: none;
}

.team_heim .line-up-table input,
.team_heim .line-up-table select,
.team_heim button {
  background-color: #85D4FE;
}

.team_away .line-up-table input,
.team_away .line-up-table select,
.team_away button {
  background-color: var(--visitoryellow);
}

.team_heim.active {
  background-color: #85D4FE;
}

.team_away.active {
  background-color: var(--visitoryellow);
}

.team_heim.active p,
.team_away.active p {
  color: black;
}
```

here is design like text, so you can understand what I want to see:
```txt
                                  _________________________________
            HEIM                 |              GAST               |
        Bremen Dockers           |           Braunschweig          |
_________________________________|                                 |
|    Nr  Name                         Passnumber       Position    |
|    __ _____________________________ ________________ _________   |
| 1 |__|____________________________^|________________|________^|  |
| 2 |__|____________________________^|________________|________^|  |
| 3 |__|____________________________^|________________|________^|  |
| 4 |__|____________________________^|________________|________^|  |
| 5 |__|____________________________^|________________|________^|  |
| 6 |__|____________________________^|________________|________^|  |
|__________________________________________________________________|
```

Tasks:
1. Make input fields so big so that they take all horizontal place.
2. Make input fields bigger vertically.
3. Remove white border around each field so we se only input fields.
4. GAST and HEIM buttons should look like tabs with the same colour as background (black)
5. Make this line up form better! I want to see something hi-end!
