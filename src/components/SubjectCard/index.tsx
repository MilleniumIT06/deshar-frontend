'use client'
import { useState, useEffect, useCallback } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { cva, type VariantProps } from 'class-variance-authority'
import cn from 'classnames'

import styles from './styles.module.scss'

const subjectCardVariants = cva(styles.SubjectCard, {
    variants: {
        type: {
            default: styles.long,
            long: styles.long,
            short: styles.short,
        },
    },
    defaultVariants: {
        type: 'default',
    },
})

export interface SubjectCardProps extends VariantProps<typeof subjectCardVariants> {
    id?: number | string
    title: string
    imageUrl?: string
    description?: string
    modulesCount: number
    className?: string
    loading?: 'eager' | 'lazy'
    priority?: boolean
    fullCatalog?: boolean
}

const FALLBACK_IMAGE = '/images/Courses/fallback.png'
const PLACEHOLDER_SVG =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTY4IiBoZWlnaHQ9IjE2OCIgdmlld0JveD0iMCAwIDE2OCAxNjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2OCIgaGVpZ2h0PSIxNjgiIGZpbGw9IiNFMkUyRTIiLz48L3N2Zz4='

const SubjectCard = ({
    id,
    type,
    title = 'title',
    imageUrl = 'subjectcardskeleton',
    description = 'description',
    modulesCount = 0,
    className,
    loading = 'lazy',
    priority = false,
    fullCatalog,
}: SubjectCardProps) => {
    const [imageError, setImageError] = useState(false)
    const validImageUrl = 'images/Courses/' + imageUrl?.trim() || 'subjectcardskeleton'

    const handleImageError = useCallback(() => {
        setImageError(true)
    }, [])

    useEffect(() => {
        setImageError(false)
    }, [validImageUrl])

    const getModulesText = useCallback(() => {
        if (fullCatalog) return 'дисциплин'

        const lastDigit = modulesCount % 10
        const lastTwoDigits = modulesCount % 100

        if (lastDigit === 1 && lastTwoDigits !== 11) return 'модуль'
        if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) return 'модуля'
        return 'модулей'
    }, [modulesCount, fullCatalog])

    const linkHref = fullCatalog ? '/courses' : `/courses/${id}/modules`

    // const shouldRenderImage = type === 'long' && !imageError
    const modulesText = `${modulesCount} ${getModulesText()}`

    return (
        <li className={cn(subjectCardVariants({ type, className }))}>
            <div className={styles.SubjectCard__header}>
                <h6 className={styles.SubjectCard__title}>
                    <Link href={linkHref} passHref>
                        {title}
                    </Link>
                </h6>

                <span className={styles.SubjectCard__modules}>{modulesText}</span>
            </div>

            {type === 'long' && (
                <div className={styles.SubjectCard__body}>
                    <p className={styles.SubjectCard__description}>{description}</p>

                    <div className={styles.SubjectCard__image}>
                        <Image
                            src={imageError ? FALLBACK_IMAGE : `/${validImageUrl}.png`}
                            alt={imageError ? 'Изображение заглушка' : `Изображение курса: ${title}`}
                            fill
                            loading={loading}
                            priority={priority}
                            quality={100}
                            onError={handleImageError}
                            placeholder="blur"
                            blurDataURL={PLACEHOLDER_SVG}
                            key={`${validImageUrl}-${imageError}`}
                        />
                    </div>
                </div>
            )}
        </li>
    )
}

export { SubjectCard, subjectCardVariants }
