package com.example.mathgameapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {

    private val viewModel: GameViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                MathGameApp(viewModel)
            }
        }
    }

@Composable
fun MathGameApp(viewModel: GameViewModel) {
    when (viewModel.currentScreen.value) {
        GameViewModel.Screen.START -> StartScreen(viewModel)
        GameViewModel.Screen.QUESTION -> QuestionScreen(viewModel)
        GameViewModel.Screen.RESULT -> ResultScreen(viewModel)
    }
}

@Composable
fun StartScreen(viewModel: GameViewModel) {
    var questionCount by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("How many questions?", style = MaterialTheme.typography.titleLarge)
        Spacer(modifier = Modifier.height(16.dp))

        TextField(
            value = questionCount,
            onValueChange = { questionCount = it },
            singleLine = true
        )

        Spacer(modifier = Modifier.height(16.dp))

        Button(onClick = {
            val count = questionCount.toIntOrNull() ?: 0
            if (count > 0) {
                viewModel.startGame(count)
            }
        }) {
            Text("Start")
        }
    }
}

@Composable
fun QuestionScreen(viewModel: GameViewModel) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        verticalArrangement = Arrangement.Top,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(32.dp))

        Text("Correct: ${viewModel.correctCount.value} | Wrong: ${viewModel.wrongCount.value}")

        Spacer(modifier = Modifier.height(32.dp))

        Text(viewModel.questionText.value, style = MaterialTheme.typography.titleLarge)

        Spacer(modifier = Modifier.height(24.dp))

        TextField(
            value = viewModel.userAnswer.value,
            onValueChange = { viewModel.userAnswer.value = it },
            singleLine = true
        )

        Spacer(modifier = Modifier.height(16.dp))

        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Button(onClick = {
                viewModel.submitAnswer()
            }) {
                Text("Next")
            }

            Button(onClick = {
                viewModel.cancelGame()
            }) {
                Text("Cancel")
            }
        }
    }
}

@Composable
fun ResultScreen(viewModel: GameViewModel) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(viewModel.resultMessage.value, style = MaterialTheme.typography.titleLarge)
        Spacer(modifier = Modifier.height(24.dp))
        Button(onClick = { viewModel.resetGame() }) {
            Text("Play Again")
        }
    }
}
}
