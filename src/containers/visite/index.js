import React from 'react';
import TrameComponent from './trame';
import { Grid, Card, Container } from 'semantic-ui-react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { EventEmitter } from 'events';
import FileNavigationComponent from '../fileNavigation';
import Photo from './photo/photo';
import Documents from './documents/documents.container';
import { PropTypes } from 'prop-types';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../navbar/actions';
import { connect } from 'react-redux';

import './trame/visite.css';

function mapStateToProps(state) {
  return {
    backUrl: state.navbarReducer.activePages.mesDossiers,
    oldBackUrl: state.navbarReducer.backPage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: value => dispatch(changeBackUrl(value)),
    changeActivePage: value => dispatch(changeActivePage('mesDossiers', value))
  };
}

class Visite extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._emitter = new EventEmitter();
    this.state = {
      activeIndex: 0,
      activeTab: 0
    };
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  componentDidMount() {
    this.props.changeNameOfPage('Visite ' + this.props.match.params.id);
    const newBackUrl = (backUrl, oldBackUrl) => {
      if (backUrl.includes('/dossier')) {
        return backUrl;
      }
      if (oldBackUrl.includes('/dossier')) {
        return oldBackUrl;
      } else {
        return '/mes-dossiers';
      }
    };
    this.props.changeBackUrl(
      newBackUrl(this.props.backUrl, this.props.oldBackUrl)
    );
    this.props.changeActivePage('/visite/' + this.props.match.params.id);
  }

  handleChangeIndex = value => {
    this.setState({
      activeIndex: value
    });
  };

  handleChange = (event, value) => {
    this.setState({
      activeIndex: value
    });
  };

  setActiveTab = index => {
    this.setState({ activeTab: index });
  };

  render() {
    return (
      <div
        className="hidescrollbar"
        style={{
          display: 'flex',
          height: '100%',

          backgroundColor: '#f2f2f2',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '100%',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Container style={{ height: '100%' }}>
            {this.state.activeTab === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  overflow: 'auto',
                  height: '100%'
                }}
              >
                <div
                  style={{
                    position: 'fixed',
                    zIndex: 10,
                    width: '100%',
                    backgroundColor: '#f2f2f2',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Tabs
                    value={this.state.activeIndex}
                    fullWidth
                    onChange={this.handleChange}
                  >
                    <Tab label="Avant" />
                    <Tab label="Pendant" />
                    <Tab label="Après" />
                  </Tabs>
                </div>
                <div
                  style={{
                    flex: 10,
                    overflowY: 'auto',
                    marginTop: 80,
                    paddingBottom: 105
                  }}
                  className="hidescrollbar"
                >
                  <TrameComponent
                    index={this.state.activeIndex}
                    handleChangeIndex={this.handleChangeIndex}
                  />
                </div>
              </div>
            ) : this.state.activeTab === 1 ? (
              <Photo
                setActiveTab={this.setActiveTab}
                visiteid={parseInt(this.props.match.params.id)}
              />
            ) : (
              <Documents visiteid={parseInt(this.props.match.params.id)} />
            )}
          </Container>
          <FileNavigationComponent
            setActiveTab={this.setActiveTab}
            activeItem={this.state.activeTab}
          />
        </div>
      </div>
    );
  }
}

Visite.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  backUrl: PropTypes.string.isRequired,
  oldBackUrl: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visite);
