import { Router } from '@angular/router';
import { CookieService } from './../../core/cookie/cookie.service';
import { NotificatorService } from './../../core/notificator/notificator.service';
import { LoginComponent } from './../../shared/authentication/login/login.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { PizzaDataService } from './../pizza-data/pizza-data.service';
import { UserInfoService } from './../../core/user-info/user-info.service';
import { AlerterService } from './../../core/alerter/alerter.service';
import { Pizza } from './../../models/Pizza';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-pizza-details',
    templateUrl: './pizza-details.component.html',
    styleUrls: ['./pizza-details.component.css']
})
export class PizzaDetailsComponent implements OnInit {
    @Input()
    public pizza = new Pizza();

    constructor(
        private readonly alerter: AlerterService,
        private readonly userInfoService: UserInfoService,
        private readonly pizzaDataService: PizzaDataService,
        private readonly dialogService: DialogService,
        private readonly notificator: NotificatorService,
        private readonly cookieService: CookieService,
        private readonly router: Router

    ) { }

    ngOnInit() {
    }

    orderPizza() {
        this.alerter
            .showAddOrderSuggestion(this.pizza._id, this.pizza.name, this.pizza.imgUrl)
            .then(() => {
                if (this.userInfoService.isLoggedUser()) {
                    const token = this.cookieService.getCookie('token');

                    this.pizzaDataService.addPizzaToUserCart(this.pizza, token).subscribe(
                        (response) => {
                            const items = +this.cookieService.getCookie('cartItems');
                            const price = +this.cookieService.getCookie('cartPrice');

                            this.cookieService.setCookie('cartItems', (items + 1).toString());
                            this.cookieService.setCookie('cartPrice', (price + this.pizza.price).toString());

                            this.alerter.showSuccessAlert('Added!', response['message']);
                            // this.notificator.showSuccess(response['message']);
                        },
                        (err) => this.notificator.showError(err.error.message));
                } else {
                    this.notificator.showError('You have to be logged!');
                    this.showLoginModal();
                }
            })
            .catch(() => this.alerter.showErrorAlert('Cancelled', 'Eh, maybe next time :)'));
    }

    showLoginModal() {
        this.dialogService.addDialog(LoginComponent, { title: 'Log in' });
    }
}
