import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ToastrService } from 'ngx-toastr';
import { Message } from './toast.service';

@Injectable({

  providedIn: 'root'

})

export class NotificationService {


  constructor(private toastr: ToastrService, public translate: TranslateService) { }

  showSuccess(message: string, title: string) {

    this.toastr.success(message, title, { positionClass: 'toast-top-left' })

  }
  showError(message: string, title: string) {

    this.toastr.error(message, title, { positionClass: 'toast-top-left' })

  }
  showWarn(message: string, title: string) {

    this.toastr.warning(message, title, { positionClass: 'toast-top-left' })

  }
  showValidation(MessageContent: string, Title?: string) {
    Title = "DATAERROR"

    this.translate.get(Title).subscribe(Tit => {
      Title = Tit
    }
    )
    this.translate.get(MessageContent).subscribe(Message => {
      this.toastr.error(Message, '', { positionClass: 'toast-top-left', titleClass: 'center' })

    }
    )

  }
  showValidationSucess(MessageContent: string, Title?: string) {
    Title = "DATAERROR"

    this.translate.get(Title).subscribe(Tit => {
      Title = Tit
    }
    )
    this.translate.get(MessageContent).subscribe(Message => {
      this.toastr.success(Message, '', { positionClass: 'toast-top-left', titleClass: 'center' })

    }
    )
  }
  showDbSucess(MessageContent: string, Title?: string) {
    Title = "DATAERROR"

    this.translate.get(Title).subscribe(Tit => {
      Title = Tit
    }
    )
    this.translate.get(MessageContent).subscribe(Message => {
      this.toastr.success(Message, '', { positionClass: 'toast-top-left', titleClass: 'center' })

    }
    )
  }
  showDbError(MessageContent: string, Title?: string) {
    Title = "DATAERROR"

    this.translate.get(Title).subscribe(Tit => {
      Title = Tit
    }
    )
    this.translate.get(MessageContent).subscribe(Message => {
      this.toastr.error(Message, '', { positionClass: 'toast-top-left', titleClass: 'center' })

    }
    )

  }
  showDbWarn(MessageContent: string, Title?: string) {
    Title = "DATAERROR"

    this.translate.get(Title).subscribe(Tit => {
      Title = Tit
    }
    )
    this.translate.get(MessageContent).subscribe(Message => {
      this.toastr.warning(Message, '', { positionClass: 'toast-top-left', titleClass: 'center' })

    }
    )

  }
}

