import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FIELD, FormComponent} from '../form/form.component';
import {Subscription} from 'rxjs';
import {Validators} from '@angular/forms';
import {ValidatorEmail} from '../../validators/validator-email';


@Component({
  selector: 'app-email-block',
  templateUrl: './email-block.component.html',
  styleUrls: ['./email-block.component.scss']
})
export class EmailBlockComponent extends FormComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public fields: FIELD[] = [
    {
      name: 'email',
      validation: [ValidatorEmail, Validators.maxLength(100),
      ],
      errors: {
        emailValidator: 'Укажите корректный Email',
        maxLength: 'Разрешено вводить не больше 100 символов',
      },
    }
  ];

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }


  public saveEmail(): string {
    this.submit();
    if (this.form.valid) {
      return this.form.controls.email.value;
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
