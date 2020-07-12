import React from 'react';
import { Main } from '@miau/components';

export interface AppProps {
  text: string;
}

export const App: React.FunctionComponent<AppProps> = ({ text }) => <Main text={text} />;
