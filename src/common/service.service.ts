import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  DOMAON_NAME,
  REGISTRY_PREFIX,
  GOVERN_PREFIX,
} from 'src/config/global.config';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  postService(body: any): Observable<any> {
    return this.http.post(`${REGISTRY_PREFIX}/microservices`, body, {
      headers: {
        'x-domain-name': DOMAON_NAME,
      },
    });
  }

  getService(): Observable<any> {
    return this.http.get(`${REGISTRY_PREFIX}/microservices`, {
      headers: {
        'x-domain-name': DOMAON_NAME,
      },
    });
  }

  getServiceByGovern(params?: any): Observable<any> {
    return this.http.get(`${GOVERN_PREFIX}/microservices`, {
      headers: {
        'x-domain-name': DOMAON_NAME,
      },
      params,
    });
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${REGISTRY_PREFIX}/microservices/${id}`, {
      headers: {
        'x-domain-name': DOMAON_NAME,
      },
    });
  }

  getServiceById(id: string): Observable<any> {
    return this.http.get(`${REGISTRY_PREFIX}/microservices/${id}`, {
      headers: {
        'x-domain-name': DOMAON_NAME,
      },
    });
  }

  getServiceDetalByGovern(id: string, params?: HttpParams): Observable<any> {
    return this.http.get(`${GOVERN_PREFIX}/microservices/${id}`, {
      headers: {
        'x-domain-name': DOMAON_NAME,
      },
      params,
    });
  }

  getServiceInstances(query?: any): Observable<any> {
    return this.http.get(`${REGISTRY_PREFIX}/instances`, {
      headers: {
        'x-domain-name': DOMAON_NAME,
      },
      params: {
        ...query,
      },
    });
  }
}
