import type { NextRequest } from "next/server"
import { defaultSettings, getFunctionConfig, generateDeepLinkParams } from "@/lib/plist-parser"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { function: functionName, sensitivity, deepLink } = body

    console.log(`[v0] Executing ${functionName} with sensitivity: ${sensitivity}`)

    const config = getFunctionConfig(functionName, defaultSettings)

    if (!config || Object.keys(config).length === 0) {
      return new Response(JSON.stringify({ error: "Invalid function" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Generar deep link con parámetros del plist
    const deepLinkParams = generateDeepLinkParams(functionName, sensitivity, defaultSettings)
    const fullDeepLink = `${deepLink}?${deepLinkParams}`

    console.log(`[v0] Deep link generated: ${fullDeepLink}`)
    console.log(`[v0] Config from plist applied:`, config)

    const executionResult = executeBackgroundScript(functionName, config, sensitivity)

    const result = {
      success: true,
      function: functionName,
      config: config,
      deepLink: fullDeepLink,
      timestamp: new Date().toISOString(),
      executed: true,
      backgroundExecution: executionResult,
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("[v0] Error in execute API:", error)
    return new Response(
      JSON.stringify({
        error: "Execution failed",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

function executeBackgroundScript(functionName: string, config: any, sensitivity: number) {
  const scripts: Record<string, any> = {
    headtrick: {
      type: "recoil_control",
      params: {
        recoilReduction: config.recoilReduction,
        aimAssist: config.aimAssist,
        headShotMultiplier: config.headShotMultiplier,
        noLag: config.noLag,
        optimization: config.optimization,
        fov: config.fov,
        sensitivity: sensitivity,
      },
      script: `
        // Script de reducción de retroceso y optimización
        window.freefire = window.freefire || {};
        window.freefire.headtrick = {
          enabled: true,
          recoil: ${config.recoilReduction},
          aimAssist: ${config.aimAssist},
          headshot: ${config.headShotMultiplier},
          fov: ${config.fov}
        };
      `,
    },
    aimlock: {
      type: "aim_lock",
      params: {
        lockSpeed: config.lockSpeed,
        lockRange: config.lockRange,
        autoTrack: config.autoTrack,
        smoothing: config.smoothing,
        sensitivity: sensitivity,
      },
      script: `
        window.freefire = window.freefire || {};
        window.freefire.aimlock = {
          enabled: true,
          speed: ${config.lockSpeed},
          range: ${config.lockRange},
          track: ${config.autoTrack},
          smooth: ${config.smoothing}
        };
      `,
    },
    regedit: {
      type: "registry_modification",
      params: {
        graphicsBoost: config.graphicsBoost,
        fpsUnlock: config.fpsUnlock,
        memoryOptimization: config.memoryOptimization,
        networkBoost: config.networkBoost,
        speedHack: config.speedHack,
      },
      script: `
        window.freefire = window.freefire || {};
        window.freefire.regedit = {
          enabled: true,
          fps: ${config.fpsUnlock},
          graphics: ${config.graphicsBoost},
          memory: ${config.memoryOptimization},
          speed: ${config.speedHack}
        };
      `,
    },
    aimshot: {
      type: "auto_fire",
      params: {
        autoFire: config.autoFire,
        fireRate: config.fireRate,
        accuracy: config.accuracy,
        bulletSpeed: config.bulletSpeed,
        sensitivity: sensitivity,
      },
      script: `
        window.freefire = window.freefire || {};
        window.freefire.aimshot = {
          enabled: true,
          auto: ${config.autoFire},
          rate: ${config.fireRate},
          accuracy: ${config.accuracy},
          speed: ${config.bulletSpeed}
        };
      `,
    },
    aimhead: {
      type: "headshot_priority",
      params: {
        headPriority: config.headPriority,
        neckShots: config.neckShots,
        autoAdjust: config.autoAdjust,
        criticalHitBoost: config.criticalHitBoost,
        sensitivity: sensitivity,
      },
      script: `
        window.freefire = window.freefire || {};
        window.freefire.aimhead = {
          enabled: true,
          priority: ${config.headPriority},
          neck: ${config.neckShots},
          adjust: ${config.autoAdjust},
          crit: ${config.criticalHitBoost}
        };
      `,
    },
    aimbotdrag: {
      type: "drag_assist",
      params: {
        dragAssist: config.dragAssist,
        dragSpeed: config.dragSpeed,
        autoCompensation: config.autoCompensation,
        sensitivity: sensitivity,
      },
      script: `
        window.freefire = window.freefire || {};
        window.freefire.aimbotdrag = {
          enabled: true,
          assist: ${config.dragAssist},
          speed: ${config.dragSpeed},
          compensate: ${config.autoCompensation}
        };
      `,
    },
  }

  return scripts[functionName] || { type: "unknown", params: {}, script: "" }
}
