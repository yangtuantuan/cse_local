import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PROJECT_ID,
  CONFIG_CENTER_PREFIX,
  REGISTRY_PREFIX,
  GOVERN_PREFIX,
} from 'src/config/global.config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
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
    return this.http.get(`${GOVERN_PREFIX}/microservices/apps`, {
      headers: {
        'x-enviroment': enviromentId || '',
      },
    });
  }

  getServices(): Observable<any> {
    return this.http.get(`${REGISTRY_PREFIX}/microservices`, {
      headers: {
        'X-Enterprise-Project-ID': PROJECT_ID,
      },
    });
  }
}

interface KieItem {
  [name: string]: any;
}

export const getTagsByObj = (labels: { [x: string]: any }): string[] => {
  const data = Object.keys(labels || {}).reduce(
    (list: string[], key: string) => {
      if (key) {
        list.push(`${key}=${labels[key]}`);
      }
      return list;
    },
    []
  );
  return data;
};
