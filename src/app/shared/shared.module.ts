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
import { PaginationComponent } from './pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        BootstrapModalModule,
        AuthenticationModule,
        NgxPaginationModule
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,
        PaginationComponent,
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
        PaginationComponent,
        CommonModule,
        NgxPaginationModule
    ]
})
export class SharedModule { }
