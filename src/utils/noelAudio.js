/**
 * Synthétiseur audio procédural féérique pour Noël 2026 (Web Audio API native)
 * Zéro fichier externe :
 * - Carillon cristallin féérique
 * - Son de clochettes d hiver légères
 * - Souffle doux du vent des neiges
 */

class NoelSoundEngine {
  constructor() {
    this.ctx = null
    this.isPlaying = false
    this.masterGain = null
  }

  init() {
    if (this.ctx) return
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return

    this.ctx = new AudioContextClass()
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime)
    this.masterGain.connect(this.ctx.destination)
  }

  // Tintement de clochette féérique / céleste
  playChime() {
    this.init()
    if (!this.ctx || !this.isPlaying) return

    const now = this.ctx.currentTime
    const notes = [587.33, 880.0, 1174.66, 1318.51] // Ré, La, Ré aigu, Mi

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.08)

      gain.gain.setValueAtTime(0.12, now + idx * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.1)

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.start(now + idx * 0.08)
      osc.stop(now + 1.3 + idx * 0.1)
    })
  }

  start() {
    this.init()
    if (!this.ctx) return
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    this.isPlaying = true
    this.playChime()
  }

  stop() {
    this.isPlaying = false
  }

  toggle() {
    if (this.isPlaying) {
      this.stop()
    } else {
      this.start()
    }
    return this.isPlaying
  }
}

export const noelAudio = new NoelSoundEngine()
