export function render(Store, renderer) {  return (Comp, props = {}, node = 'root') => {    if (!Store.objects.defaultComponent) Store.objects.defaultComponent = Comp;    const isString = typeof node === 'string';    const parentNode = isString ? document.getElementById(node) : node;    const Component = Comp || Store.objects.defaultComponent;    renderer(Component(props), parentNode);  };}