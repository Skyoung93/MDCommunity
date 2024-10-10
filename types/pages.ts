export const pageOptions = ['Journeys', 'Community'] as const;
export type PageOptions = (typeof pageOptions)[number];
