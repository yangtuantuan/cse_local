import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SERVICE_CENTER_PREFIX } from 'src/config/global.config'

@Injectable({
  providedIn: 'root'
})
export class ServiceListService {

  constructor(
    private http: HttpClient
  ) { }

  createService(body: any): Observable<any> {
    return this.http.post(`${SERVICE_CENTER_PREFIX}`, body, {
      headers: {

      }
    })
  }
}
