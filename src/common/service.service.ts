import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

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

  getInstances(): Observable<any> {
    const instances$ = new Subject<any>();
    const query = {
      options: 'instances',
    };
    this.getServiceByGovern(query).subscribe(
      (res) => {
        const result = res.allServicesDetail.reduce(
          (list: any[], item: any) => {
            if (item.instances.length) {
              item.instances.forEach((instance: any) => {
                instance.serviceName = item.microService.serviceName;
                instance.environment = item.microService.environment || '';
              });
              list = list.concat(item.instances);
            }
            return list;
          },
          []
        );
        instances$.next(result);
      },
      (err) => {
        instances$.next([]);
      }
    );

    return instances$;
  }

  getSchemas(serviceId: string): Observable<any> {
    const subject$ = new Subject<any>();
    const query = {
      options: 'schemas',
    };
    this.getServiceByGovern(query).subscribe(
      (res) => {
        const result = res.allServicesDetail
          .filter((item: any) => item.microService.serviceId === serviceId)
          .reduce((list: any[], item: any) => {
            if (item.schemaInfos.length) {
              list = list.concat(item.schemaInfos);
            }
            return list;
          }, []);
        subject$.next(result);
      },
      (err) => {
        subject$.next([]);
      }
    );

    return subject$;
  }

  getDependencies(params?: any): Observable<any> {
    const instances$ = new Subject<any>();
    const query = {
      options: 'dependencies',
      ...params,
    };
    this.getServiceByGovern(query).subscribe(
      (res) => {
        const result = res.allServicesDetail.reduce(
          (obj: { providers: any[]; consumers: any[] }, item: any) => {
            if (item.providers?.length) {
              item.providers.forEach((provider: any) => {
                provider.serviceName = item.microService.serviceName;
                provider.environment = item.microService.environment || '';
              });
            }
            if (item.consumers?.length) {
              item.consumers.forEach((consumer: any) => {
                consumer.serviceName = item.microService.serviceName;
                consumer.environment = item.microService.environment || '';
              });
            }
            obj = {
              providers: [...obj.providers, ...(item.providers || [])],
              consumers: [...obj.consumers, ...(item.consumers || [])],
            };
            return obj;
          },
          {
            providers: [],
            consumers: [],
          }
        );
        console.log(result);

        instances$.next(result);
      },
      (err) => {
        instances$.next([]);
      }
    );

    return instances$;
  }

  getInstancesbyServiceId(id: string): Observable<any> {
    return this.http.get(`${REGISTRY_PREFIX}/microservices/${id}/instances`, {
      headers: {
        'x-domain-name': DOMAON_NAME,
      },
    });
  }
}
