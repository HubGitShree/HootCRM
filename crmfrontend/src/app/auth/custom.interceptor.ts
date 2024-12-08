import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  if( req.url.includes('login') || req.url.includes('register') ){
    return next(req);
  }

  const token = localStorage.getItem('token');

  // we clone the request we made and add the token to the headers
  const clonereq = req.clone({ 
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
   })
  return next(clonereq);
};
