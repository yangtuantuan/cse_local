import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormLayout } from 'ng-devui';
import { ServiceService } from '../../common/service.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.less'],
})
export class ServiceDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService
  ) {
    this.serivceId = this.route.snapshot.paramMap.get('id') || '';
  }

  title!: string;
  serivceId: string;
  serviceData!: any;
  formLayout = FormLayout;
  acticeTabId!: any;

  ngOnInit(): void {
    if (this.serivceId) {
      this.initData();
    }
  }

  initData(): void {
    const params = {
      options: 'all',
    };
    // this.service.getServiceByGovern(params).subscribe(
    //   (res) => {
    //     this.serviceData = res.allServicesDetail.reduce(
    //       (list: any[], item: any) => {
    //         if (item?.microService?.serviceId === this.serivceId) {
    //           this.title = item.microService.serviceName;
    //           list.push(item.microService);
    //         }
    //         return list;
    //       },
    //       []
    //     );
    //   },
    //   (err) => {
    //     // todo 提示
    //     this.router.navigate(['servicelist']);
    //   }
    // );

    this.service.getServiceById(this.serivceId).subscribe(
      (res) => {
        this.serviceData = res.service || {};
        if (!res.service?.environment) {
          res.service.environment = '<空>';
        }
        this.title = res.service.serviceName;
      },
      (err) => {
        // todo 提示
      }
    );
  }

  activeTabChange(event: any): void {
    console.log('switch to', event);
  }
}
