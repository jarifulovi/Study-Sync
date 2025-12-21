import { Notification } from "@/utils/data/notifications";
import { getInitials } from "@/utils/formatter";

interface NotificationBarProps {
  notification: Notification;
  onMarkAsRead: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
}

export default function NotificationBar({ notification, onMarkAsRead, onDelete }: NotificationBarProps) {


  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "invitation":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "join_request":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        );
      case "join_group":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "discussion_topic":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case "file_shared":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case "video_conferencing":
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "invitation":
        return "bg-blue-50 text-blue-600";
      case "join_request":
        return "bg-purple-50 text-purple-600";
      case "join_group":
        return "bg-emerald-50 text-emerald-600";
      case "discussion_topic":
        return "bg-amber-50 text-amber-600";
      case "file_shared":
        return "bg-indigo-50 text-indigo-600";
      case "video_conferencing":
        return "bg-rose-50 text-rose-600";
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className={`group relative p-5 transition-all hover:bg-slate-50 ${
        !notification.is_read ? "bg-slate-50/50" : "bg-white"
      }`}
    >
      <div className="flex gap-4">
        {/* Avatar or Icon */}
        <div className="flex-shrink-0">
          {notification.sender ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-sm font-semibold text-white shadow-md">
              {notification.sender.image ? (
                <img
                  src={notification.sender.image}
                  alt={notification.sender.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                getInitials(notification.sender.name)
              )}
            </div>
          ) : (
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${getNotificationColor(
                notification.type
              )}`}
            >
              {getNotificationIcon(notification.type)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="mb-1 text-sm text-slate-800 pr-8">{notification.content}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              {getTimeAgo(notification.receive_date)}
            </span>
            {!notification.is_read && (
              <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {!notification.is_read && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead(notification.notification_id);
              }}
              className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              title="Mark as read"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.notification_id);
            }}
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
            title="Delete notification"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
