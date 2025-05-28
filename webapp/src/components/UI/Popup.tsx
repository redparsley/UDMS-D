import { Cross } from "../../styles/img/Cross.tsx";

export function Popup({ isOpen, onClose, children }) {
    return (
        <>
            {isOpen && (
                <div className="popup">
                    <div className="popup-wrapper">
                        <div className="popup-content">
                            {children}
                        </div>
                        <button className="btn close-btn" onClick={() => onClose()}>
                           <Cross/>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}