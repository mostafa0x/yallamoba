import { useDispatch, useSelector } from "react-redux";
import { StateProfileSlices } from "../../../InterFaces/StateProfileSlices";
import { StateFaces } from "../../../InterFaces/StateFaces";
import { fillUserData } from "../../lib/UserSlices";

export default function FillUserState(data: StateProfileSlices, dispath: any) {
  dispath(fillUserData(data.ownerData));
}
