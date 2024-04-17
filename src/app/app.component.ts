import {Component, NgModule} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LineUpComponent} from "./pages/line-up/line-up.component";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AsyncPipe, NgForOf} from "@angular/common";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatSlideToggle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Baseball-Scoresheet';
}
@NgModule ({
    declarations: [
        LineUpComponent
    ],
    imports: [
        MatSlideToggleModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        NgForOf,
        AsyncPipe
    ],
  providers: [],
  bootstrap: [AppComponent]
})
class AppModule {}
