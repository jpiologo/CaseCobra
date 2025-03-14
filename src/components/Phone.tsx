import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'
import Image from 'next/image'

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  dark?: boolean
}

const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden',
        className,
      )}
      {...props}
    >
      <Image
        src={
          dark
            ? '/phone-template-dark-edges.png'
            : '/phone-template-white-edges.png'
        }
        className='pointer-events-none z-50 select-none'
        alt='Phone Image'
        width={300} // Substitua por uma largura adequada
        height={600} // Substitua por uma altura adequada
        priority // Opcional: carrega a imagem imediatamente (útil para LCP)
      />
      <div className='absolute -z-10 inset-0'>
        <Image
          className='object-cover'
          src={imgSrc}
          alt='Overlaying Phone Image'
          fill // Substitui width/height para ocupar o container
        />
      </div>
    </div>
  )
}

export default Phone
