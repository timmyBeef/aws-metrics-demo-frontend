import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {
  state: any = {};
  @Input() label: string;
  @Input() multiple: boolean;
  @Input() control: FormControl;
  @ViewChild('input') input: ElementRef;
  @Output() fileContentString = new EventEmitter<string>();
  fileCnt: number;

  constructor() {}

  ngOnInit() {}
  onClick(e) {
    console.log(this.input.nativeElement);
    this.input.nativeElement.click(e);
  }
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  addFile(e: { target: { files: string | any[]; }; }) {
    let fileNames = '';
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      fileNames = fileNames + files[i].name;
      if (i !== files.length - 1) {
        fileNames = fileNames + ', ';
      }
    }
    this.state.fileNames = fileNames;
    this.state.files = files;

    this.fileToString(e.target.files[0]).subscribe((res) => {
      console.log('file string:');
      console.log(res);
      this.fileCnt = res?.split(',')?.length;
      this.control.setValue(res);
    });
  }

  fileToString(file: File): Observable<string> {
    return Observable.create(
        (sub: Subscriber<string>): void => {
            const r = new FileReader;
            // if success
            r.onload = (ev: ProgressEvent): void => {
                sub.next((ev.target as any).result);
            };
            // if failed
            r.onerror = (ev: any): void => {
                sub.error(ev);
            };
            r.readAsText(file);
        }
    );
} // end fileToString()

//   async function getWorkbookFromFile2(file: File) {
//     return new Promise<any>((resolve, reject) => {
//       const fr = new FileReader();
//       fr.onload = function() {
//         console.log(fr.result);
//       };
  
//       fr.readAsText(file);
//     });
// }
}
