import { TestingComponent } from "../pages/testing/testing.component";

export class MyUploadAdapter {
    // constructor(private loader: any ) { }
     
    // imageData: File | undefined
    // upload() {
    //     return this.loader.file
    //         .then((file: any) => {
    //             return new Promise((resolve, reject) => {
    //                 const reader = new FileReader();

    //                 reader.onload = (data: any) => {
    //                     // Manipulate the image data as needed
    //                     const imageData = data.target.result;
    //                    // console.log(file)
    //                      TestingComponent.uploadImages(file)

    //                     // Perform any necessary API calls to store the image
    //                     // ...

    //                     // Return the image URL or any other response from the API
    //                     resolve({ default: imageData });
    //                 };

    //                 reader.onerror = error => reject(error);

    //                 reader.readAsDataURL(file);
    //             });
    //         });
    // }

    // abort() {
    //     // Implement if needed
    // }
}
