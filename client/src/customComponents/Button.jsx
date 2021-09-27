import React from 'react'
import { useState } from 'react';

function Button({ 
  className,
  rounded,
  circle,
  smooth,
  smoothTime = .2,
  cornerRadius = 20,
  backColor = '0 0',
  color = 'black',
  padding = [5, 20],
  border,
  borderColor = 'black',
  cursor = 'pointer',
  click,
  hover,
  hoverBackColor,
  hoverColor,
  hoverBorder,
  hoverBorderColor,
  hoverCornerRadius,
  children
}) {
  var [hovered, setHovered] = useState(false);

  function paddingHandler() {
    if (Array.isArray(padding)) {
      let result = '';

      padding.map(side => {
        result += `${side}px `;
        return side;
      })
      return result;
    }
    if (Number.isInteger(padding)) return `${padding}px`;
    console.log('err');
  }

  const styles = {
    default: {
      borderRadius: circle ? '50%' : (rounded ? `${cornerRadius}px` : '0px'),
      background: backColor,
      color,
      padding: paddingHandler(),
      border: border ? `${border}px solid ${borderColor}` : 'none',
      transition: smooth ? `all ${smoothTime}s ease` : 'none',
    },
    hover: {
      borderRadius: `${hoverCornerRadius || cornerRadius}px`,
      background: hoverBackColor || backColor,
      color: hoverColor || color,
      padding: paddingHandler(),
      border: hoverBorder || border ? 
      `${hoverBorder || border}px solid ${hoverBorderColor || borderColor}` 
      : 'none',
      cursor,
      transition: smooth ? `all ${smoothTime}s ease` : 'none',
    }
  }

  return <button
    onClick={() => click && click()}
    onMouseEnter={() => hover && setHovered(true)}
    onMouseLeave={() => hover && setHovered(false)}
    className={className}
    style={!className && hovered ? styles.hover : styles.default}
  >{children}</button>
}

export default Button