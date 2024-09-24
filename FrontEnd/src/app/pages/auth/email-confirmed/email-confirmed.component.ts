import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.component.html',
  styleUrl: './email-confirmed.component.scss'
})
export class EmailConfirmedComponent implements OnInit {
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authSrv: AuthService,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');

    if (this.token) {
      this.authSrv.confirmEmail(this.token).subscribe({
        next: (response) => {
          console.log('Email confermata con successo!', response);
        },
        error: (error) => {
          console.error('Errore nella conferma della email:', error);
        }
      });
    }
  }

}
