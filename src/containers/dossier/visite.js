import React, { Component } from 'react';
import {
  Grid,
  Segment,
  Responsive,
  Icon,
  Header,
  Button
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MyLink from '../../components/visites/myLink.component';

export default class Visite extends Component {
  render() {
    const { visite } = this.props;

    return (
      <Grid.Row style={{ padding: 10, overflow: 'auto' }}>
        <Segment
          style={{ width: '100%' }}
          // to={this.props.link}
          // icon
          // basic
          // fluid
          // className="menubutton"
          // color={this.props.color}
          // size="massive"
        >
          <MyLink {...this.props} trames={this.props.trames} visite={visite}>
            <Grid>
              <Grid.Row
                verticalAlign="middle"
                style={{
                  padding: 0,
                  backgroundColor: !visite.visiteData.new_visite && '#f2f2f2'
                }}
              >
                <Grid.Column
                  width={3}
                  style={{
                    backgroundColor: '#f2f2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}
                >
                  <Responsive minWidth={600}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {!visite.visiteData.new_visite && (
                        <Icon name="lock" color="grey" size="large"></Icon>
                      )}
                      <Icon name="search" color="grey" size="large"></Icon>
                      <div
                        style={{
                          borderRadius: '50%',

                          width: '20px',
                          height: '20px',

                          background: 'red',
                          color: 'white'
                        }}
                      >
                        {visite.controles.length}
                      </div>
                    </div>
                  </Responsive>
                  <Responsive maxWidth={599}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {!visite.visiteData.new_visite && (
                        <Icon
                          name="lock"
                          color="grey"
                          size="small"
                          style={{ fontSize: '1em' }}
                        ></Icon>
                      )}
                      <Icon
                        name="search"
                        color="grey"
                        size="small"
                        style={{ fontSize: '1em' }}
                      ></Icon>
                      <div
                        style={{
                          borderRadius: '50%',

                          width: '20px',
                          height: '20px',

                          background: 'red',
                          color: 'white'
                        }}
                      >
                        {visite.controles.length}
                      </div>
                    </div>
                  </Responsive>
                </Grid.Column>
                <Grid.Column width={6} textAlign="left">
                  <Grid.Row>
                    <Header
                      as="h3"
                      style={{ color: 'grey', overflowWrap: 'break-word' }}
                    >
                      {visite.visiteData.ETOB_RAISON_SOCIALE}
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Header as="h6" style={{ fontWeight: 'normal' }}>
                      {visite.visiteData.VISITE_AGENT_LIBELLE}
                    </Header>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Grid.Row>
                    <Header as="h6" style={{ fontWeight: 'normal' }}>
                      {/* {this.props.dossier.ACDG_LIBELLE} */}
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Responsive minWidth={600}>
                      <Header as="h4" style={{ overflowWrap: 'break-word' }}>
                        {visite.visiteData.ETOB_ADR1}{' '}
                        {visite.visiteData.ETOB_ADR2}{' '}
                        {visite.visiteData.ETOB_ADR3} -{' '}
                        {visite.visiteData.ETOB_ADRVILLE}
                      </Header>
                    </Responsive>
                    <Responsive
                      maxWidth={600}
                      style={{ overflowWrap: 'break-word' }}
                    >
                      <Header as="h5">
                        {visite.visiteData.ETOB_ADR1}{' '}
                        {visite.visiteData.ETOB_ADR2}{' '}
                        {visite.visiteData.ETOB_ADR3} -{' '}
                        {visite.visiteData.ETOB_ADRVILLE}
                      </Header>
                    </Responsive>
                  </Grid.Row>
                  <Grid.Row>
                    <Header
                      as="h4"
                      style={{ fontWeight: 'normal', fontStyle: 'italic' }}
                    >
                      {moment(
                        visite.visiteData.VISITE_DATE_INTERVENTION
                      ).format('DD/MM/YYYY')}
                    </Header>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column
                  as={Link}
                  to={'/modify-visite/' + visite.visiteData.VISITE_IDENT}
                  width={1}
                  floated="right"
                >
                  <Icon name="pencil"></Icon>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </MyLink>
        </Segment>
      </Grid.Row>
    );
  }
}

Visite.propTypes = {
  trames: PropTypes.array,
  visite: PropTypes.shape({
    visiteData: PropTypes.shape({
      ETOB_RAISON_SOCIALE: PropTypes.string,
      VISITE_DATE_INTERVENTION: PropTypes.string,
      ETOB_ADR1: PropTypes.string,
      ETOB_ADR2: PropTypes.string,
      ETOB_ADRVILLE: PropTypes.string
    })
  })
};
