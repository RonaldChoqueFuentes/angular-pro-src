import { Injectable } from '@angular/core';

import { MailService } from '../../mail.service';
import { Mail } from '../../models/mail.interface';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class MailViewResolve implements Resolve<Mail>{
    constructor(private mailService:MailService){}

    resolve(route:ActivatedRouteSnapshot){
        return this.mailService.getMessage(route.params.id);
    }
}