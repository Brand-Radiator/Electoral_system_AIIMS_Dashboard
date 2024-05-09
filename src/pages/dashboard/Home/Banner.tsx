import React, { useState } from 'react';

function Banner() {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React TypeScript Counter</h1>
        <p>Count: {count}</p>
        <button onClick={handleIncrement}>Increment</button>
      </header>
    </div>
  );
}

export default Banner;
