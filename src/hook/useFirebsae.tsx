import firebase_app from "@/lib/firebaseConfig";
import {
  deleteObject,
  getStorage,
  list,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

class FireStorageFile {
  refStr = "images/";
  storage = getStorage(firebase_app, "gs://files-98ece.appspot.com");

  upload(file: File) {
    const storageRef = ref(this.storage, this.refStr + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return uploadTask;
  }

  delete(pathname: string) {
    const storageRef = ref(this.storage, this.refStr + pathname);
    return deleteObject(storageRef);
  }

  getStorageRef(pathname: string) {
    return ref(this.storage, this.refStr + pathname);
  }

  async listF() {
    const storageRef = ref(this.storage, this.refStr);

    const { items } = await list(storageRef, { maxResults: 10 });

    console.log(items);

    return items.map((x) => {
      return {
        name: x.name,
        fullpath: x.fullPath,
      };
    });
  }
}

export function useFirebase() {
  return {
    file: new FireStorageFile(),
  };
}