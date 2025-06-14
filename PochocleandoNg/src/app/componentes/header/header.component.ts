import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule], // si no lo importo, no sabe a dónde ir!!!
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  usuario: any = null;

  constructor(private loginService: LoginService){
  }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe((data) => {
      this.usuario = data?.usuario || null;
    });
  }

}
