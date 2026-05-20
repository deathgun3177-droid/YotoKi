export function readVideoDuration(file: File) {
  const url = URL.createObjectURL(file);
  const reader = createVideoDurationReader(url, () => URL.revokeObjectURL(url));

  return reader.promise;
}

export function createVideoDurationReader(url: string, onCleanup?: () => void) {
  const video = document.createElement("video");
  let settled = false;
  let rejectDuration: (error: Error) => void = () => undefined;

  const cleanup = () => {
    video.onloadedmetadata = null;
    video.onerror = null;
    video.removeAttribute("src");
    video.load();
    onCleanup?.();
  };

  const promise = new Promise<number>((resolve, reject) => {
    rejectDuration = reject;
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      if (settled) return;
      settled = true;

      const duration = video.duration;
      cleanup();

      if (Number.isFinite(duration) && duration > 0) {
        resolve(duration);
        return;
      }

      reject(new Error("Video duration олдсонгүй."));
    };
    video.onerror = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error("Video duration уншиж чадсангүй."));
    };
    video.src = url;
  });

  return {
    promise,
    cancel: () => {
      if (settled) return;
      settled = true;
      cleanup();
      rejectDuration(new Error("Video duration cancelled."));
    }
  };
}
