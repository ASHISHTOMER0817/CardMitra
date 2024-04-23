import axios from "axios";
import { redirect } from "next/navigation";
async function AcceptAffiliate(choice: boolean, email: string) {
      try {
            const response = await axios.get(
                  `/api/affiliate/affiliateAcceptOrReject?query=${choice}&anotherQuery=${email}`
            ); 
            if(response.data.status){
                  console.log(response.data.message);
                  redirect("/adminBookers")
            }
      } catch {
            console.log("something went wrong please refresh the page");
      }
}
export default AcceptAffiliate;