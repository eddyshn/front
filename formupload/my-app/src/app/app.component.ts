import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  authorization = '';
  data = {};
  token = '';
  imgURL = '';

  constructor(
      private http: HttpClient){

  }

  login(){
      this.http.post("http://localhost:22742/api/TokenAuth/Authenticate",
      {
          userNameOrEmailAddress:"admin",
          password:"123qwe"
      }).subscribe((r:any)=>{
          console.log(r.result.accessToken);
          this.authorization = `Bearer ${r.result.accessToken}`;
          this.token = r.result.accessToken;
      });
  }

  test(){

      // this.http.get("http://localhost:22742/api/services/app/TechPoints/GetAll",
      //     {headers:{'Authorization': this.token}})
      // .subscribe(r=>{
      //     console.log(r);
          
      // });
      let body ={
          FileType: "png",
          FileName: 'test',
          FileToken: this.token

      }
      this.http.post("http://localhost:22742/File/UploadImg",body,
          {headers:{'Authorization': this.authorization}})
      .subscribe(r=>{
          console.log(r);
          
      });

  }

  download(){
      let params = new HttpParams()
      .set('id', '48F02BA9-9D9C-7ECE-6E33-39ED521C5E43');

      this.http.get("http://localhost:22742/File/DownloadImg",
          {headers:{'Authorization': this.token},params:params})
       .subscribe((r:any)=>{
          console.log(r);
          this.imgURL = "data:image/png;base64,"+r.result;
          
      });
  }
}
