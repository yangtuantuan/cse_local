import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOMAON_NAME } from 'src/config/global.config';

const SERVICE_CENTER_PREFIX = '/sse/rest/govern/v2/mservices';
const CONFIG_CENTER_PREFIX = `/sse/rest/v1/${DOMAON_NAME}/kie`;

@Injectable({
  providedIn: 'root',
})
export class ConfigListService {
  constructor(private http: HttpClient) {}

  getAllKies(): Observable<{ total: number; data: KieItem[] }> {
    return this.http.get<{ total: number; data: KieItem[] }>(
      `${CONFIG_CENTER_PREFIX}/kv`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    );
  }

  getKie(id: string): Observable<any> {
    return this.http.get(`${CONFIG_CENTER_PREFIX}/kv/${id}`);
  }

  postKie(body: any): Observable<any> {
    return this.http.post(`${CONFIG_CENTER_PREFIX}/kv`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  putKie(id: string, body: any): Observable<any> {
    return this.http.put(`${CONFIG_CENTER_PREFIX}/kv/${id}`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  deleteKie(id: string): Observable<any> {
    return this.http.delete(`${CONFIG_CENTER_PREFIX}/kv/${id}`);
  }

  getApps(enviromentId?: string): Observable<any> {
    return this.http.get(`${SERVICE_CENTER_PREFIX}/apps`, {
      headers: {
        'x-enviroment': enviromentId || '',
      },
    });
  }
}

interface KieItem {
  [name: string]: any;
}
