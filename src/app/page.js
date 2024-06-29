"use client";
import { useState } from "react";
import styles from "./page.module.css";

function Page() {
  const beanVariants = [
    { name: "Hundemad", sound: "dog" },
    { name: "Tandpasta", sound: "toothpaste" },
    { name: "Bræk", sound: "vomit" },
    { name: "Brugt ble", sound: "diaper" },
    { name: "Blæksprutte", sound: "squid" },
    { name: "Beskidt bandage", sound: "bandage" },
    { name: "Carolina Reaper", sound: "pepper" },
    { name: "Valgfri!", sound: "choice" },
  ];

  const initialParticipants = [
    { name: "Billy", amount: "dog", chickens: 1 },
    { name: "Mathi", amount: "toothpaste", chickens: 1 },
    { name: "Timmy", amount: "vomit", chickens: 1 },
    { name: "Chills", amount: "diaper", chickens: 1 },
    { name: "Chris", amount: "squid", chickens: 1 },
  ];

  const [bean, setBean] = useState(Math.floor(Math.random() * beanVariants.length));
  const [dogFoodMode, setDogFoodMode] = useState(false);
  const [showDogMode, setShowDogMode] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [numberOfSpins, setNumberOfSpins] = useState(0);
  const [participants, setParticipants] = useState(initialParticipants);
  const [currentParticipant, setCurrentParticipant] = useState(Math.floor(Math.random() * participants.length));
  const [mustChoose, setMustChoose] = useState(false);

  const playSound = (soundName) => {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.play();
  };

  const spinWheel = () => {
    playSound("click");
    playSound("spin");
    setNumberOfSpins((old) => old + 1);
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
              playSound(beanVariants[0].sound);
              setMustChoose(true);
            } else {
              let randomNumber = Math.floor(Math.random() * beanVariants.length);
              setBean(randomNumber);
              setSpinning(false);
              playSound(beanVariants[randomNumber].sound);
              setMustChoose(true);
            }
          }
        }, delay);
        delay += 50; // Increase delay for each cycle to create a sense of animation
      };

      cycleNext();
    }
  };

  const handleClick = (input) => {
    playSound("click");
    if (input === "chicken") {
      playSound("chicken");
      setParticipants((prevParticipants) => {
        const updatedParticipants = [...prevParticipants];
        updatedParticipants[currentParticipant] = {
          ...updatedParticipants[currentParticipant],
          chickens: updatedParticipants[currentParticipant].chickens - 1,
        };
        return updatedParticipants;
      });
    }

    if (input === "man") {
      playSound("man");
    }

    if (currentParticipant === participants.length - 1) {
      setCurrentParticipant(0);
    } else {
      setCurrentParticipant((old) => old + 1);
    }
    setMustChoose(false);
  };

  return (
    <>
      <main className={styles.mainWrapper} onDoubleClick={() => setShowDogMode((old) => !old)}>
        <p className={styles.numberOfSpins}>{numberOfSpins}</p>
        <p className={styles.participant}>{participants[currentParticipant].name}</p>
        {showDogMode && (
          <p className={styles.dogFoodModeText}>
            Dog-Food-Mode: <span className={dogFoodMode ? styles.greenText : styles.redText}>{dogFoodMode ? "Activated" : "Deactivated"}</span>
          </p>
        )}
        <h1 className={`${styles.beanHeading} ${spinning && styles.spinningBean} ${bean === 7 && styles.winner}`} onClick={() => setDogFoodMode((old) => !old)}>
          {beanVariants[bean].name}
        </h1>
        {mustChoose && participants[currentParticipant].chickens > 0 ? <img className={styles.chicken} src="/pics/chicken.png" onClick={() => handleClick("chicken")} alt="Chicken" /> : null}
        {mustChoose ? (
          <button className={`${styles.spinButton} ${spinning && styles.spinning} ${dogFoodMode && styles.dogFoodMode} ${bean === 7 && styles.winnerSpinner}`} onMouseDown={() => handleClick("man")} disabled={spinning}>
            Ja tak!
          </button>
        ) : (
          <button className={`${styles.spinButton} ${spinning && styles.spinning} ${dogFoodMode && styles.dogFoodMode} ${bean === 7 && styles.winnerSpinner}`} onMouseDown={spinWheel} disabled={spinning}>
            {spinning ? "Spinning..." : "Spin"}
          </button>
        )}
      </main>
    </>
  );
}

export default Page;
