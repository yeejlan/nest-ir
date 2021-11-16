import { Injectable, Scope } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class RegistryService {
    private request_id: string = '';

    getRequestId(renew: boolean = false): string {
        if(renew || !this.request_id) {
            this.request_id = uuidv4();
        }
        return this.request_id;
    }

    setRequestId(request_id: string): void {
        this.request_id = request_id;
    }
}