import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

import { Element } from '../element.interface';

@Injectable()
export class DataService {
  
  private elements$$: BehaviorSubject<Element[]> = new BehaviorSubject([]);
  private _elementsFiltered$: Observable<Element[]>;

  public query$$: BehaviorSubject<string> = new BehaviorSubject('');
  public get elementsFiltered$() {return this._elementsFiltered$}

  constructor(private _http: Http) {
    this._elementsFiltered$ = Observable.combineLatest(
      this.elements$$,
      this.query$$
    )
    .do(([elements, query]) => console.log('[MAP]', {elements, query}))
    .map(([elements, query]) => {
      return elements.filter(
        element => element.Caption.includes(query)
      )
    });
  }

  public getElements() {
    this._http.get(
      'https://apidata.mos.ru/v1/datasets?api_key=32a58ac9b521dbda0d65bede75377add&$skip=1&$top=20&$inlinecount=allpages',
      { headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }) }
    ).catch(
      error => { 
        console.log('[HTTP][ERROR]', error);
        return [];
      }
    ).subscribe(
      elements => {
        console.log('[GET]', elements);
        this.elements$$.next(elements.json().Items || []);
      }
    )
  }


}