import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  // NEW: called after a successful delete
  function handleDeleted(id) {
    // Optimistic removal... refetch would be call syncActivities() instead.
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <>
      <h1>Activities</h1>
      <ActivityList activities={activities} onDeleted={handleDeleted} />
      <ActivityForm syncActivities={syncActivities} />
    </>
  );
}
