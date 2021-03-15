import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {showAnimate, transformPanel} from '../../animations/fading-away.animate';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  animations: [transformPanel, showAnimate]
})
export class InputComponent implements OnInit {
  @Input() formControlInput?: AbstractControl;
  @Input() label?: string;
  @Input() nameInput: string;
  @Input() placeholderInput?: string = '';
  @Input() maxLengthInput?: number;
  @Input() minLengthInput?: number;
  @Input() typeInput?: string;
  @Input() inputValue = '';
  @Input() disabledInput?: boolean;
  @Input() maskInput?: Array<any> | object;
  @Input() errorMessage?: string;
  @Output() outside = new EventEmitter();
  @ViewChild('inputElement', {static: false}) public inputElement;

  public visibleError = false;


  constructor(private deviceService: DeviceDetectorService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (!this.formControlInput) {
      this.formControlInput = new FormControl(
        {value: '', disabled: this.disabledInput},
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      );
    }
    if (this.disabledInput) {
      this.formControlInput.disable();
    }
    if (!this.inputValue && this.formControlInput.value) {
      this.inputValue = this.formControlInput.value;
    }
  }

  public get maskOptions(): any {
    if (this.disabledInput) {
      this.formControlInput.disable();
    }
    if (this.maskInput) {
      return {
        guide: false,
        keepCharPositions: false,
        mask: this.maskInput
      };
    } else if (this.maskInput && this.typeInput === 'text') {
      return {
        mask: this.maskInput
      };
    } else {
      return {mask: false};
    }
  }

  public lossOfFocus(e): void {
    this.outside.emit(e);
  }

  public focus(): void {
    this.inputElement.nativeElement.focus();
  }

  public errorChecking(): boolean {
    if (this.formControlInput) {
      return this.formControlInput.invalid && (this.formControlInput.dirty || this.formControlInput.touched) && !!this.errorMessage;
    }
  }

  public visualError(): void {
    if (this.deviceService.isDesktop()) {
      if (this.formControlInput) {
        if (this.formControlInput.invalid && (this.formControlInput.dirty || this.formControlInput.touched) && !!this.errorMessage) {
          this.visibleError = true;
        }
      }
    }
  }

  public visualErrorMob(): void {
    if (!this.deviceService.isDesktop()) {
      if (this.formControlInput) {
        if (this.formControlInput.invalid && (this.formControlInput.dirty || this.formControlInput.touched) && !!this.errorMessage) {
          this.visibleError = true;
        }
      }
    }
  }
}
