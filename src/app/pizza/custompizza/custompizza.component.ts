import { CookieService } from './../../core/cookie/cookie.service';
import { PizzaDataService } from './../pizza-data/pizza-data.service';
import { CustomPizza } from './../../models/CustomPizza';
import { Component, OnInit } from '@angular/core';
import { Pizza } from '../../models/Pizza';
import { NotificatorService } from '../../core/notificator/notificator.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Router } from '@angular/router';
import { UserInfoService } from '../../core/user-info/user-info.service';
import { LoginComponent } from '../../shared/authentication/login/login.component';

@Component({
    selector: 'app-custompizza',
    templateUrl: './custompizza.component.html',
    styleUrls: ['./custompizza.component.css']
})
export class CustompizzaComponent implements OnInit {
    isLoggedUser: boolean;
    public custompizza: CustomPizza = new CustomPizza();
    public selectedPizza: CustomPizza = new CustomPizza();

    constructor(
        private readonly userInfo: UserInfoService,
        private readonly cookieService: CookieService,
        private readonly dialogService: DialogService,
        private readonly notificator: NotificatorService,
        private readonly pizzaDataService: PizzaDataService,
        private readonly router: Router) {
    }

    ngOnInit() {
        this.custompizza.price = 0;

        this.pizzaDataService.getProducts()
            .subscribe(response => {
                response['data'][0]
                    .forEach(product => {
                        ['dough', 'meat', 'sauce', 'cheese', 'vegetables']
                            .forEach(type => {
                                if (product[type]) {
                                    this.custompizza[type] = product[type];
                                }
                            });
                    });
            },
            (err) => this.notificator.showError(err.error.message));
    }

    add(el) {
        const type = el.target.parentElement.parentElement.parentElement.attributes.ngmodelgroup.nodeValue;
        const productId = el.target.attributes.id.nodeValue;
        const element = this.findObjectByKey(this.custompizza[type], 'id', productId);

        if (type === 'dough') {
            this.custompizza.dough.forEach(dough => {
                if (dough.add) {
                    dough.add = false;
                    this.custompizza.price -= 2;
                }
            });
        }

        element.add = el.target.checked;

        if (element.add) {
            this.custompizza.price += element.price;
        } else {
            this.custompizza.price -= element.price;
        }
    }

    addToCart() {
        this.isLoggedUser = this.userInfo.isLoggedUser();

        if (!this.isLoggedUser) {
            this.notificator.showError('You have to be logged!');
            this.showLoginModal();
            return;
        }

        let isDoughSelected = false;
        this.custompizza.dough.forEach(element => {
            if (element.add) {
                isDoughSelected = true;
            }
        });

        if (!isDoughSelected) {
            this.notificator.showError('You have to select dought first!');
            return;
        }

        this.selectedPizza.price = this.custompizza.price;
        ['dough', 'meat', 'sauce', 'cheese', 'vegetables']
            .forEach(type => {
                this.custompizza[type].forEach(added => {
                    if (added.add) {
                        if (!this.selectedPizza[type]) {
                            this.selectedPizza[type] = [];
                        }

                        this.selectedPizza[type].push(added);
                    }
                });
            });

        const token = this.cookieService.getCookie('token');

        this.pizzaDataService
            .addCustomPizzaToUserCart(this.selectedPizza, token).subscribe(
            (response) => {
                const items = +this.cookieService.getCookie('cartItems');
                const price = +this.cookieService.getCookie('cartPrice');

                this.cookieService.setCookie('cartItems', (items + 1).toString());
                this.cookieService.setCookie('cartPrice', (price + this.selectedPizza.price).toString());

                this.notificator.showSuccess(response['message']);
            },
            (err) => this.notificator.showError(err.error.message));
    }

    findObjectByKey(array, key, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    }

    showLoginModal() {
        this.dialogService.addDialog(LoginComponent, { title: 'Log in' });
    }
}
