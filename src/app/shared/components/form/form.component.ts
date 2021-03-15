import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';

export interface FIELD {
    name: string;
    controls?: FIELD[];
    updateOn?: 'blur' | 'change' | 'submit';
    defaultValue?: object | string | number | boolean;
    validation?: ValidatorFn[];
    errors?: {};
}

interface IControlData {
    control: FormControl;
    errors: any;
    errorMessages: { [key: string]: any };
    formGroup: FormGroup;
    controlName: string;
}

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {

    public form: FormGroup;
    public fields: FIELD[] = [];
    public globalErrors: { [key: string]: string } = {};
    public errorMessages: { [key: string]: any } = {};
    public errors: { [key: string]: any } = {};
    private textError: string;

    constructor() {
    }

    ngOnInit() {
        this.form = new FormGroup({});

        this.fields.forEach((item) => {
            this.setupControls(item, this.form, this.errors, this.errorMessages);
        });

        this.form.valueChanges.subscribe(() => {
            this.checkForms(this.form, this.errors, this.errorMessages);
        });
    }

    private setupControls(_control: FIELD, _parent: FormGroup, errors: any, errorMessages: any) {
        if (_control.controls) {
            _parent.addControl(_control.name, new FormGroup({}, {updateOn: _control.updateOn || 'change'}));

            errors[_control.name] = {};
            errorMessages[_control.name] = {};

            return _control.controls.forEach(item => {
                this.setupControls(item, _parent.controls[_control.name] as FormGroup, errors[_control.name], errorMessages[_control.name]);
            });
        }

        _parent.addControl(_control.name, new FormControl(_control.defaultValue || '', {
            updateOn: _control.updateOn || 'change',
            validators: _control.validation
        }));
        errors[_control.name] = _control.errors;
        errorMessages[_control.name] = '';
    }

    addFormControl(control: FIELD, _formGroup?: FormGroup, _errors?: any, _errorMessages?: any): void {
        const formGroup = _formGroup || this.form;
        const errors = _errors || this.errors;
        const errorMessages = _errorMessages || this.errorMessages;

        formGroup.addControl(control.name, new FormControl(control.defaultValue || '', {
            updateOn: control.updateOn || 'change',
            validators: control.validation
        }));

        errors[control.name] = control.errors;
        errorMessages[control.name] = '';
    }

    // to remove from inner form group - set controls and join by dots. e.g. group1.subgroup2.fieldName
    removeFormControl(controlName: string) {
        const controlData = this.getControlData(controlName, this.form);

        if (controlData != null && controlData.control != null) {
            controlData.formGroup.removeControl(controlData.controlName);
            delete controlData.errors;
            delete controlData.errorMessages[controlData.controlName];
        }
    }

    checkForms(_formGroup: FormGroup, _errors, _errorMessages) {
        for (const key in _formGroup.controls) {
            if (_formGroup.controls[key] instanceof FormGroup) {
                this.checkForms(_formGroup.controls[key] as FormGroup, _errors[key], _errorMessages[key]);
            } else {
                this.checkError(key, _formGroup.controls[key].errors, _errors[key], _errorMessages);
            }
        }
    }

    checkError(_controlName: string, _errors, _controlErrors, _errorMessages) {
        if (!_errors) {
            _errorMessages[_controlName] = '';
            return false;
        }

        const key = Object.keys(_errors)[0];
        _errorMessages[_controlName] = '';

        if (!!_controlErrors && !!_controlErrors[key]) {
            _errorMessages[_controlName] = _controlErrors[key];
        }
        if (!!this.globalErrors[key] && !_errorMessages[_controlName]) {
            _errorMessages[_controlName] = this.globalErrors[key];

        } else if (!_errorMessages[_controlName]) {
            _errorMessages[_controlName] = this.textError || 'Error!';
        }
    }

    public checkIfTheButtonIsPressed() {
        return this.form.touched;
    }

    public setFieldError(_controlName: string, error) {
        const controlData = this.getControlData(_controlName);

        if (!!controlData.errors && !controlData.errors[error]) {
            return this.setFieldErrorCustom(_controlName, error, controlData);
        }
        const errors = {};
        errors[error] = true;
        this.setControlError(controlData.control, errors);
    }

    public setFieldErrorCustom(_controlName: string, error: string, _controlData?: IControlData) {
        const controlData = _controlData || this.getControlData(_controlName);

        const control = controlData.control;
        control.setErrors({customError: true});
        control.markAsDirty();
        control.markAsTouched();
        controlData.errorMessages[_controlName] = error;
        this.textError = error;
    }

    public setControlError(control: FormControl | AbstractControl, errors: {}) {
        control.setErrors(errors);
        control.markAsDirty();
        control.markAsTouched();
        this.form.updateValueAndValidity();
    }

    public submit() {
        this.updateControls();
        this.setControlsTouchableAndDirty();
        this.checkForms(this.form, this.errors, this.errorMessages);
    }

    public getControl(_controlName: string) {
        return this.form.get(_controlName);
    }

    public getControlData(_controlName: string, _formGroup?: FormGroup, _errors?: any, _errorMessages?: any): IControlData {
        const formGroup = _formGroup || this.form;
        const errors = _errors || this.errors;
        const errorMessages = _errorMessages || this.errorMessages;

        const controlPath = _controlName.split('.');
        const controlKey = controlPath.shift();

        const control = formGroup.get(controlKey);

        if (!control) {
            return null;
        }

        if (controlPath.length === 0) {
            return {
                control: control as FormControl,
                errors: errors[controlKey],
                errorMessages,
                formGroup,
                controlName: controlKey
            };
        }

        return this.getControlData(controlPath.join('.'), control as FormGroup, errors[controlKey], errorMessages[controlKey]);
    }

    private getAllControls(_formGroup?: FormGroup): FormControl[] {
        let controls: FormControl[] = [];
        const formGroup: FormGroup = _formGroup || this.form;

        for (const key in formGroup.controls) {
            if (formGroup.controls[key] instanceof FormGroup) {
                controls = [...controls, ...this.getAllControls(formGroup.controls[key] as FormGroup)];
            } else {
                controls.push(formGroup.controls[key] as FormControl);
            }
        }

        return controls;
    }

    private setControlsTouchableAndDirty() {
        const controls = this.getAllControls();

        controls.forEach(_control => {
            _control.markAsDirty();
            _control.markAsTouched();
        });
    }

    private updateControls() {
        const controls = this.getAllControls();

        controls.forEach(_control => {
            _control.updateValueAndValidity();
        });
    }
}
