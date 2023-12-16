const colorArray = ["red", "green", "blue", "orange", "yellow"];
export const GetRandomColor = () => {
  const index = Math.floor(Math.random() * colorArray.length);

  return colorArray[index];
};

export const GetSharedURL = (documentId: string) => {
  return `${window.location.origin}/page?documentId=${documentId}`;
};
