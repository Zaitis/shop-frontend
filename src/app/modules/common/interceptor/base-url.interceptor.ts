import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only modify requests that start with /api/
    if (req.url.startsWith('/api/')) {
      let modifiedUrl = req.url;
      
      if (environment.production) {
        // In production, remove the /api/ prefix since backend doesn't have it
        modifiedUrl = environment.apiUrl + req.url.substring(4); // Remove '/api'
      } else {
        // In development, use the full URL (proxy handles the rewrite)
        modifiedUrl = environment.apiUrl + req.url;
      }
      
      const modifiedRequest = req.clone({
        url: modifiedUrl
      });
      
      return next.handle(modifiedRequest);
    }
    
    return next.handle(req);
  }
} 