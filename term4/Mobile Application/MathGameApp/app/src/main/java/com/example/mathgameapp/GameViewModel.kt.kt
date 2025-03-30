package com.example.mathgameapp

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import kotlin.random.Random

class GameViewModel : ViewModel() {

    // UI states
    var currentScreen = mutableStateOf(Screen.START)
    var questionText = mutableStateOf("")
    var userAnswer = mutableStateOf("")
    var correctCount = mutableStateOf(0)
    var wrongCount = mutableStateOf(0)
    var currentQuestionIndex = mutableStateOf(0)
    var totalQuestions = mutableStateOf(0)
    var resultMessage = mutableStateOf("")

    // Internal question list
    private val questions = mutableListOf<Pair<Int, Int>>()

    // Enum for screen state
    enum class Screen {
        START,
        QUESTION,
        RESULT
    }

    // Called when the user starts the game
    fun startGame(numberOfQuestions: Int) {
        totalQuestions.value = numberOfQuestions
        correctCount.value = 0
        wrongCount.value = 0
        currentQuestionIndex.value = 0
        questions.clear()

        // Generate random addition questions
        repeat(numberOfQuestions) {
            val a = Random.nextInt(1, 50)
            val b = Random.nextInt(1, 50)
            questions.add(Pair(a, b))
        }

        loadNextQuestion()
        currentScreen.value = Screen.QUESTION
    }

    // Load the next question
    private fun loadNextQuestion() {
        if (currentQuestionIndex.value >= totalQuestions.value) {
            showResult()
            return
        }

        val (a, b) = questions[currentQuestionIndex.value]
        questionText.value = "$a + $b = ?"
        userAnswer.value = ""
    }

    // Called when the user clicks "Next"
    fun submitAnswer() {
        if (currentQuestionIndex.value >= totalQuestions.value) return

        val (a, b) = questions[currentQuestionIndex.value]
        val correct = a + b
        val input = userAnswer.value.toIntOrNull()

        if (input == correct) {
            correctCount.value += 1
        } else {
            wrongCount.value += 1
        }

        currentQuestionIndex.value += 1
        loadNextQuestion()
    }

    // Called when user cancels the game
    fun cancelGame() {
        currentScreen.value = Screen.RESULT
        resultMessage.value = "Game canceled. Correct: ${correctCount.value}, Wrong: ${wrongCount.value}"
    }

    // Final result after finishing all questions
    private fun showResult() {
        currentScreen.value = Screen.RESULT
        resultMessage.value = "You finished the game! Correct: ${correctCount.value}, Wrong: ${wrongCount.value}"
    }

    // Reset to start screen
    fun resetGame() {
        currentScreen.value = Screen.START
        totalQuestions.value = 0
        correctCount.value = 0
        wrongCount.value = 0
        currentQuestionIndex.value = 0
        userAnswer.value = ""
        questionText.value = ""
        resultMessage.value = ""
    }
}
