import { Cart } from './../../../models/Cart';
import { NotificatorService } from './../../../core/notificator/notificator.service';
import { UserAuthService } from './../user-auth/user-auth.service';
import { User } from './../../../models/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';


export interface RegisterModal {
    title: string;
}
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent extends DialogComponent<RegisterModal, null> implements OnInit, RegisterModal {
    public user: User;
    title: string;
    constructor(
        dialogService: DialogService,
        private readonly userAuth: UserAuthService,
        private readonly notificator: NotificatorService,
        private readonly router: Router) {
        super(dialogService);
    }

    ngOnInit() {
        this.user = new User();

        this.user.cart = new Cart();
        this.user.cart.pizza = [];
        this.user.cart.customPizza = [];
        this.user.cart.price = 0;

        this.user.orders = [];
    }

    registerUser() {
        this.userAuth.registerUser(this.user).subscribe(
            (response) => this.notificator.showSuccess(response['message']),
            (err) => this.notificator.showError(err.error.message),
            () => this.close());
    }

    create(data: User) {
        console.log(data);
    }
}
