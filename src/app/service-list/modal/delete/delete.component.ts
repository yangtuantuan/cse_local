import { Component, Input, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { ServiceService } from '../../../../common/service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.less'],
})
export class DeleteComponent implements OnInit {
  @Input() data!: {
    services: any;
    onCancel: (data?: any) => void;
  };

  confrimText!: string;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {}

  onConfirm(): void {
    this.service.deleteService(this.data.services.serviceId).subscribe(
      (res) => {
        this.data.onCancel(true);
      },
      (err) => {
        // todo 提示;
      }
    );
  }

  onCancel(): void {
    this.data.onCancel();
  }
}
