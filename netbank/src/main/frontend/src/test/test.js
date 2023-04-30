import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/offcanvas';
import './test.css';

const Test = () => {
  useEffect(() => {
    const myOffcanvas = document.getElementById('offcanvasExample');
    window.Offcanvas.getInstance(myOffcanvas).show();
  }, []);

  return (
    <>
      <header className="main-page-header mb-3 bg-primary">
        <div className="container d-flex align-items-center">
          <div className="company-name">Net-Bdank</div>
          <nav className="navigation">
            <li>
              <a href="">Dashboard</a>
            </li>
            <li>
              <a href="">Payment History</a>
            </li>
            <li>
              <a href="">Transaction History</a>
            </li>
          </nav>
          <div className="display-name ms-auto text-white">
            <i className="fa fa-circle text-success me-2"></i> Welcome:{' '}
            <span>Frank Butt</span>
          </div>

          <a href="" className="btn btn-sm text-white align-items-right">
            <i className="fas fa-sign-out-alt me-2" aria-hidden="true"></i> Sign
            Out
          </a>
        </div>
      </header>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Transaction
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>This is the content of the offcanvas.</p>
        </div>
      </div>
    </>
  );
};

export default Test;