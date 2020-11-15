import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Element } from "../element.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { combineLatest, Observable, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap
} from "rxjs/operators";

@Injectable()
export class DataService {
  private elements$$: BehaviorSubject<Element[]> = new BehaviorSubject([]);
  private _elementsFiltered$: Observable<Element[]>;

  public query$$: BehaviorSubject<string> = new BehaviorSubject("");
  public get elementsFiltered$(): Observable<Element[]> {
    return this._elementsFiltered$;
  }

  constructor(private _http: HttpClient) {
    this._elementsFiltered$ = combineLatest([
      this.getElements(),
      this.query$$.pipe(
        debounceTime(500),
        distinctUntilChanged((x, y) => x === y)
      )
    ]).pipe(
      map(([elements, query]) => {
        return query
          ? elements.filter(element => element.Caption.includes(query))
          : elements;
      })
    );
  }

  public getElements() {
    return this._http
      .get(
        "https://apidata.mos.ru/v1/datasets?api_key=32a58ac9b521dbda0d65bede75377add&$skip=1&$top=20&$inlinecount=allpages",
        {
          headers: new HttpHeaders({
            "Content-Type": "application/json; charset=utf-8"
          })
        }
      )
      .pipe(
        catchError(error => {
          console.log("[HTTP][ERROR]", error);
          return of(null);
        }),
        map((elements: any) => {
          console.log("[GET]", elements);
          return elements.Items || [];
        })
      );
  }
}
