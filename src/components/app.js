import React from 'react';
import { Grid, Row, Col, Nav, NavItem, Navbar, Tabs, Tab } from 'react-bootstrap';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';

import Tunes from './tunes';
import TuneAdd from './tunes/add';

import ReadTunes from './tunes/read';
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
                <Navbar.Collapse>
                    <Navbar.Text><Link to="/my/tunes">Back to My Choons</Link></Navbar.Text>
                </Navbar.Collapse>
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
                            <Route path="/my/tunes/add" component={TuneAdd} />
                            <Route path="/my/tunes" component={Tunes} />
                            <Route path="/:userId/tunes" component={Tunes} />
                            <Redirect to="/my/tunes"/>
                        </Switch>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
});
