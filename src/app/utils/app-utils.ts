import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
@Injectable()
export class AppUtils {

    static routerInstance: Router;

    public static requiredField = 'Field is required.'

    constructor(public router: Router, public http: HttpClient) {
        AppUtils.routerInstance = router;
    }

    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    static attandancesState = ["On Leave", "Half Day", "Full Day"];
    static taskAndAssignmentStatus = ["Rejected", "Unreviewed", "Accepted"]


    public static modelDismiss(id: any) {
        document.getElementById(id)?.click()
    }
    public static calculatePercentages(num1: number, num2: number) {
        return (num2 == 0) ? 0 : Math.floor(num1 / num2 * 100)
    }

    public static submissionFormFun(form: any) {
        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            if (control) {
                control.markAsTouched();
            }
        });
        const firstInvalidControl = document.querySelector('input.ng-invalid');
        if (firstInvalidControl) {
            firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    public static pageRendering(path: string, params: any) {

        if (AppUtils.routerInstance) {
            AppUtils.routerInstance.navigate([path], {
                queryParams: params
            });
        }
    }
    public static isFormFieldValid(fieldName: string, form: any): boolean {
        const field = form.get(fieldName);
        return field ? field.invalid && field.touched : false;
    }


    public downloadFile(fileUrl: string, fileName: string, downloadOrNot: boolean) {
        // try {
        //     const response = await fetch(fileUrl);
        //     const blob = await response.blob();
        //     const anchor = document.createElement('a');
        //     anchor.href = URL.createObjectURL(blob);
        //     anchor.download = fileName != null ? fileName : ''; // Provide a filename here if needed
        //     if (downloadOrNot)
        //         anchor.click(); // Trigger the download
        //     return blob;
        // } catch (error) {
        //     console.error('Error downloading file:', error);
        //     return null;
        // }

        const cloudinaryUrl = 'https://res.cloudinary.com/df04kiqy3/image/upload/v1715159958/taskAndAssignmentFiles/5ff1b82e-23be-4426-8be5-317b981dcc59.pdf.pdf';

        // Make a GET request to the Cloudinary URL
        this.http.get(cloudinaryUrl, { responseType: 'blob' })
            .pipe(
                catchError(error => {
                    console.error('Error downloading the file', error);
                    return throwError('Error downloading the file');
                })
            )
            .subscribe((response: any) => {
                const blob = new Blob([response], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            });
    }

}
