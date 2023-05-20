import { RcFile } from 'antd/es/upload';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from '../service/firebase';

export async function uploadRestaurantBanner(files: RcFile[]) {
  try {
    const bannerURLs = [];
    for await (const file of files) {
      // create a reference for the file to be uploaded
      const bannerRef = ref(storage, `banners/${file.name}`);

      // upload file
      await uploadBytes(bannerRef, file);
      // get download url of the file just uploaded by its reference
      const url = await getDownloadURL(bannerRef);

      // add the url to the list of banner urls
      bannerURLs.push(url);
    }

    return bannerURLs;
  } catch (error) {
    console.log(error);

    return [];
  }
}
