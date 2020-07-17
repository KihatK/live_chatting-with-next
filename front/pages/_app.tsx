import React, { FC } from 'react';
import { AppProps } from 'next/app';

import wrapper from '../store/makeStore';

interface Props extends AppProps {
    Component: FC,
};

const App = ({ Component }: Props) => {
    return (
        <Component/>
    );
}

export default wrapper.withRedux(App);