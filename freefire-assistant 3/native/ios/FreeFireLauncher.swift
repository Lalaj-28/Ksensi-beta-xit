import SwiftUI
import UIKit

// MARK: - Free Fire Deep Link Handler
class FreeFireLauncher: ObservableObject {
    
    // Free Fire URL Schemes for iOS
    private let freeFireSchemes = [
        "freefire://",
        "freefireth://",
        "freefiremax://",
        "com.dts.freefireth://",
        "com.dts.freefiremax://",
        "garena-freefire://"
    ]
    
    // App Store URLs as fallback
    private let appStoreURLs = [
        "https://apps.apple.com/app/garena-free-fire/id1300146617",
        "https://apps.apple.com/app/garena-free-fire-max/id1525854012"
    ]
    
    @Published var isLaunching = false
    @Published var showError = false
    @Published var errorMessage = ""
    
    // MARK: - Launch Free Fire
    func launchFreeFire() {
        isLaunching = true
        
        // Try each scheme
        tryLaunchWithSchemes(schemes: freeFireSchemes, index: 0)
    }
    
    private func tryLaunchWithSchemes(schemes: [String], index: Int) {
        guard index < schemes.count else {
            // All schemes failed, show error
            DispatchQueue.main.async {
                self.isLaunching = false
                self.showError = true
                self.errorMessage = "Free Fire no está instalado. ¿Deseas descargarlo?"
            }
            return
        }
        
        let schemeString = schemes[index]
        guard let url = URL(string: schemeString) else {
            tryLaunchWithSchemes(schemes: schemes, index: index + 1)
            return
        }
        
        // Check if URL can be opened
        if UIApplication.shared.canOpenURL(url) {
            UIApplication.shared.open(url, options: [:]) { success in
                DispatchQueue.main.async {
                    self.isLaunching = false
                    if !success {
                        self.tryLaunchWithSchemes(schemes: schemes, index: index + 1)
                    }
                }
            }
        } else {
            // Try next scheme
            tryLaunchWithSchemes(schemes: schemes, index: index + 1)
        }
    }
    
    // MARK: - Open App Store
    func openAppStore() {
        guard let url = URL(string: appStoreURLs[0]) else { return }
        UIApplication.shared.open(url)
    }
}

// MARK: - SwiftUI View
struct KsensiVIPButton: View {
    @StateObject private var launcher = FreeFireLauncher()
    @State private var isPressed = false
    
    var body: some View {
        Button(action: {
            launcher.launchFreeFire()
        }) {
            ZStack {
                // Background with particles effect
                ParticleView(colors: [.red, .gray])
                    .opacity(0.3)
                
                // Button content
                Text("KSENSI VIP")
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(.white)
                    .tracking(2)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 70)
            .background(Color.black)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.red, lineWidth: 2)
            )
            .cornerRadius(12)
            .scaleEffect(isPressed ? 0.95 : 1.0)
            .shadow(color: .red.opacity(0.5), radius: isPressed ? 10 : 5)
        }
        .buttonStyle(PlainButtonStyle())
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in isPressed = true }
                .onEnded { _ in isPressed = false }
        )
        .alert("Error", isPresented: $launcher.showError) {
            Button("Descargar", action: launcher.openAppStore)
            Button("Cancelar", role: .cancel) {}
        } message: {
            Text(launcher.errorMessage)
        }
        .overlay {
            if launcher.isLaunching {
                ProgressView()
                    .scaleEffect(1.5)
            }
        }
    }
}

// MARK: - Particle Effect View
struct ParticleView: View {
    let colors: [Color]
    @State private var particles: [Particle] = []
    
    struct Particle: Identifiable {
        let id = UUID()
        var x: CGFloat
        var y: CGFloat
        var size: CGFloat
        var color: Color
        var vx: CGFloat
        var vy: CGFloat
    }
    
    var body: some View {
        GeometryReader { geometry in
            Canvas { context, size in
                for particle in particles {
                    let rect = CGRect(x: particle.x, y: particle.y, 
                                    width: particle.size, height: particle.size)
                    context.fill(
                        Path(ellipseIn: rect),
                        with: .color(particle.color.opacity(0.6))
                    )
                }
            }
            .onAppear {
                generateParticles(in: geometry.size)
                startAnimation()
            }
        }
    }
    
    private func generateParticles(in size: CGSize) {
        particles = (0..<30).map { _ in
            Particle(
                x: CGFloat.random(in: 0...size.width),
                y: CGFloat.random(in: 0...size.height),
                size: CGFloat.random(in: 2...4),
                color: colors.randomElement() ?? .red,
                vx: CGFloat.random(in: -1...1),
                vy: CGFloat.random(in: -1...1)
            )
        }
    }
    
    private func startAnimation() {
        Timer.scheduledTimer(withTimeInterval: 0.016, repeats: true) { _ in
            updateParticles()
        }
    }
    
    private func updateParticles() {
        for i in particles.indices {
            particles[i].x += particles[i].vx
            particles[i].y += particles[i].vy
            
            if particles[i].x < 0 || particles[i].x > 300 {
                particles[i].vx *= -1
            }
            if particles[i].y < 0 || particles[i].y > 70 {
                particles[i].vy *= -1
            }
        }
    }
}

// MARK: - Preview
#Preview {
    VStack {
        KsensiVIPButton()
            .padding()
    }
    .background(Color.black)
}
