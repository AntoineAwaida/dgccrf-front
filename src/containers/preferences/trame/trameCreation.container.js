import React from 'react';
import { Container, Button, Icon, Input, Responsive } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../../navbar/actions';
import { connect } from 'react-redux';

import TrameComponent from './trame';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: () => dispatch(changeNameOfPage('Création de trame')),
    changeBackUrl: () => dispatch(changeBackUrl('/nouvelle-visite')),
    changeActivePage: () =>
      dispatch(changeActivePage('mesDossiers', '/creation-trame'))
  };
}

class TrameCreationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      index: 0,
      id: 0,
      trameName: ''
    };
    this.validateName = this.validateName.bind(this);
    this.changeType = this.changeType.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  componentDidMount() {
    this.props.changeNameOfPage();
    this.props.changeBackUrl();
    this.props.changeActivePage();
  }

  validateName(task, name) {
    let taskList = this.state.taskList;
    taskList = taskList.filter(t => {
      if (t == task) {
        t.title = name;
      }

      return t;
    });

    this.setState({ taskList });
  }

  handleNameChange(e, data) {
    this.setState({ trameName: data.value });
  }

  handleTextChange(task, text) {
    let taskList = this.state.taskList;
    taskList = taskList.filter(t => {
      if (t == task) {
        t.innerContent = text;
      }

      return t;
    });
    this.setState({ taskList });
  }

  changeType(task, type) {
    let taskList = this.state.taskList;
    taskList = taskList.filter(t => {
      if (t == task) {
        t.type = type;
      }

      return t;
    });

    this.setState({ taskList });
  }

  addTask() {
    //de 3 types: basic, text, ou document.
    this.setState({
      taskList: [
        ...this.state.taskList,
        {
          title: 'Nouvelle tâche' + this.state.index,
          type: 'basic',
          innerContent: '',
          index: this.state.index,
          id: this.state.id
        }
      ],
      index: this.state.index + 1,
      id: this.state.id + 1
    });
  }

  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const res = Array.from(this.state.taskList);

    const [removed] = res.splice(result.source.index, 1);
    res.splice(result.destination.index, 0, removed);

    this.setState({ taskList: res });
  };

  render() {
    return (
      <div
        className="hidescrollbar"
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',

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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
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
                  flexDirection: 'row',

                  padding: 20
                }}
              >
                <Responsive minWidth={400}>
                  <div style={{ flex: 0.3 }}></div>
                </Responsive>
                <div style={{ flex: 1 }}>
                  <Input
                    style={{ width: 150 }}
                    placeholder="Nom de la trame..."
                    value={this.state.trameName}
                    onChange={this.handleNameChange}
                  ></Input>
                  <Button
                    style={{ marginLeft: 5 }}
                    color="teal"
                    icon
                    onClick={() => this.addTask()}
                  >
                    <Icon name="plus" color="white"></Icon>
                  </Button>
                </div>
                <div
                  style={{
                    flex: 0.3,
                    justifyContent: 'flex-end',
                    display: 'flex'
                  }}
                >
                  <Button
                    color="red"
                    disabled={
                      this.state.trameName.length === 0 ||
                      this.state.taskList.length === 0
                    }
                    icon
                  >
                    <Icon name="save" color="white"></Icon>
                  </Button>
                </div>

                {/* <Tabs
                  value={this.state.activeIndex}
                  fullWidth
                  onChange={this.handleChange}
                >
                  <Tab label="Avant" />
                  <Tab label="Pendant" />
                  <Tab label="Après" />
                </Tabs> */}
              </div>
              <div
                style={{
                  flex: 10,
                  overflowY: 'auto',
                  marginTop: 80,

                  width: '100%'
                }}
                className="hidescrollbar"
              >
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="droppable">
                    {provided => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <TrameComponent
                          validateName={this.validateName}
                          taskList={this.state.taskList}
                          changeType={this.changeType}
                          handleTextChange={this.handleTextChange}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

TrameCreationComponent.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrameCreationComponent);
