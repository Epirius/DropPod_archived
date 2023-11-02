const clearHtmlTags = (str: string): string => {
  const html = new DOMParser().parseFromString(str, "text/html");
  return html.body.textContent || "";
};

export { clearHtmlTags };
