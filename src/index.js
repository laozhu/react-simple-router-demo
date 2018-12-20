import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { history } from './history';
import Layout from './layout';
import Loading from './pages/loading';

// Pages
const Home = React.lazy(() => import('./pages/home' /* webpackChunkName: "home" */));
const Blog = React.lazy(() => import('./pages/blog' /* webpackChunkName: "blog" */));
const About = React.lazy(() => import('./pages/about' /* webpackChunkName: "about" */));

// Routes
const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'Blog', path: '/blog', component: Blog },
  { name: 'About', path: '/about', component: About },
];

// Simple Router
const Router = ({ path }) => {
  const currentRoute = routes.filter(route => route.path === path);
  if (currentRoute.length === 0) return <div>404 not found.</div>;
  const PageComponent = currentRoute[0].component;
  return <PageComponent />;
};

// App entry
const App = () => (
  <Layout routes={routes}>
    <Suspense fallback={<Loading />}>
      <Router path={history.location.pathname} />
    </Suspense>
  </Layout>
);

const rootElement = document.getElementById('root');
const render = app => ReactDOM.render(app, rootElement);
render(<App />);
history.listen(location => render(<App />));
