import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() emittedSearchText = new EventEmitter<string>();
  searchText: string;

  constructor() { }

  ngOnInit(): void { }

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
}
