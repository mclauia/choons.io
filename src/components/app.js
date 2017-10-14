import React from 'react';
import { Grid, Row, Col, Navbar, Tabs, Tab } from 'react-bootstrap';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';

import Tunes from './tunes';
import TuneAdd from './tunes/add';
// import Practice from './practice';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './app.css';

export default withRouter(({ history }) => {
    const pathMatch = history.location.pathname.match(/^\/(\w+)/);
    const currentTab = pathMatch ? pathMatch[1] : 'tunes';
    return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Choons.io</Link>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
            <Grid>
                {/* <Row className="pad-bottom">
                    <Col xs={12} md={12}>
                        <Tabs id="ok" activeKey={currentTab} onSelect={(route) => history.push(`/${route}`)}>
                            <Tab eventKey={'tunes'} title="Tunes" />
                            <Tab eventKey={'practice'} title="Practice" />
                        </Tabs>
                    </Col>
                </Row> */}
                <Row>
                    <Col xs={12} md={12}>
                        <Switch>
                            <Route path="/tunes/add" component={TuneAdd} />
                            <Route path="/tunes/view/id" component={Tunes} />
                            <Route path="/tunes" component={Tunes} />
                            {/* <Route path="/practice" component={Practice} /> */}
                            <Redirect to="/tunes"/>
                        </Switch>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
});
