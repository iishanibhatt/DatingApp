import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Dating App!';
  users: any
  http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next : response => this.users = response,
      error: error => console.log(error),
      complete : () =>  console.log("Request Completed")
    })
  }
}
