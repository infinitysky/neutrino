import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent implements OnInit {

  public currentTimeFrameId: any;
  public currentUserId: any;
  private sub: any;
  private userIdSub: any;
  constructor( private _activatedRoute: ActivatedRoute,
               private _router: Router) {

  }

  ngOnInit() {
    this.userIdSub = this._activatedRoute.params.subscribe(params => {
      this.currentUserId = +params['userid'];



      this.sub = this._activatedRoute.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.currentTimeFrameId = +params['timeFrameId'] || 0;
        console.log('Current UserID: ', this.currentUserId);
        console.log('Query param currentTimeFrame: ', this.currentTimeFrameId);
      });



    });





  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  jump(){
    this._router.navigate(['/aboutus','4'],{queryParams: { timeFrameId: 44 }});
  }

  updateTimeFrameId(){

    this._router.navigate([],{queryParams: { timeFrameId: 88 }});

  }



    @ViewChild('childModal') public childModal: ModalDirective;

    public showChildModal():void {
        this.childModal.show();
    }

    public hideChildModal():void {
        this.childModal.hide();
    }

}
