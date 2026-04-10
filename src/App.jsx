import React, { useState } from "react";

import vesmirData from "./data/vesmir.json";
import kulturaData from "./data/kultura.json";
import matikaData from "./data/matematika.json";
import biologieData from "./data/biologie.json";
import technologieData from "./data/technologie.json";
import geografieData from "./data/geografie.json";
import logikaData from "./data/logika.json";

const categories = [
  { id: "vesmir", name: "Vesmír", data: vesmirData, icon: "🚀" },
  { id: "kultura", name: "Kultura", data: kulturaData, icon: "🎭" },
  { id: "matika", name: "Matematika", data: matikaData, icon: "🔢" },
  { id: "biologie", name: "Biologie", data: biologieData, icon: "🧬" },
  { id: "technologie", name: "Technologie", data: technologieData, icon: "💻" },
  { id: "geografie", name: "Geografie", data: geografieData, icon: "🗺️" },
  { id: "logika", name: "Logika", data: logikaData, icon: "🧩" },
];

export default function App() {
  const [cookieConsent, setCookieConsent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  // index pro carousel
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  // směr animace: "none" | "left" | "right"
  const [slideDirection, setSlideDirection] = useState("none");

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return 0;
  };

  const handleConsent = (agreed) => {
    if (!agreed) {
      alert(
        "Dobrá, skóre si pamatujte sami! Doufám, že máte po ruce tužku a papír.",
      );
    }
    setCookieConsent(agreed);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedDifficulty(null);
  };

  const handleDifficultySelect = (difficultyKey) => {
    setSelectedDifficulty(difficultyKey);

    const cookieName = `hs_${selectedCategory.id}_${difficultyKey}`;
    const savedHighScore = parseInt(getCookie(cookieName), 10);
    setHighScore(isNaN(savedHighScore) ? 0 : savedHighScore);

    const questionsForDifficulty = selectedCategory.data[difficultyKey];

    const shuffledQuestions = [...questionsForDifficulty]
      .sort(() => Math.random() - 0.5)
      .map((question) => ({
        ...question,
        answerOptions: [...question.answerOptions].sort(
          () => Math.random() - 0.5,
        ),
      }));

    setQuizData(shuffledQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedAnswerIndex(null);
  };

  const handleAnswerOptionClick = (isCorrect, index) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswerIndex(index);

    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setIsAnswered(false);
        setSelectedAnswerIndex(null);
      } else {
        setShowScore(true);

        if (cookieConsent && newScore > highScore) {
          setHighScore(newScore);
          const cookieName = `hs_${selectedCategory.id}_${selectedDifficulty}`;
          document.cookie = `${cookieName}=${newScore}; path=/; max-age=${
            60 * 60 * 24 * 30
          }; SameSite=Strict`;
        }
      }
    }, 1500);
  };

  const returnToMenu = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setQuizData([]);
  };

  const handleAbortQuiz = () => {
    const isConfirmed = window.confirm(
      "Opravdu chcete kvíz ukončit? Váš aktuální postup bude ztracen.",
    );
    if (isConfirmed) {
      returnToMenu();
    }
  };

  const toggleTheme = () => {
    const body = document.body;
    const current = body.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    body.setAttribute("data-theme", next);
  };

  const prevIndex =
    (currentCategoryIndex - 1 + categories.length) % categories.length;
  const nextIndex = (currentCategoryIndex + 1) % categories.length;

  const goPrev = () => {
    setSlideDirection("left");
    setCurrentCategoryIndex((prev) =>
      prev > 0 ? prev - 1 : categories.length - 1,
    );
    setTimeout(() => setSlideDirection("none"), 250);
  };

  const goNext = () => {
    setSlideDirection("right");
    setCurrentCategoryIndex((prev) =>
      prev < categories.length - 1 ? prev + 1 : 0,
    );
    setTimeout(() => setSlideDirection("none"), 250);
  };

  return (
    <main className="app-root">
      <section className="card app-card shadow d-flex flex-column">
        <header className="card-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
          <div style={{ width: "2.5rem" }} />
          {/* místo pro zarovnání */}

          <h1 className="h4 mb-0 text-center flex-grow-1">
            {!selectedCategory
              ? "Vědomostní Kvíz"
              : `Kvíz: ${selectedCategory.name}`}
            {selectedDifficulty &&
              ` (${
                selectedDifficulty === "nizka"
                  ? "Nízká"
                  : selectedDifficulty === "stredni"
                    ? "Střední"
                    : "Vysoká"
              })`}
          </h1>

          <button
            type="button"
            className="btn btn-sm btn-light ms-2"
            onClick={toggleTheme}
            aria-label="Přepnout motiv"
          >
            🌓
          </button>
        </header>

        <div className="card-body p-4 flex-grow-1 d-flex flex-column">
          {cookieConsent === null ? (
            <div className="text-center my-auto">
              <div className="mb-4" style={{ fontSize: "3rem" }}>
                🍪
              </div>
              <h2 className="h4 mb-3">Mohu si k Vám odložit sušenku?</h2>
              <p className="text-muted mb-4">
                Abych si pamatoval nejvyšší skóre i zítra, potřebuji si ho
                uložit do cookies ve tvém prohlížeči. Nikam jinam data
                neposílám. Souhlasíte?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-success px-4"
                  onClick={() => handleConsent(true)}
                >
                  Uložit!
                </button>
                <button
                  className="btn btn-outline-danger px-4"
                  onClick={() => handleConsent(false)}
                >
                  Ne, chci zapomenout
                </button>
              </div>
            </div>
          ) : !selectedCategory ? (
            <div className="text-center my-auto">
              <h2 className="h3 mb-4">Vítejte!</h2>
              <p className="text-muted mb-4">
                Vyberte si kategorii a otestujte své znalosti.
              </p>

              {/* 3 ČTVERCE – PŘEDCHOZÍ / AKTUÁLNÍ / DALŠÍ */}
              <div className="category-carousel-wrapper d-flex align-items-center justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-3"
                  onClick={goPrev}
                  aria-label="Předchozí kategorie"
                >
                  ◀
                </button>

                <div
                  className={`category-carousel category-carousel-slide-${slideDirection}`}
                >
                  {/* levý – předchozí, šedý, neklikací */}
                  <div className="category-card category-card-side">
                    <div className="category-box category-box-side">
                      <span className="category-icon">
                        {categories[prevIndex].icon}
                      </span>
                      <span className="category-name">
                        {categories[prevIndex].name}
                      </span>
                    </div>
                  </div>

                  {/* prostřední – aktuální, barevný, klikací */}
                  <div className="category-card category-card-center">
                    <button
                      className="category-box category-box-center btn btn-outline-primary"
                      onClick={() =>
                        handleCategorySelect(categories[currentCategoryIndex])
                      }
                    >
                      <span className="category-icon">
                        {categories[currentCategoryIndex].icon}
                      </span>
                      <span className="category-name">
                        {categories[currentCategoryIndex].name}
                      </span>
                    </button>
                  </div>

                  {/* pravý – další, šedý, neklikací */}
                  <div className="category-card category-card-side">
                    <div className="category-box category-box-side">
                      <span className="category-icon">
                        {categories[nextIndex].icon}
                      </span>
                      <span className="category-name">
                        {categories[nextIndex].name}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-secondary ms-3"
                  onClick={goNext}
                  aria-label="Další kategorie"
                >
                  ▶
                </button>
              </div>
            </div>
          ) : !selectedDifficulty ? (
            <div className="text-center my-auto">
              <h2 className="h3 mb-3">Zvolte obtížnost</h2>
              <p className="text-muted mb-4">
                Jak moc si věříte v kategorii {selectedCategory.name}?
              </p>
              <div className="d-grid gap-3">
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => handleDifficultySelect("nizka")}
                >
                  Nízká (Začátečník)
                </button>
                <button
                  className="btn btn-warning btn-lg text-dark"
                  onClick={() => handleDifficultySelect("stredni")}
                >
                  Střední (Pokročilý)
                </button>
                <button
                  className="btn btn-danger btn-lg"
                  onClick={() => handleDifficultySelect("vysoka")}
                >
                  Vysoká (Expert)
                </button>
              </div>
              <button
                className="btn btn-link mt-4 text-muted"
                onClick={returnToMenu}
              >
                ← Zpět na výběr kategorií
              </button>
            </div>
          ) : showScore ? (
            <div className="text-center my-auto" aria-live="polite">
              <h2 className="h3 mb-4">
                Dokončeno! Získal(a) jsi {score} z {quizData.length} bodů.
              </h2>

              {cookieConsent ? (
                <p className="text-muted fs-5">
                  Nejlepší skóre pro tuto úroveň:{" "}
                  <strong className="text-primary">
                    {Math.max(score, highScore)}
                  </strong>
                </p>
              ) : (
                <p className="text-muted fs-5">
                  <em>
                    Tvé historicky nejlepší skóre: Neznámé (Doufám, že jste si
                    ho zapsali tou tužkou! )
                  </em>
                </p>
              )}

              <div className="d-flex justify-content-center gap-3 mt-4">
                <button
                  className="btn btn-primary px-4"
                  onClick={() => handleDifficultySelect(selectedDifficulty)}
                >
                  Opakovat
                </button>
                <button
                  className="btn btn-secondary px-4"
                  onClick={returnToMenu}
                >
                  Zpět do menu
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4" aria-live="polite">
                <div className="d-flex justify-content-between mb-3 text-secondary fw-bold">
                  <span>
                    Otázka {currentQuestion + 1} / {quizData.length}
                  </span>
                  {cookieConsent && highScore > 0 && (
                    <span>Nejlepší skóre úrovně: {highScore}</span>
                  )}
                </div>
                <div className="progress mb-4" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{
                      width: `${(currentQuestion / quizData.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <h2 className="h4 text-dark mb-4">
                  {quizData[currentQuestion].questionText}
                </h2>
              </div>

              <div className="d-grid gap-3">
                {quizData[currentQuestion].answerOptions.map(
                  (answerOption, index) => {
                    let btnClass =
                      "btn btn-light border text-start p-3 fw-medium answer-btn";
                    if (isAnswered) {
                      if (answerOption.isCorrect)
                        btnClass +=
                          " border-success border-3 bg-success-subtle text-success";
                      else if (index === selectedAnswerIndex)
                        btnClass +=
                          " border-danger border-3 bg-danger-subtle text-danger";
                    }
                    return (
                      <button
                        key={index}
                        className={btnClass}
                        onClick={() =>
                          handleAnswerOptionClick(answerOption.isCorrect, index)
                        }
                        disabled={isAnswered}
                      >
                        {answerOption.answerText}
                      </button>
                    );
                  },
                )}
              </div>

              <div className="mt-5 text-center border-top pt-3">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleAbortQuiz}
                >
                  Ukončit kvíz a zpět do menu
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
