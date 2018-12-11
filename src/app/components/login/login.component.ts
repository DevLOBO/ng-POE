import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


import { FirebaseService } from '../../services/firebase.service';

import { User } from '../../models/user';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	hide = true;
	formLogin: FormGroup;

	constructor(
		private fb: FormBuilder,
		private firebase: FirebaseService,
		private router: Router
	) {
		this.formLogin = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			type: ['', Validators.required]
		});
	}
	login() {
		this.firebase.loginUser(this.formLogin.value).subscribe(us => {
			if (us) {
	        localStorage.setItem('uid', us.id);
	        localStorage.setItem('type', us.type);
	        localStorage.setItem('name', us.username);
	        if (us.type === 'A') {
	          this.router.navigate(['/admin']);
	        } else if (us.type === 'U') {
	          this.router.navigate(['/departaments']);
	        } else {
	          localStorage.clear();
	          this.router.navigate(['/']);
	        }
	      } else {
	        this.router.navigate(['/register']);
	      }
		});
	}
}