import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-performance-report',
  templateUrl: './performance-report.component.html',
  styleUrls: ['./performance-report.component.css']
})
export class PerformanceReportComponent implements OnInit {

  constructor(private myRouter : Router) { }


  public pieChart: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      ['Quiz', 'Percentage'],
    ],
    //firstRowIsData: true,
    options: {'title': 'Performance Report',
  },
    
  };

  public errMsg:String;
  public isGiven = false;

  ngOnInit(): void {
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    if(sessionStorage.getItem("ssid")){
      let user = JSON.parse(sessionStorage.getItem("ssid"))
      for(let i=0; i<user.quizResultList.length; i++){  
        let accuracy = user.quizResultList[i].scoredMarks * 100 / user.quizResultList[i].totalMarks
        let data = [user.quizResultList[i].quiz.quizTitle, accuracy]
        this.pieChart.dataTable.push(data);
      }
      
      console.log(this.pieChart.dataTable.length)
      if(this.pieChart.dataTable.length > 1){
        this.isGiven = true;
      }
      else{
        console.log("Inside This")
        this.errMsg = "You have not attempted any tests at the moment!"
      }
    }
    else{
      this.navigateTo("login")
    }
  }

  navigateTo(path){
    this.myRouter.navigate([path]);
  }

  logoutSession(){
    sessionStorage.removeItem("ssid");
    this.navigateTo('login');
  }

}
