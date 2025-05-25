import React from "react";
import LogoImage from "../../styles/img/logo_ranepaXudms.svg"

export function Logo() {  // Название компонента с большой буквы
  return (
    <img 
      src={ LogoImage } 
      alt="Логотип ЕДИС+РАНХиГС" 
      className="main-logo" // Опционально: для дополнительных стилей
    />
  );
}