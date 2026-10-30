import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../../services/authservice';
import { Productservice } from '../../services/productservice';
import { IProduct } from '../../models/product.Model';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {


  router = inject(Router);
  auth = inject(Authservice);
  product = inject(Productservice);

  products = signal<IProduct[]>([]);
  isDataAvailable = signal(false);
  showProducts = signal(false);

  ngOnInit() {
    // Check if the user is logged in by checking for the access token in local storage
    // If the access token does not exist, navigate to the login page
    const accessToken = localStorage.getItem('access_token');
    // alert('Access Token: ' + accessToken);
    if (!accessToken) {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    // Clear the access token and refresh token from local storage
    // Navigate the user back to the login page
    this.auth.removeToken();
    this.router.navigateByUrl('/login');
  }
  toggleProducts() {
    this.showProducts.update(value => !value);
  }

  fetchProducts() {

    this.product.getProducts().subscribe({
      next: (res: IProduct[]) => {
        this.isDataAvailable.set(true);
        this.products.set(res);
        //this.products = res;

      },
      error: (err: any) => {
        console.error('Failed to fetch products', err);
      }
    })
  }
}
