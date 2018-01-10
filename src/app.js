/**
 * @overview Application entry point.
 */

// Global application styles
import 'src/app.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
// Angular 2
import 'src/shim';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from 'src/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
