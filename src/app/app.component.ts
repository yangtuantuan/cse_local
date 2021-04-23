import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map((activatedRoute: ActivatedRoute) => {
        while (activatedRoute.firstChild) {
          activatedRoute = activatedRoute.firstChild;
        }
        return activatedRoute;
      })
    ).subscribe(
      (res) => {
        this.showLeftMenu = res.snapshot.data.showLeftMenu === undefined ? true : res.snapshot.data.showLeftMenu;
      }
    );
  }

  title = 'local-cse';
  showLeftMenu!: boolean;

  menu = [
    {
      title: '服务中心',
      children: [
        { title: '服务列表', link: '/servicelist', linkType: 'routerLink' },
        { title: '实例列表', link: '/instancelist', linkType: 'routerLink' },
      ]
    },
    {
      title: '配置中心',
      children: [
        { title: '服务配置', link: '/kie', linkType: 'routerLink' }
      ]
    },
  ];
}
