import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from "@angular/router";
import { AppComponent } from './app.component';
import {Global} from "./Global.service";
import {Helper} from './helper.service';
import {Shared} from "./shared.service";
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {EventService} from "./event.service";
import {ComponentService} from "./component.service";
import {AuthService} from "./auth.service";
import {BlogGridComponent} from "./blog-grid/blog-grid.component";
import {SharedModule} from "./sharedModule";
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TabsComponent } from './tabs/tabs.component';
import { Footer2Component } from './footer2/footer2.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { AppRootComponent } from './app-root/app-root.component';
import {SignupComponent} from "./non-root/signup/signup.component";
import {LoginComponent} from "./non-root/login/login.component";

// routes
const appRoutes: Routes = [

  {component: AppComponent, path: 'app', children:[
    {component: BlogGridComponent, path: 'results'},
    {component: BlogGridComponent, path: 'allresults'},
    {loadChildren: './non-root/nonRootModule#NonRootModule', path: 'other'}
  ]},
  {component: FrontpageComponent, path: 'home'},
  {component: SignupComponent, path: 'signup',data:{isItSignUpPage:true}},
  {component: SignupComponent, path: 'signup/:nextURL'},
  {component: LoginComponent, path: 'login'},
  {component: LoginComponent, path: 'login/:nextURL'},
  {path: '', component:FrontpageComponent},
  {path: '**', component: NotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    LoginComponent,
    // BlogGridComponent,
    SignupComponent,
    NotFoundComponent,
    ProgressBarComponent,
    TabsComponent,
    Footer2Component,
    FrontpageComponent,
    AppRootComponent,



    // LoginComponent,
    // SignupComponent,
    // DashboardComponent,
    // TagsInputDirective,
    // BlogPageComponent,
    // BlogDisplayComponent,
    // TextEditorInterfaceComponent,
    // SortArrayByPipe,
    // ThreadComponent,
    // CommentComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
  ],
  providers: [
   Helper,Global,Shared,EventService,ComponentService,AuthService
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule { }
