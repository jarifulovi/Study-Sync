"use client";

import { useState } from "react";
import { notifications as initialNotifications } from "@/utils/data/notifications";
import NotificationBar from "@/components/notification/NotificationBar";
import PageHeader from "@/components/ui/PageHeader";


// Auto mark notification when appear on the table
// Add infinite scroll for notifications list
// Delete will be soft delete in future will add restore option (48 hours to restore)

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month">("all");

  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((n) =>
        n.notification_id === notificationId ? { ...n, is_read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, is_read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter((n) => n.notification_id !== notificationId));
  };

  const filteredNotifications = notifications.filter((n) => {
    // Read/Unread filter
    if (filter === "unread" && n.is_read) return false;
    
    // Type filter
    if (typeFilter !== "all" && n.type !== typeFilter) return false;
    
    // Date filter
    if (dateFilter !== "all") {
      const notificationDate = new Date(n.receive_date);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "today" && daysDiff > 0) return false;
      if (dateFilter === "week" && daysDiff > 7) return false;
      if (dateFilter === "month" && daysDiff > 30) return false;
    }
    
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const notificationTypes = [
    { value: "all", label: "All Types" },
    { value: "invitation", label: "Invitations" },
    { value: "join_request", label: "Join Requests" },
    { value: "join_group", label: "Joined Groups" },
    { value: "discussion_topic", label: "Discussions" },
    { value: "file_shared", label: "Files" },
    { value: "video_conferencing", label: "Meetings" },
  ];

  return (
    <div className="min-h-screen p-6 pt-20 lg:pt-6">
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Notifications" subtitle="Stay updated with your group activities" />

        {/* Filter Bar */}
        <div className="mb-6 space-y-4">
          {/* Read Status Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-slate-800 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  filter === "unread"
                    ? "bg-slate-800 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Type and Date Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type Filter */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Filter by Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-lg border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-0 transition-all"
              >
                {notificationTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Filter by Date
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
                className="w-full rounded-lg border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-0 transition-all"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">No notifications</h3>
              <p className="text-sm text-slate-600">You're all caught up!</p>
            </div>
          ) : (
            <div className="max-h-[calc(100vh-400px)] overflow-y-auto divide-y divide-slate-100">
              {filteredNotifications.map((notification) => (
                <NotificationBar
                  key={notification.notification_id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
