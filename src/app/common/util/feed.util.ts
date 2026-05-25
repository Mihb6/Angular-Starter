import { Reading, SemanticFeedDetails } from "../../rest/data/semantic-feed.model";
import { DataType } from "../../rest/+common/data-type";

export function getLastReading(inbound?: Reading | null, outbound?: Reading | null): Reading | null {
  if (!!inbound && !!outbound) return inbound?.recordingTime >= outbound?.recordingTime ? inbound : outbound;

  return (inbound?.recordingTime ? inbound : outbound) ?? null;
}

export function getFeedLiveUpdateValue(feed: SemanticFeedDetails | null | undefined, feedUpdates: Reading[] | null | undefined): Reading | null {
  const latestUpdate = !feedUpdates ? null : feedUpdates[feedUpdates.length - 1];
  const lastRestReading = getLastReading(feed?.lastReceivedReading, feed?.lastSentReading);

  const relevantReadings = [latestUpdate, lastRestReading]
    .filter(relevantReading => !!relevantReading)
    .filter(reading => lastRestReading ? reading.feedGuid === lastRestReading.feedGuid : true)
    .sort((a, b) => b.recordingTime - a.recordingTime)

  return relevantReadings.length === 0 ? null : relevantReadings[0];
}

export function getFeedCurrentCategory(feed: SemanticFeedDetails | null | undefined, lastReading: Reading | null | undefined): number | null {
  if (!feed?.categorisationEnabled || !lastReading || feed.dataType !== DataType.NUMERIC) {
    return null;
  }

  const activeCategory = feed.categories.find((category) => category.start <= +lastReading.data && category.end > +lastReading.data);

  return activeCategory ? activeCategory.category : 0;
}
