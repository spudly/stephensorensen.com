import React from 'react';
import * as widgets from '../widgets';

// eslint-disable-next-line react/display-name
const buildWidget = widgetDescriptor => {
  if (typeof widgetDescriptor === 'string') {
    return widgetDescriptor;
  }

  const {id, widgetType, props, childWidgets} = widgetDescriptor;
  const WidgetComponent = widgets[widgetType] || widgetType;

  return (
    <WidgetComponent key={id} {...props}>
      {childWidgets && childWidgets.map(buildWidget)}
    </WidgetComponent>
  );
};

export default buildWidget;
