
interface Props {
  primaryColor?: Color,
  secondaryColor?: Color
  size?: number
  thickness?: number
}
const Spinner = ({primaryColor, secondaryColor, size, thickness}: Props) => {
  const primaryColor_ = primaryColor ?? "#DA0037"
  const secondaryColor_ = secondaryColor ?? "#EDEDED"
  const size_ = size ?? 80
  const thickness_ = thickness ?? size_ * 0.1
  const styling = `rounded-full inline-block box-border animate-spin`
  return (
    <span
      className={styling}
      style={{
        width: size_,
        height: size_,
        borderWidth: thickness_,
        borderColor: secondaryColor_,
        borderBottomColor: primaryColor_,
      }}

    />
  )
}

export default Spinner;



type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;