import { Component, OnInit, ChangeDetectorRef, Input  } from '@angular/core';
import { ElasticsearchService } from '../elasticsearch.service';
import {Student} from '../student.interface'


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  // isConnected = false;
  // status: string;

  @Input() student: Student;

  constructor(private es: ElasticsearchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    // this.es.isAvailable().then(() => {
    //   this.status = 'OK';
    //   this.isConnected = true;
    // }, error => {
    //   this.status = 'ERROR';
    //   this.isConnected = false;
    //   console.error('Server is down', error);
    // }).then(() => {
    //   this.cd.detectChanges();
    // });
  }

}
