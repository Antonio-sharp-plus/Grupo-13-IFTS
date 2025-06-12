import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink], // si no lo importo, no sabe a dónde ir!!!
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLoggedIn = false;
  currentUser: any = null;
  private subscription = new Subscription;

  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    this.subscription.add(
      this.loginService.getCurrentUser().subscribe(respuesta => {
        console.log("Header detectó un cambio:", respuesta)

        this.isLoggedIn = !!respuesta;
        this.currentUser = respuesta;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
