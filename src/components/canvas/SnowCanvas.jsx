import { useEffect, useRef } from 'react'

/**
 * Arrière-plan féérique Canvas 2D de Noël :
 * - Ciel d'hiver boréal profond (#060d17)
 * - Flocons de neige tombant en boucle continue avec effet de profondeur
 * - Étoile polaire scintillante et reflets dorés
 */
export function SnowCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Génération de 80 flocons de neige
    const flakes = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 1.2 + 0.4,
      speedX: Math.sin(Math.random() * Math.PI) * 0.5,
      opacity: Math.random() * 0.7 + 0.3,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Dégradé boréal
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#060d17')
      grad.addColorStop(0.5, '#0c1829')
      grad.addColorStop(1, '#14273d')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Dessin des flocons
      flakes.forEach((f) => {
        ctx.save()
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(243, 247, 250, ${f.opacity})`
        ctx.shadowColor = '#e5b85c'
        ctx.shadowBlur = f.radius > 2 ? 6 : 0
        ctx.fill()
        ctx.restore()

        f.y += f.speedY
        f.x += f.speedX

        if (f.y > height) {
          f.y = -10
          f.x = Math.random() * width
        }
        if (f.x > width) f.x = 0
        if (f.x < 0) f.x = width
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
