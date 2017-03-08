const React = require('react');
const widgets = require('../widgets');

// eslint-disable-next-line react/display-name
const buildWidget = widgetDescriptor => {
  if (typeof widgetDescriptor === 'string') {
    return widgetDescriptor;
  }

  const {id, widgetType, props, childWidgets} = widgetDescriptor;
  const WidgetComponent = widgets[widgetType] || widgetType;

  return React.createElement(
    WidgetComponent,
    Object.assign({key: id}, props),
    childWidgets && childWidgets.map(buildWidget)
  );
};

module.exports = buildWidget;
