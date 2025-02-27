import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,FormsModule, BsDropdownModule, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  
  accountService = inject(AccountsService);
  private route = inject(Router);
  private toastr = inject(ToastrService);
  model: any = {};
  
  ngOnInit(): void {
}
  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
this.route.navigateByUrl('/members')
      },
      error: (error) => this.toastr.error(error.error)
    });
  }
  logout() {
    this.accountService.logout();
    this.route.navigateByUrl('/')

  }
  
}
