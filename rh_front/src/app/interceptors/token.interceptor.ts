import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem("token");
  if (token) {
    let cloneRequest = req.clone(
      {
        headers: new HttpHeaders().append("Authorization", `bearer ${token}`)
      }
    );
    return next(cloneRequest)
  }

  return next(req);
};
