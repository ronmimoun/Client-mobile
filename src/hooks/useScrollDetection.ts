import { useCallback, useEffect, useState } from "react"

export const useScrollDetection = () => {
    const [isOnTop, setIsOnTop] = useState<boolean>(true)
    const [isOnBottom, setIsOnBottom] = useState<boolean>(true)
    const [containerElement, setContainerElement] = useState<HTMLElement | null>(null)

    const scrollableRefCallback = useCallback((node: HTMLUListElement | HTMLElement | null) => {
        setContainerElement(node)
    }, [])

    useEffect(() => {
        if (!containerElement) return;

        function handlScroll() {
            if (!containerElement) return;
            setIsOnTop(containerElement.scrollTop === 0)
            setIsOnBottom(
                Math.floor(containerElement.scrollHeight - containerElement.scrollTop) <= containerElement.clientHeight
            )
        }

        handlScroll()

        containerElement.addEventListener('scroll', handlScroll)
        return () => {
            containerElement.removeEventListener('scroll', handlScroll)
        }
    }, [containerElement])

    return { scrollableRefCallback, isOnTop, isOnBottom }
}