/* eslint-disable max-statements, no-param-reassign */

const reconcileProps = (vElement, element) => {
  Object.keys(vElement.props).forEach(prop => {
    const eventMatch = prop.match(/^on([A-Z]\w+)/);
    if (eventMatch) {
      // TODO: need a way to remove event listeners when they change or are removed
      element.addEventListener(eventMatch[1].toLowerCase(), vElement.props[prop]);
    } else if (element[prop] !== vElement.props[prop]) {
      element[prop] = vElement.props[prop]; // eslint-disable-line no-param-reassign
    }
  });
};

const reconcileChildElement = (vElement, element, parent) => {
  if (typeof vElement === 'string') {
    if (element) {
      if (element.nodeType !== 3) {
        const el = document.createTextNode(vElement);
        parent.replaceChild(el, element);
        return el;
      }
      element.nodeValue = vElement;
      return element;
    }
    return parent.appendChild(document.createTextNode(vElement));
  }

  if (element && vElement && element.tagName.toLowerCase() !== vElement.type) {
    const el = document.createElement(vElement.type);
    element.replaceWith(el);
    return element;
  }

  if (vElement && !element) {
    return parent.appendChild(document.createElement(vElement.type));
  }

  if (!vElement && element) {
    element.remove();
    return null;
  }

  if (!element) {
    throw new Error('no element');
  }

  return element;
};

const reconcileChildren = (vChildren, parent) => {
  const children = [...parent.childNodes];
  for (let i = 0; i < children.length || i < vChildren.length; i++) {
    const vElement = vChildren[i];
    const element = reconcileChildElement(vElement, children[i], parent);
    if (element && element.nodeType === 1) {
      reconcileProps(vElement, element);
      reconcileChildren(vElement.children || [], element);
    }
  }
};

const render = (element, container) => reconcileChildren([element], container);

const createElement = (type, props, children) => ({type, props, children});

const handleClick = () => {
  render(
    createElement(
      'div',
      {style: 'cursor: default; position: fixed; top: 10px; left: 10px', onClick: handleClick},
      ['😎'],
    ),
    document.getElementById('container'),
  );
};

render(
  createElement(
    'div',
    {style: 'cursor: pointer; position: fixed; top: 10px; left: 10px', onClick: handleClick},
    ['😀'],
  ),
  document.getElementById('container'),
);
