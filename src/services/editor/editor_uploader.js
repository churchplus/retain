// import axios from "@/gateway/backendapi";
import media_service from "../media/media_service";
import { v4 as uuidv4 } from 'uuid';
import membershipService from "../../services/membership/membershipservice"


let tenantId;

let getTenantId = () => {
  membershipService.getSignedInUser()
      .then(res => {
          tenantId = res.tenantId;
      })
      .catch(err => {
          console.log(err);
      })
}

if (!tenantId) {
  getTenantId();
}

/**
 * Customized upload picture plugin
 */
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    data.append("mediaFile", `imagee_${uuidv4()}`);
    data.append("mediaFile", await this.loader.file);
    data.append("mediaFileImage", await this.loader.file);
    data.append("mediaType", 0);
    data.append("tenantId", tenantId);

    try {
        const res = await media_service.uploadMedia(data);
        console.log(res, "data");
        console.log(res.returnObject, "data");
        return {
        //   default: process.env.VUE_APP_TARGET_URL + res.data.data.url,
        default: res.returnObject.imagePath,
        };
    } catch (error) {
        console.log(error, "error");
        return {
            //   default: process.env.VUE_APP_TARGET_URL + res.data.data.url,
            default: "",
        };
    }

    // const res = await axios({
    //   url: process.env.VUE_APP_BASE_URL + `/upload`,
    //   method: "POST",
    //   data,
    //   withCredentials: true, // True is not allowed to bring token, false is allowed
    // });

    // console.log(res.data);
    // Backstage returns data:
    // {"code":0,"msg":"success","data":{"url":"/upload/struts2.jpeg"}}

    // Method Returns data format: {Default: "URL"}
    // return {
    //   default: process.env.VUE_APP_TARGET_URL + res.data.data.url,
    // };
  }
}

export default MyUploadAdapter;