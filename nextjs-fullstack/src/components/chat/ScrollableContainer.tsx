import { ReactNode } from "react";

interface ScrollableContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollableContainer({ children, className = "" }: ScrollableContainerProps) {
  return (
    <div className={`custom-scrollbar ${className}`}>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #475569 transparent;
        }
      `}</style>
      {children}
    </div>
  );
}
