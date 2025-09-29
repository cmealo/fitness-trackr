import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

/**
 * Shows a single activity. If the logged-in user owns it,
 * renders a Delete button that calls the API and informs the parent.
 *
 * props:
 *  - activity: { id, name, description, creatorId }
 *  - onDeleted: function(id)
 */
export default function ActivityItem({ activity, onDeleted }) {
  const { token, user } = useAuth();
  const [msg, setMsg] = useState(null);

  const isOwner = !!user && user.id === activity.creatorId;
  const canDelete = !!token && isOwner;

  async function handleDelete() {
    try {
      setMsg(null);
      await deleteActivity(token, activity.id);
      if (typeof onDeleted === "function") onDeleted(activity.id);
    } catch (e) {
      setMsg(e.message || "Delete failed.");
    }
  }

  return (
    <li>
      <strong>{activity.name}</strong>
      {activity.description ? ` — ${activity.description}` : ""}
      {canDelete && (
        <>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      {msg && <div className="error">{msg}</div>}
    </li>
  );
}
