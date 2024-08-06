import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginMsg: any;
  loginSuccess: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      check: [false]
    });
  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(res => {
        if (res.status === "OK") {
          Swal.fire({
            title: "Signed in successfully!!!",
            text: res.message,
            icon: "success",
            customClass: {
              confirmButton: 'custom-ok-button'
            }
          });
          this.loginSuccess = true;
          this.loginMsg = "Signed in successfully!!!";
          localStorage.setItem('token', res.token);
          console.log("success");

          setTimeout(() => {
            window.location.href = '/sign-up'
          }, 2000)
        }
  }, error => {
    // Handle observable error (e.g., network issue, server error)
    this.loginMsg = "Login failed";
    this.loginSuccess = false;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password or email incorrect!",
      customClass: {
        confirmButton: 'custom-ok-button'
      }
    });
  });
}
  }
}
