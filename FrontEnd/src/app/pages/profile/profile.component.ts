import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../../services/bank-account.service';
import { BankAccountEntity } from '../../interfaces/bank-account.entity';
import { User } from '../../interfaces/user.entity';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  transferForm: FormGroup;
  errorMessage: string | undefined;
  user: User | null = null;

  constructor(private formBuilder: FormBuilder, private bankAccountService: BankAccountService, private authSrv: AuthService) {
    this.transferForm = this.formBuilder.group({
      id: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      cognomeTitolare: ['', Validators.required],
      nomeTitolare: ['', Validators.required],
      dataApertura: ['', Validators.required],
      IBAN: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.getProfileData();
    this.authSrv.currentUser$.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  getProfileData() {
    this.bankAccountService.getBankAccountInfo().subscribe(
      (data: BankAccountEntity) => {
        this.transferForm.patchValue({
          id: data.id,
          username: data.username,
          cognomeTitolare: data.cognomeTitolare,
          nomeTitolare: data.nomeTitolare,
          dataApertura: data.dataApertura ? this.formatDateToInput(new Date(data.dataApertura)) : '',  // Formattiamo la data
          IBAN: data.IBAN,
        });
        this.transferForm.disable();
      },
      (error: any) => {
        this.errorMessage = 'Errore nel recupero dei dati del profilo. Riprova più tardi.';
        console.error('Error fetching profile data:', error);
      }

    );
  }

  formatDateToInput(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  submitTransfer() {
    if (this.transferForm.valid) {
      console.log('Form Submitted', this.transferForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
