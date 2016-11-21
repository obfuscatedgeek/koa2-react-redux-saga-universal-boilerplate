import React from 'react';

import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import waitAll from '../../shared/sagas/waitAll';
import configureStore from '../../shared/configureStore';
import routes from '../../shared/routes.jsx';

const renderer = (ctx, next) => {
  const store = configureStore();

  match({routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
    if (error) ctx.res.status(500).send('Error occurred!!!!', error);
    else if (redirectLocation) ctx.res.redirect(302, redirectLocation.pathName + redirectLocation.search);
    else if (renderProps) {
      const root_component = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const preloaders = renderProps.components
        // return all components that have preload
        .filter((component) => component && component.preload)
        // got through all the components with preload and get the preloaders
        .map((component) => component.preload(renderProps.params, ctx.req))
        // combine all preloaders into 1 array
        .reduce((result, preloader) => result.concat(preloader), []);

      store.runSaga(waitAll(preloaders)).done.then(() => {
        const state = store.getState();
        ctx.render('index', {html: renderToString(root_component), state: JSON.stringify(state)});
      });            
    } else  {
      ctx.status = 404;
      ctx.body = 'Not found!!!';
    }
  });
};

export default renderer;
