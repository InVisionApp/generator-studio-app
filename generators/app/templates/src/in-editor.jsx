import StudioApi from '@invisionapp/studio-api';
import { Button, FlexBox } from '@invisionapp/studio-api/components';
import React from 'react';

let count = 0;

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = { text: 'Click me!' };
  }

  onClick = () => {
    count += 1;
    this.setState({ text: `You've clicked me ${count} times!` });
  }

  render() {
    const text = this.state.text;
    return (<FlexBox padding="small" width="400px">
      <Button onClick={this.onClick} text={text} />
    </FlexBox>);
  }
}

StudioApi.ui.render(<App />, 'modal');
