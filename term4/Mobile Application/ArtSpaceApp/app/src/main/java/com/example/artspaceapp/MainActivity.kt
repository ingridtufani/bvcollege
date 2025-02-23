package com.example.artspaceapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.artspaceapp.ui.theme.ArtSpaceAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            ArtSpaceAppTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    ArtSpaceApp(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}
// List of famous Brazilian artists and their artworks
data class Artwork(val imageRes: Int, val title: String, val artist: String, val year: String)

@Composable
fun ArtSpaceApp(modifier: Modifier = Modifier) {
    val artworks = listOf(
        Artwork(R.drawable.art1, "Abaporu (The Man Who Eats People)", "Tarsila do Amaral", "1928"),
        Artwork(R.drawable.art2, "The Coffee Farmer", "Candido Portinari", "1934"),
        Artwork(R.drawable.art3, "The Persistence of Memory", "Salvador Dalí", "1931")
    )

    var currentIndex by remember { mutableStateOf(0) }

    Column(
        modifier = modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Image(
            painter = painterResource(id = artworks[currentIndex].imageRes),
            contentDescription = artworks[currentIndex].title,
            modifier = Modifier.size(300.dp)
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = artworks[currentIndex].title,
            style = MaterialTheme.typography.titleLarge
        )
        Text(
            text = "${artworks[currentIndex].artist} (${artworks[currentIndex].year})",
            style = MaterialTheme.typography.bodyMedium
        )
        Spacer(modifier = Modifier.height(16.dp))
        Row {
            Button(onClick = {
                currentIndex = if (currentIndex > 0) currentIndex - 1 else artworks.size - 1
            }) {
                Text("Previous")
            }
            Spacer(modifier = Modifier.width(16.dp))
            Button(onClick = {
                currentIndex = (currentIndex + 1) % artworks.size
            }) {
                Text("Next")
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun ArtSpacePreview() {
    ArtSpaceAppTheme {
        ArtSpaceApp()
    }
}
