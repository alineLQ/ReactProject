import { Button } from 'antd';
import * as React from 'react';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
      <Button type='primary'>按钮</Button>
    </div>
  );
}


