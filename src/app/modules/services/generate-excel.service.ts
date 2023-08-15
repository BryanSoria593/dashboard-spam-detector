import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import { MailInfoModel, MailListModel, MailReportModel } from 'src/app/core/models/mail/mail.interface';

@Injectable({
  providedIn: 'root'
})
export class GenerateExcelService {

  dataMailFrom: MailListModel[] = [];
  dataMailTo: MailListModel[] = [];
  dataMailReport: MailReportModel[] = [];
  dataMailHam: MailInfoModel[] = [];
  dataMailSpam: MailInfoModel[] = [];

  constructor() { }

  addData(
    mailFrom: MailListModel[],
    mailTo: MailListModel[],
    mailReport: MailReportModel[],
    mailHam: MailInfoModel[],
    mailSpam: MailInfoModel[]
  ) {
    if (mailFrom.length > 0 && mailTo.length > 0 && mailReport.length > 0 && mailHam.length > 0 && mailSpam.length > 0) {
      this.dataMailFrom = mailFrom;
      this.dataMailTo = mailTo;
      this.dataMailReport = mailReport;
      this.dataMailHam = mailHam;
      this.dataMailSpam = mailSpam;

      this.generateExcel();
    }
  }

  private generateExcel(): void {
    if (
      this.dataMailFrom.length > 0 &&
      this.dataMailTo.length > 0 &&
      this.dataMailReport.length > 0 &&
      this.dataMailHam.length > 0 &&
      this.dataMailSpam.length > 0
    ) {
      const wb = XLSX.utils.book_new();

      // Create a worksheet for each array of data
      const wsMailFrom = XLSX.utils.json_to_sheet(this.dataMailFrom);
      const wsMailTo = XLSX.utils.json_to_sheet(this.dataMailTo);
      const wsMailReport = XLSX.utils.json_to_sheet(this.dataMailReport);

      // Convert dataMailHam to a format suitable for Excel
      const dataMailHamExcel = this.dataMailHam.map((item) => ({
        ...item,
        _id: item._id['$oid'],
        dateOfAnalysis: item.dateOfAnalysis['$date'],
      }));
      const wsMailHam = XLSX.utils.json_to_sheet(dataMailHamExcel);

      // Convert dataMailSpam to a format suitable for Excel
      const dataMailSpamExcel = this.dataMailSpam.map((item) => ({
        ...item,
        _id: item._id['$oid'],
        dateOfAnalysis: item.dateOfAnalysis['$date'],
      }));
      const wsMailSpam = XLSX.utils.json_to_sheet(dataMailSpamExcel);

      // Add the worksheets to the workbook
      XLSX.utils.book_append_sheet(wb, wsMailHam, 'Análisis de correos normales');
      XLSX.utils.book_append_sheet(wb, wsMailSpam, 'Análisis de correos spam');
      XLSX.utils.book_append_sheet(wb, wsMailFrom, 'usuarios que envian spam');
      XLSX.utils.book_append_sheet(wb, wsMailTo, 'usuarios que reciben spam');
      XLSX.utils.book_append_sheet(wb, wsMailReport, 'correos reportados');

      // Generate the XLSX file
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

      // Save the file or handle it as needed (e.g., download it using Blob)
      this.saveExcelFile(wbout, 'mail_data.xlsx');
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
