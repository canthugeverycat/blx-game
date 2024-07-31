#!/bin/bash

# Clean up unnecessary boilerplate files
rm -rf src/pages/api
rm -f src/pages/_app.tsx src/pages/_document.tsx public/vercel.svg public/favicon.ico public/next.svg

# Create the directory structure if not already existing
mkdir -p src/pages src/styles src/components

# Create the main page file (index.tsx)
cat << 'EOL' > src/pages/index.tsx
import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';
import SlotItem from '../components/SlotItem';
import gsap from 'gsap';
import * as Tone from 'tone';

const Home: React.FC = () => {
  const [numbers] = useState<number[]>(Array.from({ length: 20 }, (_, i) => i + 1));
  const [spinning, setSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);

  const isPrime = (num: number): boolean => {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const playSound = () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  };

  const spin = () => {
    setSpinning(true);
    setResult(null);
    const targetNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const minSpins = 40; // Minimum spins (2 full cycles)
    const totalNumbers = numbers.length;
    const duration = 5; // Duration of the spin in seconds

    const tl = gsap.timeline({
      onComplete: () => {
        setSpinning(false);
        setResult(targetNumber);
      }
    });

    tl.to(`.${styles.numbersContainer}`, {
      x: `-=${(totalNumbers * 2 + targetNumber - 1) * 100}px`,
      duration: duration,
      ease: "power1.inOut",
      onUpdate: playSound
    });
  };

  return (
    <div className={styles.container}>
      <h1>Primo!</h1>
      <div className={styles.spinner}>
        <div className={styles.numbersContainer}>
          {numbers.concat(numbers).map((number, index) => (
            <SlotItem key={index} number={number} />
          ))}
        </div>
      </div>
      <button onClick={spin} disabled={spinning}>Spin</button>
      {result !== null && (
        <h2>
          {isPrime(result) ? "You win!" : "You lose!"} The number is {result}.
        </h2>
      )}
    </div>
  );
};

export default Home;
EOL

# Create the SlotItem component (SlotItem.tsx)
cat << 'EOL' > src/components/SlotItem.tsx
import React from 'react';
import styles from '../styles/SlotItem.module.scss';

interface SlotItemProps {
  number: number;
}

const SlotItem: React.FC<SlotItemProps> = ({ number }) => {
  return (
    <div className={styles.slotItem}>
      {number}
    </div>
  );
};

export default SlotItem;
EOL

# Create the SCSS module for the main page (Home.module.scss)
cat << 'EOL' > src/styles/Home.module.scss
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;

  h1 {
    color: #333;
  }
}

.spinner {
  overflow: hidden;
  width: 300px; /* Showing 3 numbers */
  height: 100px;
  border: 2px solid #000;
  border-radius: 10px;
  background-color: #fff;
}

.numbersContainer {
  display: flex;
  transform: translateX(0);
}

button {
  padding: 10px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
}

h2 {
  margin-top: 20px;
  font-size: 2rem;
  color: #0070f3;
}
EOL

# Create the SCSS module for the SlotItem component (SlotItem.module.scss)
cat << 'EOL' > src/styles/SlotItem.module.scss
.slotItem {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
}
EOL

# Inform the user that the setup is complete
echo "Primo! game setup completed with TypeScript support."