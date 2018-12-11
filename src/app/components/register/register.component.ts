import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent {
	hide = true;
	formLogin: FormGroup;

	constructor(
		private fb: FormBuilder,
		private firebase: FirebaseService,
		private router: Router
	) {
		this.formLogin = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}
	register() {
		this.firebase.signUpUser(this.formLogin.value).then(() => this.router.navigate(['/departaments']));
	}
}