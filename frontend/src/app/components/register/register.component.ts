import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.status === 409
          ? 'Este correo ya está registrado.'
          : 'Error al registrar. Por favor intenta de nuevo.';
      }
    });
  }
}

