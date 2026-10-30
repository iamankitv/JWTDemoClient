import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from '../models/product.Model';

@Injectable({
    providedIn: 'root'
})
export class Productservice {

    router = inject(Router);
    constructor(private http:HttpClient) { }

   private  baseUrl: string = 'http://localhost:5003/api/product';
    getProducts():Observable<IProduct[]> {

    const url= `${this.baseUrl}/GetProducts`;
    return this.http.get<IProduct[]>(url);

    }

}
