export const getLocation = () => window.location.href;
export const redirect = (url: string) => (window.location.href = url);
