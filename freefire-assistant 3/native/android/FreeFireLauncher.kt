package com.ksensi.freefirelauncher

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlin.random.Random

/**
 * Free Fire Launcher for Android
 * Handles deep linking to Free Fire game
 */
class FreeFireLauncher(private val context: Context) {
    
    // Free Fire package names and schemes
    private val freeFirePackages = listOf(
        "com.dts.freefireth",
        "com.dts.freefiremax",
        "com.garena.game.kgth",
        "com.garena.game.kgid"
    )
    
    private val freeFireSchemes = listOf(
        "freefire://",
        "freefireth://",
        "freefiremax://",
        "intent://freefire#Intent;scheme=freefire;package=com.dts.freefireth;end",
        "intent://freefire#Intent;scheme=freefire;package=com.dts.freefiremax;end"
    )
    
    /**
     * Launch Free Fire game
     * Tries multiple methods to open the game
     */
    fun launchFreeFire(): Boolean {
        // Method 1: Try package names
        for (packageName in freeFirePackages) {
            if (tryLaunchByPackage(packageName)) {
                return true
            }
        }
        
        // Method 2: Try URL schemes
        for (scheme in freeFireSchemes) {
            if (tryLaunchByScheme(scheme)) {
                return true
            }
        }
        
        return false
    }
    
    private fun tryLaunchByPackage(packageName: String): Boolean {
        return try {
            val intent = context.packageManager.getLaunchIntentForPackage(packageName)
            if (intent != null) {
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(intent)
                true
            } else {
                false
            }
        } catch (e: Exception) {
            false
        }
    }
    
    private fun tryLaunchByScheme(scheme: String): Boolean {
        return try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(scheme))
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
            true
        } catch (e: ActivityNotFoundException) {
            false
        } catch (e: Exception) {
            false
        }
    }
    
    /**
     * Open Play Store to download Free Fire
     */
    fun openPlayStore() {
        try {
            val intent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse("market://details?id=com.dts.freefireth")
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            // Fallback to web browser
            val intent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse("https://play.google.com/store/apps/details?id=com.dts.freefireth")
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(intent)
        }
    }
}

/**
 * Composable: KSENSI VIP Button with Particles
 */
@Composable
fun KsensiVIPButton(
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val launcher = remember { FreeFireLauncher(context) }
    var showError by remember { mutableStateOf(false) }
    
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(70.dp)
            .background(Color.Black)
            .border(2.dp, Color.Red, shape = MaterialTheme.shapes.medium)
            .clickable {
                val success = launcher.launchFreeFire()
                if (!success) {
                    showError = true
                }
            },
        contentAlignment = Alignment.Center
    ) {
        // Particles background
        ParticlesCanvas()
        
        // Button text
        Text(
            text = "KSENSI VIP",
            color = Color.White,
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 2.sp
        )
    }
    
    // Error dialog
    if (showError) {
        AlertDialog(
            onDismissRequest = { showError = false },
            title = { Text("Free Fire no encontrado") },
            text = { Text("Free Fire no está instalado. ¿Deseas descargarlo?") },
            confirmButton = {
                TextButton(onClick = {
                    launcher.openPlayStore()
                    showError = false
                }) {
                    Text("Descargar")
                }
            },
            dismissButton = {
                TextButton(onClick = { showError = false }) {
                    Text("Cancelar")
                }
            }
        )
    }
}

/**
 * Particles Canvas Effect
 */
@Composable
private fun ParticlesCanvas() {
    val particles = remember {
        List(30) {
            Particle(
                x = Random.nextFloat(),
                y = Random.nextFloat(),
                vx = (Random.nextFloat() - 0.5f) * 0.002f,
                vy = (Random.nextFloat() - 0.5f) * 0.002f,
                size = Random.nextFloat() * 3f + 1f,
                color = if (Random.nextBoolean()) Color.Red.copy(alpha = 0.6f) 
                        else Color.Gray.copy(alpha = 0.5f)
            )
        }.toMutableList()
    }
    
    val infiniteTransition = rememberInfiniteTransition(label = "particles")
    val animationProgress by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(16, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "progress"
    )
    
    Canvas(modifier = Modifier.fillMaxSize()) {
        particles.forEach { particle ->
            // Update position
            particle.x += particle.vx
            particle.y += particle.vy
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > 1) particle.vx *= -1
            if (particle.y < 0 || particle.y > 1) particle.vy *= -1
            
            // Draw particle
            drawCircle(
                color = particle.color,
                radius = particle.size,
                center = Offset(
                    x = particle.x * size.width,
                    y = particle.y * size.height
                )
            )
        }
    }
}

private data class Particle(
    var x: Float,
    var y: Float,
    var vx: Float,
    var vy: Float,
    val size: Float,
    val color: Color
)
