import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  regForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthServiceService) {}

  ngOnInit(): void {
    // this.regForm = this.fb.group({
    //   name: ['', [Validators.required]],
    //   lname: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    //   confirmPassword: ['', [Validators.required]],
    //   agreeTerms: [false, [Validators.requiredTrue]]
    // }, {
    //   validators: this.passwordMatchValidation
    // });
    this.regForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      
    }),{
      validators: this.passwordMatchValidation
    }

  }

  passwordMatchValidation(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  get PasswordMismatch() {
    return this.regForm.get('confirmPassword')?.errors?.['passwordMismatch'];
  }

  submit() {
    this.submitted = true;
     console.log(this.regForm.value)

    if (this.regForm.valid) {
      const registrationData = {
        firstname: this.regForm.value.name,
        //lastname: this.regForm.value.lname,
        email: this.regForm.value.email,
        password: this.regForm.value.password,
        role: "USER"
      };

      this.authService.register(registrationData).subscribe(res => {
        if (res.token !== null) {

          setTimeout(() => {
            window.location.href = '/sign-in';
          }, 2000)
        } else {
          // Handle registration error
        }
      });
    }
  }
}
