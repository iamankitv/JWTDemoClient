import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { Authservice } from '../services/authservice';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { switchMap } from 'rxjs/internal/operators/switchMap';

// export const authorizeInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(Authservice);
//   const token = localStorage.getItem('access_token');


//   if (token) {
//     req = req.clone({
//       setHeaders: { Authorization: `Bearer ${token}` }
//     });
//   }

//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       if (error.status === 401) {

//         return authService.generateRefreshToken().pipe(
//           switchMap((tokens) => {
//             if (tokens) {
//               authService.saveToken(tokens);

//               const newReq = req.clone({
//                 setHeaders: {
//                   Authorization: `Bearer ${tokens.access_token}`
//                 }
//               });
//               return next(newReq);
//             }
//             return throwError(() => error);
//           })
//         );
//       }
//       return throwError(() => error);
//     })
//   );
// };


export const authorizeInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Authservice);
  const token = localStorage.getItem('access_token');


  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {

        return authService.generateRefreshToken().pipe(
          switchMap((tokens) => {
            if (tokens) {
              authService.saveToken(tokens);

              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${tokens.accessToken}`
                }
              });
              return next(newReq);
            }
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
