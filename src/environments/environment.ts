// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'mock-trading-a9bc3',
    appId: '1:269578133250:web:7442df69a26a1ddbc62c1b',
    storageBucket: 'mock-trading-a9bc3.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyCW2FkBiFTbQYhxNlGDi7Tp8FYTDUIev08',
    authDomain: 'mock-trading-a9bc3.firebaseapp.com',
    messagingSenderId: '269578133250',
    measurementId: 'G-DY875EDE80',
  },
  production: false,
  apiUrl: 'http://localhost:4000/mocktrading/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
