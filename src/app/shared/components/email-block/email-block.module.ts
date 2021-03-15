import {NgModule} from '@angular/core';
import {EmailBlockComponent} from '@app/shared/components/components-pages/email-block/email-block.component';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from '@app/shared/components/modal/modal.module';
import {InputModule} from '@app/shared/components/input/input.module';

@NgModule({
    declarations: [EmailBlockComponent],
    imports: [
        TranslateModule,
        CommonModule,
        ModalModule,
        InputModule,
    ],
    exports: [EmailBlockComponent]
})
export class EmailBlockModule {

}
