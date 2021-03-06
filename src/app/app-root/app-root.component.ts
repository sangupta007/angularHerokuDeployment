import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Helper} from "../helper.service";
import {EventService} from "../event.service";
import {Global} from "../Global.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.css']
})
export class AppRootComponent implements OnInit {

  blogContent;
  showMenu = true;
  isSmallSizeDevice=false;
  html:string;
  showProgressBar:boolean=true;

  constructor(private helper:Helper, private eventService:EventService,private global:Global,private ref : ChangeDetectorRef, public activatedRoute:ActivatedRoute){ }

  ngOnInit(){
    console.log(this.activatedRoute);
    this.showProgressBar= false;

    this.helper.showProgressBarEvent.subscribe(value=>{
      console.log('in showProgressBarEvent');
      this.showProgressBar=value;
    });

    /*if localstorage is not empty fetch the user details and set to Global.service.ts
     this will be required when user refreshes the page*/
    // console.log(this.global.getLoggedInUserDetails(),'from app.component');

    if(!this.global.getLoggedInUserDetails())
    {
      this.helper.getUserBy_id(localStorage.getItem('userID')).subscribe(
        (value)=> {
          console.log(value);
          console.log(value);
          this.global.setLoggedInUserDetails(value[0]);
          this.eventService.setLoggedInUserDetailsEvent.emit(value[0]);

        }
      );
    }
  }

  onBodyTextEditorKeyUp(event){

    this.blogContent = event;
    this.ref.detectChanges();
  }
}
