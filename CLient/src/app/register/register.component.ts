import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  model: any = {};
  cancelRegister = output<boolean>();
  private accountsService = inject(AccountsService);

  register() {
    console.log(this.model);
    
    this.accountsService.register(this.model).subscribe({
      next: (response) => {
        console.log('Registration successful.', response);
        this.cancel();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
