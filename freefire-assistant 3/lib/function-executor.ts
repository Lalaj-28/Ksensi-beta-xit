export class FunctionExecutor {
  private static instance: FunctionExecutor
  private activeScripts: Map<string, any> = new Map()

  static getInstance(): FunctionExecutor {
    if (!FunctionExecutor.instance) {
      FunctionExecutor.instance = new FunctionExecutor()
    }
    return FunctionExecutor.instance
  }

  async executeDeepLink(deepLink: string): Promise<boolean> {
    try {
      // Intentar abrir el deep link
      window.location.href = deepLink

      // Fallback para iOS
      setTimeout(() => {
        const iframe = document.createElement("iframe")
        iframe.style.display = "none"
        iframe.src = deepLink
        document.body.appendChild(iframe)
        setTimeout(() => document.body.removeChild(iframe), 1000)
      }, 500)

      return true
    } catch (error) {
      console.error("[v0] Deep link execution failed:", error)
      return false
    }
  }

  async activateFunction(functionName: string, config: any): Promise<void> {
    console.log(`[v0] Activating ${functionName} with config:`, config)

    // Guardar el script activo
    this.activeScripts.set(functionName, {
      config,
      timestamp: Date.now(),
      active: true,
    })

    // Ejecutar el deep link
    if (config.deepLink) {
      await this.executeDeepLink(config.deepLink)
    }
  }

  deactivateFunction(functionName: string): void {
    console.log(`[v0] Deactivating ${functionName}`)
    this.activeScripts.delete(functionName)
  }

  getActiveScripts(): string[] {
    return Array.from(this.activeScripts.keys())
  }

  isActive(functionName: string): boolean {
    return this.activeScripts.has(functionName)
  }
}
