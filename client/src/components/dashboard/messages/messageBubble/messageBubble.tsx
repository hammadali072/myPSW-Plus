import React from 'react';
import { clsx } from 'clsx';
import { IoCheckmarkDone, IoCheckmark } from 'react-icons/io5';

interface MessageBubbleProps {
  text: string;
  time: string;
  type: 'incoming' | 'outgoing';
  status?: 'sent' | 'delivered' | 'read';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, time, type, status = 'read' }) => {
  const isIncoming = type === 'incoming';

  return (
    <div className={clsx(
      "flex flex-col mb-2 max-w-[85%]",
      isIncoming ? "items-start" : "items-end ml-auto"
    )}>
      <div className={clsx(
        "relative px-4 pt-2 pb-1 text-[15px] font-dm leading-relaxed shadow-sm min-w-[80px]",
        isIncoming
          ? "bg-white text-gray-800 rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm border border-gray-100"
          : "bg-chat-bubble-patient text-gray-800 rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-sm"
      )}>
        <p className="pb-3 pr-2">{text}</p>
        
        <div className={clsx(
          "absolute bottom-1 right-2 flex items-center gap-1 text-[10px] font-medium",
          isIncoming ? "text-gray-400" : "text-gray-500"
        )}>
          <span>{time}</span>
          {!isIncoming && (
            <div className="flex items-center">
              {status === 'sent' ? (
                <IoCheckmark className="size-3.5 text-gray-400" />
              ) : (
                <IoCheckmarkDone className={clsx(
                  "size-3.5",
                  status === 'read' ? "text-blue-500" : "text-gray-400"
                )} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
