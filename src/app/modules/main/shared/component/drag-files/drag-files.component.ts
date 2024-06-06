import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
@Component({
  selector: 'app-drag-files',
  templateUrl: './drag-files.component.html',
  styleUrls: ['./drag-files.component.scss']
})
export class DragFilesComponent implements OnInit {
  allFiles: File[] = [];
  public Editor = '';

  @Output() private emitFile: EventEmitter<any> = new EventEmitter<any>();
  error: string = '';
  dragAreaClass: string = '';
  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.onChange(files)
  }
  constructor(public translate: TranslateService, private notify: NotificationService) { }
  ngOnInit() {
    this.dragAreaClass = "dragarea";
  }
  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.onChange(files)
    }
  }


  fileContent: any;
  public onChange(fileList: FileList): void {
    let file = fileList[0];
    this.fileDtails = file.name;
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = () => {
      let content: any;
      content = fileReader.result;
      self.fileContent = fileReader.result;
      console.log(self.fileContent)
      this.emitFile.emit(fileReader.result as string);
    }
    fileReader.readAsText(file);
  }

  selectedFile: any;
  fileDtails: string = '';
  onFileSelect(event: any) {
    var reader = new FileReader();
    let file = event.target.files[0];
    this.fileDtails = file.name;
    reader.onloadend = () => {

      this.emitFile.emit(reader.result as string);

    };
    reader.onerror = (error) => {

      console.warn("Error reading dropped file:");
      console.error(error);

    };
    reader.onloadend = () => {

      reader = new FileReader();

    };

    reader.readAsText(file);
  }
  // ----------Azmio 1-11-2022
  exportAsWord() {
    if (this.fileContent == '' || !this.fileContent) {
      this.notify.showDbWarn("أختر ملف اولا")
      return
    }
    else {
      var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title></title></head><body>";
      var footer = "</body></html>";
      var sourceHTML = header + this.fileContent + footer;
      var fileName = 'document.doc';
      var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
      var fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = fileName;
      fileDownload.click();
      document.body.removeChild(fileDownload);
    }

  }
}
