import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }

    @ViewChild('childModal') public childModal: ModalDirective;

    public showChildModal():void {
        this.childModal.show();
    }

    public hideChildModal():void {
        this.childModal.hide();
    }

}
