import { Component } from '@angular/core';

@Component({
  selector: 'app-code-playground',
  templateUrl: './code-playground.component.html',
  styleUrls: ['./code-playground.component.scss']
})
export class CodePlaygroundComponent {
  langid: any;

  languages: string[] = ['java', 'c', 'c++' , 'python'];
  selectedLanguage: string = 'java';
  dropdownOpen: boolean = false;
  codeSnippets: { [key: string]: string } = {
    'java': `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`,
    'c': `#include <stdio.h>

int main() {
  printf("Hello World");
  return 0;
}`,
    'c++': `#include <iostream>
using namespace std;

int main() {
  cout << "Hello World" << endl;
  return 0;
}`,
    'python': `print("Hello World")`
  };

  // Get the code snippet based on the selected language
  getCodeSnippet(): string {
    return this.codeSnippets[this.selectedLanguage];
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(language: string): void {
    this.selectedLanguage = language;
    this.dropdownOpen = false;
  }
submitdata(){
  if(this.selectedLanguage==="java")
    {
      this.submitTryitjava();

    }
    else if(this.selectedLanguage==="python"){
      this.submitTryitpython();
    }
    else if(this.selectedLanguage==="c")
      {
        this.submitTryitcc();
      }
      else if(this.selectedLanguage==="c++")
        {
          this.submitTryitcpp();
        }
}
submitTryitcpp(): void {

  const editor = (window as any).editor;

  if (editor) {
    editor.save();
  }

  const textArea = document.getElementById("textareaCode") as HTMLTextAreaElement;
  const text = textArea.value;

  const ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("id", "iframeResult");
  ifr.setAttribute("name", "iframeResult");

  const iframeWrapper = document.getElementById("iframewrapper") as HTMLElement;
  iframeWrapper.innerHTML = "";
  iframeWrapper.appendChild(ifr);

  const iframeResult = document.getElementById("iframeResult") as HTMLIFrameElement;
  iframeResult.addEventListener("load", this.hideSpinner);
  this.displaySpinner();

  let t = text;
  t = t.replace(/=/gi, "w3equalsign");
  t = t.replace(/\+/gi, "w3plussign");

  let pos = t.search(/script/i);
  while (pos > 0) {
    t =
      t.substring(0, pos) +
      "w3" +
      t.substr(pos, 3) +
      "w3" +
      t.substr(pos + 3, 3) +
      "tag" +
      t.substr(pos + 6);
    pos = t.search(/script/i);
  }

  const code = document.getElementById("code") as HTMLInputElement;
  code.value = t;

  const codeForm = document.getElementById("codeForm") as HTMLFormElement;
  codeForm.action = `https://try.w3schools.com/try_cpp.php?x=${Math.random()}`;
  codeForm.method = "post";
  codeForm.acceptCharset = "utf-8";
  codeForm.target = "iframeResult";
  codeForm.submit();
}
submitTryitcc(): void {

  const editor = (window as any).editor;

  if (editor) {
    editor.save();
  }

  const textArea = document.getElementById("textareaCode") as HTMLTextAreaElement;
  const text = textArea.value;

  const ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("id", "iframeResult");
  ifr.setAttribute("name", "iframeResult");

  const iframeWrapper = document.getElementById("iframewrapper") as HTMLElement;
  iframeWrapper.innerHTML = "";
  iframeWrapper.appendChild(ifr);

  const iframeResult = document.getElementById("iframeResult") as HTMLIFrameElement;
  iframeResult.addEventListener("load", this.hideSpinner);
  this.displaySpinner();

  let t = text;
  t = t.replace(/=/gi, "w3equalsign");
  t = t.replace(/\+/gi, "w3plussign");

  let pos = t.search(/script/i);
  while (pos > 0) {
    t =
      t.substring(0, pos) +
      "w3" +
      t.substr(pos, 3) +
      "w3" +
      t.substr(pos + 3, 3) +
      "tag" +
      t.substr(pos + 6);
    pos = t.search(/script/i);
  }

  const code = document.getElementById("code") as HTMLInputElement;
  code.value = t;

  const codeForm = document.getElementById("codeForm") as HTMLFormElement;
  codeForm.action = `https://try.w3schools.com/try_c.php?x=${Math.random()}`;
  codeForm.method = "post";
  codeForm.acceptCharset = "utf-8";
  codeForm.target = "iframeResult";
  codeForm.submit();
}
submitTryitpython(): void {

  const editor = (window as any).editor;

  if (editor) {
    editor.save();
  }

  const textArea = document.getElementById("textareaCode") as HTMLTextAreaElement;
  const text = textArea.value;

  const ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("id", "iframeResult");
  ifr.setAttribute("name", "iframeResult");

  const iframeWrapper = document.getElementById("iframewrapper") as HTMLElement;
  iframeWrapper.innerHTML = "";
  iframeWrapper.appendChild(ifr);

  const iframeResult = document.getElementById("iframeResult") as HTMLIFrameElement;
  iframeResult.addEventListener("load", this.hideSpinner);
  this.displaySpinner();

  let t = text;
  t = t.replace(/=/gi, "w3equalsign");
  t = t.replace(/\+/gi, "w3plussign");

  let pos = t.search(/script/i);
  while (pos > 0) {
    t =
      t.substring(0, pos) +
      "w3" +
      t.substr(pos, 3) +
      "w3" +
      t.substr(pos + 3, 3) +
      "tag" +
      t.substr(pos + 6);
    pos = t.search(/script/i);
  }

  const code = document.getElementById("code") as HTMLInputElement;
  code.value = t;

  const codeForm = document.getElementById("codeForm") as HTMLFormElement;
  codeForm.action = `https://try.w3schools.com/try_python.php?x=${Math.random()}`;
  codeForm.method = "post";
  codeForm.acceptCharset = "utf-8";
  codeForm.target = "iframeResult";
  codeForm.submit();
}
  submitTryitjava(): void {

    const editor = (window as any).editor;

    if (editor) {
      editor.save();
    }

    const textArea = document.getElementById("textareaCode") as HTMLTextAreaElement;
    const text = textArea.value;

    const ifr = document.createElement("iframe");
    ifr.setAttribute("frameborder", "0");
    ifr.setAttribute("id", "iframeResult");
    ifr.setAttribute("name", "iframeResult");

    const iframeWrapper = document.getElementById("iframewrapper") as HTMLElement;
    iframeWrapper.innerHTML = "";
    iframeWrapper.appendChild(ifr);

    const iframeResult = document.getElementById("iframeResult") as HTMLIFrameElement;
    iframeResult.addEventListener("load", this.hideSpinner);
    this.displaySpinner();

    let t = text;
    t = t.replace(/=/gi, "w3equalsign");
    t = t.replace(/\+/gi, "w3plussign");

    let pos = t.search(/script/i);
    while (pos > 0) {
      t =
        t.substring(0, pos) +
        "w3" +
        t.substr(pos, 3) +
        "w3" +
        t.substr(pos + 3, 3) +
        "tag" +
        t.substr(pos + 6);
      pos = t.search(/script/i);
    }

    const code = document.getElementById("code") as HTMLInputElement;
    code.value = t;

    const codeForm = document.getElementById("codeForm") as HTMLFormElement;
    codeForm.action = `https://try.w3schools.com/try_java.php?x=${Math.random()}`;
    codeForm.method = "post";
    codeForm.acceptCharset = "utf-8";
    codeForm.target = "iframeResult";
    codeForm.submit();
  }

  // Assuming these functions are defined somewhere in your codebase
  hideSpinner(): void {
    const loaderContainer = document.getElementById("runloadercontainer") as HTMLElement;
    if (loaderContainer) {
      loaderContainer.style.display = "none";
    }
  }

  displaySpinner(): void {
    const i = document.getElementById("iframeResult") as HTMLElement;
    let w = this.w3_getStyleValue(i, "width");
    let h = this.w3_getStyleValue(i, "height");

    const c = document.getElementById("runloadercontainer") as HTMLElement;
    c.style.width = w;
    c.style.height = h;
    c.style.display = "block";

    w = (Number(w.replace("px", "")) / 5).toString();
    const r = document.getElementById("runloader") as HTMLElement;
    r.style.width = `${w}px`;
    r.style.height = `${w}px`;

    h = this.w3_getStyleValue(r, "height");
    const halfHeight = Number(h.replace("px", "")) / 2;

    let top = this.w3_getStyleValue(c, "height");
    const halfTop = Number(top.replace("px", "")) / 2 - halfHeight;
    r.style.top = `${halfTop}px`;
  }

  w3_getStyleValue(element: HTMLElement, style: string): string {
    return window.getComputedStyle(element).getPropertyValue(style);
  }


}
