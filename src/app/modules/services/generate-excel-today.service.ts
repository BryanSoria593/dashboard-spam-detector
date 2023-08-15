import { Injectable } from '@angular/core';
import { MailInfoModel } from 'src/app/core/models/mail/mail.interface';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class GenerateExcelTodayService {

  data : MailInfoModel[] = [];
  
  constructor() { }

  addData(info: MailInfoModel[], title: string) {
    if (info.length > 0 ) {
      this.data = info;
      this.generateExcel(title);
    }
  }
  private generateExcel(title: string): void {

    if (this.data.length >= 0){
      const wb = XLSX.utils.book_new();
      const dataMailExcel = this.data.map((item) => ({
        ...item,
        _id: item._id['$oid'],
        dateOfAnalysis: item.dateOfAnalysis['$date'],
      }));

      const wsMailExcel = XLSX.utils.json_to_sheet(dataMailExcel);
      XLSX.utils.book_append_sheet(wb, wsMailExcel, title);
      
      this.saveExcelFile(XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }), title + '.xlsx');
    }
  }
  
  private saveExcelFile(data: any, filename: string): void {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    // Append the link to the body and trigger the click event
    document.body.appendChild(a);
    a.click();

    // Clean up the DOM
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
