import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): any {
    // Extract the video ID from the URL
    const videoId = this.extractVideoId(url);

    // Construct the embedded video URL
    const embeddedUrl = `https://www.youtube.com/embed/${videoId}`;

    // Sanitize the URL
    return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
  }

  private extractVideoId(url: string): string {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (videoIdMatch && videoIdMatch[1]) {
      return videoIdMatch[1];
    }

    // If no match is found, you may handle this case accordingly
    return '';
  }
}
