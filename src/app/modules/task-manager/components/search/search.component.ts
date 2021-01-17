import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { compareUsers } from '../../../../shared/helpers/compareUsers';
import { User } from '../../../../shared/interfaces/user';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() emittedSearchText = new EventEmitter<string>();
  @Output() emittedSelectedUser = new EventEmitter<User | string>();
  compareUsers: (user1: User, user2: User) => boolean = compareUsers;
  searchText = '';
  selectedUser: User | string = '';
  users$: Observable<User[]>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  emitSearchText(text: string): void {
    this.emittedSearchText.emit(text);
  }

  onInputChange(text): void {
    this.emitSearchText(text);
  }

  clearSearchField(): void {
    this.searchText = '';
    this.emitSearchText('');
  }

  onKeyEscape(): void {
    this.clearSearchField();
  }

  emitSelectedUser(user: User | ''): void {
    this.emittedSelectedUser.emit(user);
  }

  onSelectionChange(user: User): void {
    this.emitSelectedUser(user);
  }

  clearUserFilter(event: Event): void {
    event.stopPropagation();
    this.selectedUser = '';
    this.emitSelectedUser('');
  }
}
