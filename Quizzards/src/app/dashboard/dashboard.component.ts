import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private myRouter : Router) { }
  imgPath = "C:\\Users\\prati\\OneDrive\\Documents\\PicsArt_05-06-01.44.48.jpg"
  fileContent;
  ngOnInit(): void {
    if(sessionStorage.getItem("ssid")){
      
      sessionStorage.removeItem("hostCheck")
      sessionStorage.removeItem("resultId")
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
    sessionStorage.removeItem("resultId")
    this.navigateTo('login');
  }

  public onChange(fileList: FileList): void {
    console.log(fileList)
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
    }
    fileReader.readAsText(file);
  }

}
