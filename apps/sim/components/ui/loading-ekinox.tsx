'use client'

export interface LoadingEkinoxProps {
  /**
   * Size of the loading Ekinox logo
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingEkinox({ size = 'md' }: LoadingEkinoxProps) {
  const sizes = {
    sm: { width: 24, height: 17 },
    md: { width: 36, height: 25 },
    lg: { width: 48, height: 34 },
  }

  const { width, height } = sizes[size]

  return (
    <div className="flex items-center justify-center">
      <svg
        width={width}
        height={height}
        viewBox='0 0 48 34'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{
          animation: 'ekinoxPulse 2s ease-in-out infinite',
        }}
      >
        <g id="logogram">
          <path
            d="M15.4992 0H36.5808L21.0816 22.9729H0L15.4992 0Z"
            fill="var(--brand-primary-hex)"
            style={{
              animation: 'ekinoxFade 2s ease-in-out infinite',
            }}
          />
          <path
            d="M16.4224 25.102L10.4192 34H32.5008L48 11.0271H31.7024L22.2064 25.102H16.4224Z"
            fill="var(--brand-primary-hex)"
            style={{
              animation: 'ekinoxFade 2s ease-in-out infinite',
              animationDelay: '0.3s',
            }}
          />
        </g>
        <style>
          {`
            @keyframes ekinoxPulse {
              0%, 100% {
                transform: scale(1);
                opacity: 0.8;
              }
              50% {
                transform: scale(1.05);
                opacity: 1;
              }
            }

            @keyframes ekinoxFade {
              0%, 100% {
                opacity: 0.7;
              }
              50% {
                opacity: 1;
              }
            }
          `}
        </style>
      </svg>
    </div>
  )
}
