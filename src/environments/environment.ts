// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAxNoi3KCD-tGrjK3wM4PwyiZKgw6R4CNc',
    authDomain: 'angular-task-manager-d99eb.firebaseapp.com',
    projectId: 'angular-task-manager-d99eb',
    storageBucket: 'angular-task-manager-d99eb.appspot.com',
    messagingSenderId: '500740485137',
    appId: '1:500740485137:web:deedc0c9935dea043d41b0',
    measurementId: 'G-GVFEGTRZJH'
  },
  firestorePaths: {
    users: 'users',
    tasks: 'tasks'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
