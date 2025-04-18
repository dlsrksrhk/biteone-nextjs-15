export async function delay(ms: number) {
  return new Promise((resolve) =>
    setTimeout(function () {
      resolve("");
    }, ms)
  );
}
