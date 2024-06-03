export const getThumbnails = (extension) => {
  const thumbnails = {
    pdf: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg",
    mp4: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Video-icon.svg",
    docx: "https://s2.svgbox.net/files.svg?ic=word2", // DOC
    xls: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=file-excel", // XLS
    ppt: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=file-powerpoint", // PPT
    txt: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=file-alt", // TXT
    jpg: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=file-image", // JPG
    png: "https://s2.svgbox.net/files.svg?ic=image", // PNG
    gif: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=file-image", // GIF
    zip: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=file-archive", // ZIP
    html: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=file-code", // HTML
    css: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=file-code", // CSS
    js: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=file-code", // JavaScript
    php: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=file-code", // PHP
    url: "https://s2.svgbox.net/hero-solid.svg?color=000&ic=link",
  };

  const thumbnail = thumbnails[extension] || "https://example.com/default_icon.svg";
  console.log(`Thumbnail for ${extension}: ${thumbnail}`);
  return thumbnail;
};
