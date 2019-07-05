import React from 'react';
import Menu from './containers/menu';
import Dossiers from './containers/mes-dossiers';
import { Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router-dom';
import MonDossier from './containers/dossier';
import CreateVisite from './containers/dossier/createVisite.container';
import CreateTrame from './containers/preferences/trameCreation.container';
import MaVisite from './containers/visite';
import EntrepriseView from './containers/entreprise';
import EntrepriseViewComponent from './containers/entreprise/entrepriseView.container';
import AuthComponent from './containers/auth/auth.container';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    AGENT_DD_IDENT: state.dataReducer.AGENT_DD_IDENT
  };
}

let RoutingComponent = props =>
  !props.AGENT_DD_IDENT ? (
    <AuthComponent />
  ) : (
    <Switch>
      <Route exact path="/etablissements" component={EntrepriseView} />
      <Route
        exact
        path="/etablissement/:id"
        component={EntrepriseViewComponent}
      />
      <Route exact path="/menu" component={Menu} />
      <Route exact path="/mes-dossiers" component={Dossiers} />
      <Route exact path="/dossier/:id" component={MonDossier} />
      <Route exact path="/visite/:id" component={MaVisite} />
      <Route exact path="/nouvelle-visite" component={CreateVisite} />
      <Route exact path="/nouvelle-trame" component={CreateTrame} />
      <Route render={() => <Redirect to="/menu" />} />
    </Switch>
  );

RoutingComponent.propTypes = {
  AGENT_DD_IDENT: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(RoutingComponent);