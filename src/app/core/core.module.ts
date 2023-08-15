import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { RouterModule } from '@angular/router';

// Components
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { MailComponent } from './components/mail/mail.component';
import { LoadingComponent } from './components/mat-dialogs/loading/loading.component';
import { InfoSpamHamComponent } from './components/info-spam-ham/info-spam-ham.component';



@NgModule({
    declarations: [
        MenuComponent,
        HeaderComponent,
        MailComponent,
        LoadingComponent,
        InfoSpamHamComponent

    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        MenuComponent,
        HeaderComponent,
        MailComponent,
        InfoSpamHamComponent
        
    ],

})
export class CoreModule { }
