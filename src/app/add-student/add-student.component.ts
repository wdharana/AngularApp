import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ElasticsearchService } from '../elasticsearch.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  isConnected = false;
 
  form: FormGroup;
  status: string;

  constructor(private es: ElasticsearchService, private cd: ChangeDetectorRef) {
    this.isConnected = false;

    this.form = new FormGroup({
      index: new FormControl('test_demo', Validators.required),
      id: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      courseName: new FormControl('', Validators.required),
      credit: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
    this.es.isAvailable().then(() => {
      this.status = 'OK';
      this.isConnected = true;
    }, error => {
      this.status = 'ERROR';
      this.isConnected = false;
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }

  onSubmit(value) {
 
    this.es.addToIndex({
      index: value.index,
      type: 'student',
      id: value.id,
      body: {
        firstName: value.firstName,
        lastName: value.lastName,
        coueses:{
          courseName: value.courseName,
          credit : value.credit
        }
      }
    }).then((result) => {
      console.log(result);
      alert('Document added, see log for more info');
    }, error => {
      alert('Something went wrong, see log for more info');
      console.error(error);
    });
  }

}
