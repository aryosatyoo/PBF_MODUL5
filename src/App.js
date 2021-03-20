import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function NestingAuthExample() {
  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <br />
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link">
                    <Link to="/home">HOME</Link>
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">
                    <Link to="/prodact">SHOP</Link>
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item ml-2 mt-2">
                  <AuthButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <hr />

      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/prodact">
          <Prodact />
        </Route>
        <PrivateRoute path="/private">
          <ProtectedPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  return fakeAuth.isAuthenticated ? (
    <button
      onClick={() => {
        fakeAuth.signout(() => history.push(from));
      }}
    >
      Sign out
    </button>
  ) : (
    <p>Kamu belum login</p>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function ProtectedPage() {
  return <h3>Private</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/prodact" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <center>
        <p>Silahkan Login Dulu! {from.pathname}</p>
        <button type="button" class="btn btn-secondary" onClick={login}>Log in</button>
      </center>
    </div>
  );
}

function Home() {
  const isLoggedIn = fakeAuth.isAuthenticated;
  return (
    <div>
      <center>
        <div class="container">
          <img src="https://bacilebetta.files.wordpress.com/2011/01/cropped-betta-header.jpg"
            alt="content" />
          <h1> CUPANG STORE!</h1>
          <br></br><p>Ini adalah Toko Ikan Cupang dengan berbagai jenis pilihan</p>
          <br></br><p>Silahkan pilih ikan cupang favoritmu :)</p>
        </div>
      </center>
    </div>
  );
}

function Prodact() {
  let { path, url } = useRouteMatch();
  const isLoggedIn = fakeAuth.isAuthenticated;
  if (isLoggedIn == true) {
    return (
      <div>
        <center>
          <h4>Silahkan pilih !</h4>
          <div class="card card-group">
            <div class="card">
              <Link to={`${url}/Harga : Rp. 150.000`}>
                <img src="https://assets-a1.kompasiana.com/items/album/2021/01/02/5fb73ab6933c4-5fef556ed541df6a16748684.jpg" 
                  alt="Cupang1" width="400px" height="400px" /><br></br>
                <h5>CUPANG HIJAU</h5>
              </Link>
            </div>

            <div class="card">
              <Link to={`${url}/Harga : Rp. 130.000`}>
                <img src="https://saran.id/downloadpng/wallpaper/20201112/gambar-ikan-cupang-betina-wallpaper-cara-membedakan-ikan-cupang-jantan-dan-betina-harga-jual-png-preview.jpg"
                  alt="Cupang2" width="400px" height="400px"/><br></br>
                <h5>CUPANG MERAH</h5>
              </Link>
            </div>

            <div class="card">
              <Link to={`${url}/Harga : Rp. 120.000`}>
                <img src="https://i.pinimg.com/474x/0e/05/a2/0e05a21a58041075c51334d8c22322ca.jpg"
                  alt="Cuoang3" width="400px" height="400px" /><br></br>
                <h5>CUPANG BIRU</h5>
              </Link>
              <br></br>
              <br />
            </div>
          </div>
          <br></br>

          <div className="bgLink">
            <Switch>
              <Route exact path="{path}">
                <h3>Silahkan Pilih Cupang Favoritmu!</h3>
              </Route>

              <Route path={`${path}/:prodactId`}>
                <Prodacts />
              </Route>
            </Switch>
          </div>
        </center>
      </div>
    );
  }
  return (
    <div>
      <center>
        <h2>CUPANG STORE</h2>
        <Link to="/login">
          <button className="btn btn-warning">Login terlebih dahulu</button>
        </Link>
      </center>
    </div>
  );
}

function Prodacts() {
  let { prodactId } = useParams();

  return (
    <div>
      <h3>{prodactId}</h3>
    </div>
  );
}