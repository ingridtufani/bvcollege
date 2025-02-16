package com.example.businesscard

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Call
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Share
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.background // Ensuring that the background import is present

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BusinessCard()
        }
    }
}

@Composable
fun BusinessCard() {
    // Using Box to fully center the content
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFFFFFFF)) // Background color #FFFFFF with 100% opacity
    ) {
        Column(
            modifier = Modifier
                .align(Alignment.Center) // Centering the Column inside the Box
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Background image (Logo or image)
            Image(
                painter = painterResource(id = R.drawable.business_card), // Ensure that the image is in the drawable folder
                contentDescription = "Business Card Image",
                modifier = Modifier
                    .size(200.dp) // Increasing the size of the image
                    .padding(bottom = 16.dp)
            )

            // Name and Title
            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Ingrid Tufani",
                    fontSize = 40.sp, // Increasing the text size
                    color = Color.Black
                )
                Text(
                    text = "Android Developer Student",
                    fontSize = 22.sp, // Increasing the text size
                    color = Color.Gray
                )
            }

            // Contact Section
            Column(
                modifier = Modifier.padding(top = 16.dp),
                horizontalAlignment = Alignment.Start
            ) {
                // Phone
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Filled.Call,
                        contentDescription = "Phone Icon"
                    )
                    Text(
                        text = "+11 (123) 444 555 666",
                        fontSize = 18.sp, // Increasing the text size
                        modifier = Modifier.padding(start = 8.dp)
                    )
                }

                // Social media
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(top = 8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Filled.Share,
                        contentDescription = "Social Icon"
                    )
                    Text(
                        text = "@AndroidDev",
                        fontSize = 18.sp, // Increasing the text size
                        modifier = Modifier.padding(start = 8.dp)
                    )
                }

                // Email
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(top = 8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Filled.Email,
                        contentDescription = "Email Icon"
                    )
                    Text(
                        text = "ingrid.t@android.com",
                        fontSize = 18.sp, // Increasing the text size
                        modifier = Modifier.padding(start = 8.dp)
                    )
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    BusinessCard()
}
