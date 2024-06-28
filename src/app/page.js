"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

function Page() {
  const beanVariants = ["Hundemad", "Tandpasta", "Bræk", "Brugt Ble", "Blæksprutte", "Beskidt Bandage", "Carolina Reaper", "Valgfri"];
  const [bean, setBean] = useState(Math.floor(Math.random() * beanVariants.length));
  const [dogFoodMode, setDogFoodMode] = useState(false);
  const [showDogMode, setShowDogMode] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    if (!spinning) {
      setSpinning(true);

      // Simulate spinning effect with setTimeout
      let delay = 100; // Initial delay before cycling starts
      let cycleCount = 10; // Number of cycles before settling on a random number
      let cycleIndex = 0;

      const cycleNext = () => {
        setTimeout(() => {
          setBean(cycleIndex % beanVariants.length); // Cycling through beanVariants
          cycleIndex++;

          if (cycleIndex < cycleCount) {
            cycleNext();
          } else {
            if (dogFoodMode) {
              setBean(0);
              setSpinning(false);
            } else {
              let randomNumber = Math.floor(Math.random() * beanVariants.length);
              setBean(randomNumber);
              setSpinning(false);
            }
          }
        }, delay);
        delay += 50; // Increase delay for each cycle to create a sense of animation
      };

      cycleNext();
    }
  };

  return (
    <>
      <main className={styles.mainWrapper} onDoubleClick={() => setShowDogMode((old) => !old)}>
        {showDogMode && (
          <p className={styles.dogFoodModeText}>
            Dog-Food-Mode: <span className={dogFoodMode ? styles.greenText : styles.redText}>{dogFoodMode ? "Activated" : "Deactivated"}</span>
          </p>
        )}
        <h1 className={`${styles.beanHeading} ${spinning && styles.spinningBean}`} onClick={() => setDogFoodMode((old) => !old)}>
          {beanVariants[bean]}
        </h1>

        <button className={`${styles.spinButton} ${spinning && styles.spinning} ${dogFoodMode && styles.dogFoodMode}`} onClick={spinWheel} disabled={spinning}>
          {spinning ? "Spinning..." : "Spin"}
        </button>
      </main>
    </>
  );
}

export default Page;
