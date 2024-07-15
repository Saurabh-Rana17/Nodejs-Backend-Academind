import * as fs from "fs";

const deleteFile = (filepath: any) => {
  fs.unlink(filepath, (err) => {
    if (err) {
      throw err;
    }
  });
};
