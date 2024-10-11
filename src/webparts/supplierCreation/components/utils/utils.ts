
export const formatDateToISO = (dateStr: string | Date): string => {
  const date = new Date(dateStr);
  return date.toISOString();
};

export const getQueryParams = (): { recordId: string | undefined } => {
  const params = new URLSearchParams(window.location.search);
  const recordId = params.get("vendorId");
  return { recordId: recordId ? recordId : undefined };
};
