import React from 'react';

import {RootNavigatorRoutes} from '../enums';

export const navigationRef = React.createRef();

export const navigate = (name: RootNavigatorRoutes, params?: any, screen?: any) => {
    screen
        ? navigationRef.current?.navigate(
            name,
            {screen, params},
        )
        : navigationRef.current?.navigate(name, params);
};

export const goBack = () => {
    navigationRef.current?.goBack();
};
