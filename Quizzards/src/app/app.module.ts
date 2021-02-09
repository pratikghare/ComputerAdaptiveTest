import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PerformanceReportComponent } from './performance-report/performance-report.component';
import { AdaptiveQuizComponent } from './adaptive-quiz/adaptive-quiz.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { HostedQuizComponent } from './hosted-quiz/hosted-quiz.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HostedReportComponent } from './hosted-report/hosted-report.component';
import { AttemptedReportComponent } from './attempted-report/attempted-report.component';
import { HostQuizComponent } from './host-quiz/host-quiz.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ContactUsComponent,
    AboutUsComponent,
    UserProfileComponent,
    PerformanceReportComponent,
    AdaptiveQuizComponent,
    QuizResultComponent,
    HostedQuizComponent,
    PageNotFoundComponent,
    SearchResultComponent,
    HostedReportComponent,
    AttemptedReportComponent,
    HostQuizComponent,
    LeaderboardsComponent,
    ForgotPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    Ng2GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
