import { useEffect, useState } from "react";

import { allAspects, allPoints } from "@utils";
import { useAttribute, useBaseContext } from "@hooks";

/**
 * A hook for managing a selected collection of relationships.
 */
export default function useRelationships(): RelationshipsHook {
  const { liveData } = useBaseContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleAspects = useAttribute<string[]>([...allAspects]);
  const visiblePoints = useAttribute<string[]>([...allPoints]);
  const collection = liveData?.relationships[currentIndex];
  const [relationships, setRelationships] = useState(collection?.relationships || []);
  const collectionNames = liveData?.relationships.map(({ name }) => name) || [];
  const { value: aspects } = visibleAspects;
  const { value: points } = visiblePoints;

  const selectedName: AttributeHook<string> = {
    value: collectionNames[currentIndex] || "",
    setValue(name) {
      const collectionIndex = collectionNames.indexOf(name);

      setCurrentIndex(collectionIndex);
    },
  };

  useEffect(() => {
    if (!liveData || currentIndex > liveData.relationships.length) {
      setCurrentIndex(0);
    }
  }, [liveData]);

  useEffect(() => {
    const newRelationships = liveData?.relationships[currentIndex]?.relationships || [];

    setRelationships(
      newRelationships.filter(
        (rel) => (aspects.includes(rel.eclipticAspect.type || "")
            || aspects.includes(rel.declinationAspect.type || ""))
          && points.includes(rel.fromPoint)
          && points.includes(rel.toPoint),
      ),
    );
  }, [liveData, currentIndex, aspects, points]);

  return {
    collection,
    visibleRelationships: relationships,
    collectionNames,
    selectedName,
    visiblePoints,
    visibleAspects,
  };
}
