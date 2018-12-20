import React from 'react';
import { history } from './history';
import './index.css';

class Layout extends React.PureComponent {
  onClickHandler = (event, path) => {
    event.preventDefault();
    history.push(path);
  };

  render() {
    const { pathname } = history.location;
    const { routes, children } = this.props;

    return (
      <div className="container">
        <nav>
          <ul>
            {routes.map((r, i) => (
              <li key={i} className={r.path === pathname ? 'active' : ''}>
                <a className="link" href={r.path} onClick={e => this.onClickHandler(e, r.path)}>
                  {r.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main>{children}</main>
      </div>
    );
  }
}

export default Layout;
