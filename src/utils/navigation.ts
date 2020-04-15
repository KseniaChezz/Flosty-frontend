import React from 'react';

import {RootNavigatorRoutes} from '../enums';

export const navigationRef = React.createRef();

export const navigate = (name: RootNavigatorRoutes, params?: any) => {
    navigationRef.current?.navigate(name, params);
};
