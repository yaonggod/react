import Card from './Card';

import useCounter from '../hooks/use-counter';

const ForwardCounter = () => {
  return <Card>{useCounter(1)}</Card>;
};

export default ForwardCounter;
