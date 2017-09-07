import { LogoutComponent } from './authentication/logout/logout.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        BootstrapModalModule,
        AuthenticationModule,
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,
    ],
    entryComponents: [
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
        CommonModule,
    ]
})
export class SharedModule { }
