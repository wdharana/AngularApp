import { Component, OnInit, Input } from '@angular/core';
import { StudentSource } from '../student.interface';
import { ElasticsearchService } from '../elasticsearch.service';
import {Student} from '../student.interface';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css']
})
export class SearchStudentComponent implements OnInit {

  @Input() student: Student;

  private static readonly INDEX = 'test_demo';
  private static readonly TYPE = 'student';
 
  studentSources: StudentSource[];
  private queryText = '';
 
  private lastKeypress = 0;

  constructor(private es: ElasticsearchService) { 
    this.queryText = '';
  }

  ngOnInit() {
  }

  search($event) {
    if ($event.timeStamp - this.lastKeypress > 100) {
      this.queryText = $event.target.value;
 
      this.es.fullTextSearch(
         SearchStudentComponent.INDEX,
        // SearchStudentComponent.TYPE,
        '_all', this.queryText).then(
          response => {
            this.studentSources = response.hits.hits;
            console.log(this.studentSources);

          }, error => {
            console.error(error);
          }).then(() => {
            console.log('Search Completed!');
          });
    }
 
    this.lastKeypress = $event.timeStamp;
  }


}
