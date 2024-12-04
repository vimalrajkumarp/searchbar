import { Component, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const API_URL = 'https://pmsharyana.com/jhgvbnmlk/location/landmarkSearch';

@Injectable()
export class WikipediaService {
	private http = inject(HttpClient);

	search(term: string) {
		if (term === '') {
			return of([]);
		}

    return this.http
			.post<[any, string[]]>(API_URL, { 'city_id': 27, 'search': term })
			.pipe(map((response: any) => {
        return response.data.landmarks.map((row:any)=> row.name);
      }));
	}
}

@Component({
  selector: 'app-online-test',
  templateUrl: './online-test.component.html',
  styleUrl: './online-test.component.scss',
  standalone: true,
  imports: [NgbTypeaheadModule, FormsModule, CommonModule],
  providers: [WikipediaService, HttpClient]
})
export class OnlineTestComponent {
  private service = inject(WikipediaService);

	model: any;
	searching = false;
	searchFailed = false;
  searchSelected = false;

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
      filter(userInput => userInput.length > 2),
			debounceTime(250),
			distinctUntilChanged(),
			tap(() => (this.searching = true)),
			switchMap((term) =>
				this.service.search(term).pipe(
					tap(() => (this.searchFailed = false)),
					catchError(() => {
						this.searchFailed = true;
						return of([]);
					}),
				),
			),
			tap(() => (this.searching = false)),
		);

		submitSearch(model: any){
			alert("Value '"+model+"' submited for result!");
		}
}
