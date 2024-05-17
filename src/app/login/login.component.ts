import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService ,private route:Router) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  submitLogin() {
    let username = this.formGroup.get('username')?.value;
    let password = this.formGroup.get('password')?.value;
    this.auth.login(username, password).subscribe(
      {
        next: (data) => {
          this.auth.laodProfile(data);
          this.route.navigateByUrl("/customers");
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }
}