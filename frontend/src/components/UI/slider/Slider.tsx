import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Arrow from '../arrows/Arrow'
import {
  handleMoveByArrow,
  onTouchEndHandler,
  onTouchMoveHandler,
  onTouchStartHandler,
  resizeListener
} from './handlers'

type Props<T> = {
  className?: string
  slides: T[]
  renderItem: (item: T) => React.ReactNode
}

const Slider = <T,>({ slides, className, renderItem }: Props<T>) => {
  const [widthOfElement, setWidthOfElement] = useState<number>(0)
  const [isDown, setIsDown] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [previousTransition, setPreviousTransition] = useState<number>(0)
  const [maxScrollValue, setMaxScrollValue] = useState<number>(0)

  const ref = useRef<HTMLDivElement>(null)

  const memoizedSlider = useMemo(
    () => (
      <div ref={ref} className="slides-wrap flex w-full gap-2">
        {slides?.map(renderItem)}
      </div>
    ),
    [slides, renderItem]
  )

  useEffect(() => {
    const resizeWindowHandler = () => resizeListener({ ref, setMaxScrollValue, setWidthOfElement })
    resizeWindowHandler()
    window.addEventListener('resize', resizeWindowHandler)
    return () => {
      window.removeEventListener('resize', resizeWindowHandler)
    }
  }, [slides])

  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => onTouchStartHandler({ e, setIsDown, setStartX }),
    []
  )
  const onTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) =>
      onTouchEndHandler({ e, setIsDown, maxScrollValue, previousTransition, ref, setPreviousTransition, startX }),
    [maxScrollValue, previousTransition, startX]
  )

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) =>
      onTouchMoveHandler({ e, isDown, previousTransition, ref, setPreviousTransition, startX }),
    [previousTransition, startX]
  )

  const onMoveByArrow = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) =>
      handleMoveByArrow({ e, maxScrollValue, previousTransition, ref, setPreviousTransition, widthOfElement }),
    [maxScrollValue, previousTransition, widthOfElement]
  )

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      className={`overflow-x-hidden flex  relative ${className ?? ''}`}
    >
      <Arrow
        onClick={onMoveByArrow}
        direction="left"
        className="hidden md:block w-8 left-0 absolute top-[45%] cursor-pointer p-2 bg-white hover:bg-border-color duration-500 z-[3]"
      />
      {memoizedSlider}
      <Arrow
        onClick={onMoveByArrow}
        direction="right"
        className="hidden md:block w-8 right-0 absolute top-[45%] cursor-pointer p-2 bg-white hover:bg-border-color duration-500 z-[3]"
      />
    </div>
  )
}

export { Slider }
