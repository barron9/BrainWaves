/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Segment, Header, Menu, Icon, Button, Grid } from 'semantic-ui-react';
import styles from '../styles/common.css';

enum HELP_STEP {
  MENU,
  SIGNAL_EXPLANATION,
  SIGNAL_SALINE,
  SIGNAL_CONTACT,
  SIGNAL_MOVEMENT,
  LEARN_BRAIN,
  LEARN_BLINK,
  LEARN_THOUGHTS,
  LEARN_ALPHA,
}

interface Props {
  handleClose: () => void;
}

interface State {
  helpStep: HELP_STEP;
}

// TODO: Refactor this into a more reusable Sidebar component that can be used in Collect, Clean, and Analyze screen
export class HelpSidebar extends Component<Props, State> {
  // props: Props;

  constructor(props) {
    super(props);
    this.state = {
      helpStep: HELP_STEP.MENU,
    };
    this.handleStartLearn = this.handleStartLearn.bind(this);
    this.handleStartSignal = this.handleStartSignal.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleStartSignal() {
    this.setState({ helpStep: HELP_STEP.SIGNAL_EXPLANATION });
  }

  handleStartLearn() {
    this.setState({ helpStep: HELP_STEP.LEARN_BRAIN });
  }

  handleNext() {
    if (
      this.state.helpStep === HELP_STEP.SIGNAL_MOVEMENT ||
      this.state.helpStep === HELP_STEP.LEARN_ALPHA
    ) {
      this.setState({ helpStep: HELP_STEP.MENU });
    } else {
      this.setState((prevState) => ({
        ...prevState,
        helpStep: prevState.helpStep + 1,
      }));
    }
  }

  handleBack() {
    this.setState((prevState) => ({
      ...prevState,
      helpStep: prevState.helpStep - 1,
    }));
  }

  renderMenu() {
    return (
      <>
        <Menu secondary vertical fluid>
          <Header className={styles.helpHeader} as="h1">
            What would you like to do?
          </Header>
          <Menu.Item onClick={this.handleStartSignal}>
            <Segment basic className={styles.helpMenuItem}>
              <Icon name="star outline" size="large" />
              Improve the signal quality of your sensors
            </Segment>
          </Menu.Item>
          <Menu.Item onClick={this.handleStartLearn}>
            <Segment basic className={styles.helpMenuItem}>
              <Icon name="exclamation triangle" size="large" />
              Learn about how the subjects movements create noise
            </Segment>
          </Menu.Item>
        </Menu>
      </>
    );
  }

  renderHelp(header: string, content: string) {
    return (
      <>
        <Segment basic className={styles.helpContent}>
          <Header className={styles.helpHeader} as="h1">
            {header}
          </Header>
          {content}
        </Segment>
        <Grid columns="equal">
          <Grid.Column>
            <Button fluid secondary onClick={this.handleBack}>
              Back
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button fluid primary onClick={this.handleNext}>
              Next
            </Button>
          </Grid.Column>
        </Grid>
      </>
    );
  }

  renderHelpContent() {
    switch (this.state.helpStep) {
      case HELP_STEP.SIGNAL_EXPLANATION:
        return this.renderHelp(
          'Improve the signal quality',
          'In order to collect quality data, you want to make sure that all electrodes have  a strong connection'
        );
      case HELP_STEP.SIGNAL_SALINE:
        return this.renderHelp(
          'Tip #1: Saturate the sensors in saline',
          'Make sure the sensors are thoroughly soaked with saline solution. They should be wet to the touch'
        );
      case HELP_STEP.SIGNAL_CONTACT:
        return this.renderHelp(
          'Tip #2: Ensure the sensors are making firm contact',
          'Re-seat the headset to make sure that all sensors contact the head with some tension. Take extra care to make sure the reference electrodes (the ones right behind the ears) make proper contact.  You may need to sweep hair out of the way to accomplish this'
        );
      case HELP_STEP.SIGNAL_MOVEMENT:
        return this.renderHelp(
          'Tip #3: Stay still',
          'To reduce noise during your experiment, ensure your subject is relaxed and has both feet on the floor. Sometimes, focusing on relaxing the jaw and the tongue can improve the EEG signal'
        );
      case HELP_STEP.LEARN_BRAIN:
        return this.renderHelp(
          'Your brain produces electricity',
          'Using the device that you are wearing, we can detect the electrical activity of your brain.'
        );
      case HELP_STEP.LEARN_BLINK:
        return this.renderHelp(
          'Try blinking your eyes',
          'Does the signal change? Eye movements create noise in the EEG signal'
        );
      case HELP_STEP.LEARN_THOUGHTS:
        return this.renderHelp(
          'Try thinking of a cat',
          "Does the signal change? Although EEG can measure overall brain activity, it's not capable of reading minds"
        );
      case HELP_STEP.LEARN_ALPHA:
        return this.renderHelp(
          'Try closing your eyes for 10 seconds',
          'You may notice a change in your signal due to an increase in alpha waves'
        );
      case HELP_STEP.MENU:
      default:
        return this.renderMenu();
    }
  }

  render() {
    return (
      <Segment basic padded vertical className={styles.helpSidebar}>
        <Segment basic className={styles.closeButton}>
          <Button
            circular
            size="large"
            icon="x"
            onClick={this.props.handleClose}
          />
        </Segment>
        {this.renderHelpContent()}
      </Segment>
    );
  }
}

export const HelpButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      circular
      icon="question"
      className={styles.helpButton}
      floated="right"
      onClick={onClick}
    />
  );
};
