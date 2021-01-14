import { Component, OnInit } from '@angular/core';

import { GlobalAuthService } from '../../../../shared/services/global-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentUserId: string;

  constructor(
    private globalAuthService: GlobalAuthService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.globalAuthService.currentUserId;
  }

  protected getQueryParamsString(paramsObj: object): string {
    return `${btoa(JSON.stringify(paramsObj))}`;
  }

  getMyIssuesParamsString(): string {
    return this.getQueryParamsString({
      creator: { id: this.currentUserId }
    });
  }

  getAssignedToMeParamsString(): string {
    return this.getQueryParamsString({
      assignee: { id: this.currentUserId }
    });
  }
}
