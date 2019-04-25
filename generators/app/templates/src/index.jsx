import React from 'react';

import studio from '@invisionapp/studio-api';
import {
  Button,
  FlexBox,
  FloatingWindow,
} from '@invisionapp/studio-api/components';

let count = 0;

class App extends React.Component {
  constructor() {
    super();
    this.state = { text: 'Click me!' };
  }

  onClick = () => {
    count += 1;
    this.setState({ text: `You've clicked me ${count} times!` });
  }

  render() {
    const { text } = this.state;
    return (
      <FloatingWindow>
        <FlexBox style={{padding: '10px', width: '400px'}}>
          <Button onClick={this.onClick} text={text} />
        </FlexBox>
      </FloatingWindow>
    );
  }
}

studio.core.onWillShow((event) => {
  event.render(<App />);
});
