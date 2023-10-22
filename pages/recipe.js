import Head from "next/head";
import { useState } from "react";
import FoodIcons from "./components/foodIcons";
import ToolIcons from "./components/toolIcons";
import styles from "./index.module.css";

export default function Home() {
  const [step, setStep] = useState(0);
  const [recipeList, setRecipeList] = useState([]);
  const [toolList, setToolList] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const handleIngredientClick = (name) => {
    setRecipeList([...recipeList, name]);
  };

  const handleToolClick = (name) => {
    setToolList([...toolList, name]);
  };

  const handleNext = async (event) => {
    event.preventDefault();
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: recipeList,
            tools: toolList,
          }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const generatedRecipe = data.result;
        setRecipes([generatedRecipe]);
        setStep(2);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.navbar}>
          <h1 className={styles.gradientText}>earth chef</h1>
        </div>
        <div className={styles.rectangleContainer}>
          <div className={styles.rectangle1}>
            {step === 0 && (
              <>
                <FoodIcons onClick={handleIngredientClick} />
                <ul>
                  {recipeList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <button className={styles.image2} onClick={handleNext}>
                  cook
                </button>
              </>
            )}
            {step === 1 && (
              <>
                <ToolIcons onClick={handleToolClick} />
                <ul>
                  {toolList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <button className={styles.image2} onClick={handleNext}>
                  cook
                </button>
              </>
            )}
            {step === 2 && <div>{recipes[0]}</div>}
          </div>
        </div>
      </main>   
    </div>
  );
}