// Parser para leer configuraciones del archivo plist de Free Fire
export interface FreeFireSettings {
  AITelekill: boolean
  AimFov: number
  AimWhen: number
  Aimbot: boolean
  AutoWeaponSwitch: boolean
  Box: boolean
  Distance: boolean
  Enable: boolean
  Health: boolean
  Name: boolean
  NinjaRun: boolean
  NinjaRun_Fast: boolean
  NinjaRun_Slow: boolean
  PlayerTakeDamageV10: boolean
  SafeTeleportDistance: number
  ShowAITeleKillUI: boolean
  ShowGhostButton: boolean
  ShowNinjaRunUI: boolean
  ShowTeleVIPButton: boolean
  SpeedHack: boolean
  Target: number
  Telekill: boolean
  TelekillDistance: number
  UndergroundKill: boolean
  UseCustomTelekillDistance: boolean
  WeaponSwapSafe: boolean
  WeaponSwitchMode: number
  force: boolean
  fovaimglow: boolean
  lines: boolean
  playertakedamage: boolean
  playertakedamage2: boolean
  skeleton: boolean
}

// Configuraciones por defecto del plist
export const defaultSettings: FreeFireSettings = {
  AITelekill: false,
  AimFov: 500,
  AimWhen: 1,
  Aimbot: true,
  AutoWeaponSwitch: false,
  Box: true,
  Distance: false,
  Enable: true,
  Health: true,
  Name: true,
  NinjaRun: false,
  NinjaRun_Fast: false,
  NinjaRun_Slow: false,
  PlayerTakeDamageV10: false,
  SafeTeleportDistance: 5,
  ShowAITeleKillUI: true,
  ShowGhostButton: false,
  ShowNinjaRunUI: true,
  ShowTeleVIPButton: false,
  SpeedHack: false,
  Target: 0,
  Telekill: true,
  TelekillDistance: 15,
  UndergroundKill: false,
  UseCustomTelekillDistance: true,
  WeaponSwapSafe: false,
  WeaponSwitchMode: 0,
  force: true,
  fovaimglow: false,
  lines: true,
  playertakedamage: true,
  playertakedamage2: false,
  skeleton: true,
}

// Mapear funciones de la UI a configuraciones del plist
export function getFunctionConfig(functionName: string, settings: FreeFireSettings = defaultSettings) {
  const configs: Record<string, any> = {
    headtrick: {
      recoilReduction: 95,
      aimAssist: settings.Aimbot,
      headShotMultiplier: 2.5,
      noLag: true,
      optimization: "ultra",
      fov: settings.AimFov,
      aimWhen: settings.AimWhen,
      plistEnabled: settings.Enable,
    },
    aimlock: {
      lockSpeed: 0.8,
      lockRange: settings.AimFov,
      autoTrack: settings.Aimbot,
      smoothing: 0.9,
      target: settings.Target,
      aimWhen: settings.AimWhen,
    },
    regedit: {
      graphicsBoost: true,
      fpsUnlock: 120,
      memoryOptimization: true,
      networkBoost: true,
      speedHack: settings.SpeedHack,
      ninjaRun: settings.NinjaRun,
    },
    aimshot: {
      autoFire: true,
      fireRate: 1.5,
      accuracy: 98,
      bulletSpeed: 1.3,
      aimbot: settings.Aimbot,
      fov: settings.AimFov,
    },
    aimhead: {
      headPriority: 100,
      neckShots: true,
      autoAdjust: true,
      criticalHitBoost: 2.0,
      aimbot: settings.Aimbot,
      skeleton: settings.skeleton,
    },
    aimbotdrag: {
      dragAssist: true,
      dragSpeed: 0.95,
      autoCompensation: true,
      aimbot: settings.Aimbot,
      fov: settings.AimFov,
    },
  }

  return configs[functionName] || {}
}

// Generar parámetros de deep link basados en la configuración
export function generateDeepLinkParams(
  functionName: string,
  sensitivity: number,
  settings: FreeFireSettings = defaultSettings,
) {
  const config = getFunctionConfig(functionName, settings)
  const params = new URLSearchParams({
    action: functionName,
    mode: "enabled",
    sensitivity: sensitivity.toString(),
    fov: settings.AimFov.toString(),
    aimbot: settings.Aimbot.toString(),
    enable: settings.Enable.toString(),
  })

  return params.toString()
}
