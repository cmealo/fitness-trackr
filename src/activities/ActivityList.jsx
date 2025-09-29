import React from "react";
import ActivityItem from "./ActivityItem";

/**
 * props:
 *  - activities: array of activities
 *  - onDeleted: function(id)
 */

export default function ActivityList({ activities, onDeleted }) {
  if (!Array.isArray(activities) || activities.length === 0) {
    return <p>No activities yet.</p>;
  }

  return (
    <ul>
      {activities.map(function (a) {
        return <ActivityItem key={a.id} activity={a} onDeleted={onDeleted} />;
      })}
    </ul>
  );
}
