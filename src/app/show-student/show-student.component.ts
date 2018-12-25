import { Component, OnInit, ChangeDetectorRef, Input  } from '@angular/core';
import {Student,StudentSource} from '../student.interface'
import { ElasticsearchService } from '../elasticsearch.service';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {

  @Input() student: Student;
  private static readonly INDEX = 'test_demo';
  private static readonly TYPE = 'student';
 
  studentSources: StudentSource[];

  constructor(private es: ElasticsearchService) { }

  ngOnInit() {
    this.es.getAllDocuments(ShowStudentComponent.INDEX, ShowStudentComponent.TYPE)
      .then(response => {
        this.studentSources = response.hits.hits;
        console.log(response);
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show student Completed!');
      });
  }

}
