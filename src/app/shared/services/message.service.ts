import { Injectable } from '@angular/core';

import { MessageService as PrimengMessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    private primengMessageService: PrimengMessageService
  ) { }

  showInfo(message: string): void {
    this.primengMessageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message
    });
  }

  showSuccess(message: string): void {
    this.primengMessageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message
    });
  }

  showWarn(message: string): void {
    this.primengMessageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: message
    });
  }

  showError(message: string): void {
    this.primengMessageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}
