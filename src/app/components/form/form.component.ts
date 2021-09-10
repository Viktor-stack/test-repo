import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import validate = WebAssembly.validate;
import {Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]+$')]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?!.*([A-Za-z0-9])\1{1})(?=.*[a-z])(?=.*\d)[A-Za-z0-9]+$/)]],
      confirmPassword: [null, [Validators.required]],
      conditions: [false, [Validators.required, Validators.pattern('true')]]
    }, {validators: this.checkPasswords})
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true}
  }


  formSubmit() {
    this.form.disable()
    debugger
    this.aSub = this.auth.register(this.form.value).subscribe(
      (result) => {
        console.log(result)
        this.router.navigate(['/dashboard'])
      },
      error => {
        console.log(error)
        this.form.enable()
      }
    )
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
}
