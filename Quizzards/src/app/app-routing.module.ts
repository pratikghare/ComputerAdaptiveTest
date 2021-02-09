import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



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

const routes: Routes = [
  {path : "" , component : HomeComponent},
  {path : "dashboard" , component : DashboardComponent},  
  {path : "dashboard/profile" , component : UserProfileComponent},
  {path : "dashboard/performance" , component : PerformanceReportComponent},
  {path : "login" , component : LoginComponent},
  {path : "register" , component : RegisterComponent},
  {path : "contact-us" , component : ContactUsComponent},
  {path : "adaptive-quiz" , component : AdaptiveQuizComponent},
  {path : "result" , component : QuizResultComponent},
  {path : "search-result" , component : SearchResultComponent},
  {path : "quiz" , component : HostedQuizComponent},
  {path : "pnf" , component : PageNotFoundComponent},
  {path : "dashboard/hosted" , component : HostedReportComponent},
  {path : "dashboard/activity" , component : AttemptedReportComponent},
  {path : "host" , component : HostQuizComponent},
  {path : "leaderboards" , component : LeaderboardsComponent},
  {path : "forgot" , component : ForgotPassComponent},
  {path : "about-us" , component : AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
