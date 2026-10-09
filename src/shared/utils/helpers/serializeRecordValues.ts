export const serializeRecordValues = (data: Record<string, unknown>): Record<string, string> => {
  return Object.entries(data).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = typeof value === "object" ? JSON.stringify(value) : String(value);
      }
      return acc;
    },
    {} as Record<string, string>,
  );
};
