import { Route } from '@vaadin/router';
import './not-found/not-found.js';
import './tree-example/tree-example';

export const routes: Route[] = [
  { path: 'tree-example', component: 'app-tree-example', name: 'Tree example' },
  { path: '', redirect: 'tree-example' },
  // The fallback route should always be after other alternatives.
  { path: '(.*)', component: 'app-not-found' }
];
