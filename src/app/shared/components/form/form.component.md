# Form - компонент 

Компонент предназначен для валидации форм и инпутов.
Используется путём наследования компонента.

В реализации компонента нужно прописать публичное поле filed: FIELD[];
В нем указываются контроллы, валидации и ошибки к ним.

Так же в компоненте можно работать с FormControl. К нему можно обратиться через this.form.

При submit нужно вызывать super.submit() для того, чтобы проверить контролы и форму на ошибки. И после этого
можно получать и обрабатывать данные с формы.

Для программного установления ошибок можно вызвать метод this.setFieldError(key, error);

key - имя поля.
error - название ошибки валидатора.

В шаблоне нужно указать элемент формы. Пример:
```html 
<form [formGroup]="form" novalidate (ngSubmit)='submit()'>
```

В инпуты нужно передать контроллы формы чтобы можно было их связать с формой. Пример:
```html 
<app-input [formControlInput]='form.controls.name' [errorMessage]='errorMessages.name' label='Name'></app-input>
```

Значения ошибок можно получить через объект errorMessage[<name>].




Пример использования:

```ts
    export class FormStoryComponent extends FormComponent implements AfterViewInit {

  public fields: FIELD[] = [
    { name: 'name', validation: [Validators.required, Validators.maxLength(5)], 
    errors: { required: 'Required error', maxlength: 'Max length error' } },
    { name: 'phone', validation: [Validators.required], 
    errors: { required: 'Required error'} },
  ];

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {

  }

  public submit(): void {
    super.submit();

    if (this.form.valid) console.log(this.form.value)
  }
}
```

```html 
<form style='margin-top: 100px; max-width: 400px; margin-left: 20px;' class="form" [formGroup]="form" novalidate (ngSubmit)='submit()'>
    <app-input [formControlInput]='form.controls.name' [errorMessage]='errorMessages.name' label='Name'></app-input>
    <app-input style="margin: 20px" [formControlInput]='form.controls.phone' appMaskPhone typeInput="tel" label="Введите номер телефона" typeInput="tel" [errorMessage]='errorMessages.phone'></app-input>

    <button style='margin-top: 20px;' class="btn-primary" type='submit'>Submit</button>
  </form>

```
