/**
 * created 27.10.2024
 */
import type { PropsWithChildren } from "react"
import { useMemo } from "react"
import styles from "./Typography.module.css"

type TypographyComponentType = PropsWithChildren<{
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  component?: "p" | "span";
  color?: string;
}>

export function Typography(props: TypographyComponentType) {
  const { variant, children, color, component } = props

  return useMemo(() => {
    const styled = color ? { color: color } : undefined
    switch (component) {
      case "p":
        return <p className={styles[`Typography-element-${variant}`]} style={styled}>{children}</p>
      default:
        return <span className={styles[`Typography-element-${variant}`]} style={styled}>{children}</span>
    }
  }, [children, color, component, variant])
}
